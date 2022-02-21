import { Model } from "objection";
import knex from "models/database/connection";
import { Location } from "models/location";

export interface IRestaurant {
  ownerId: number;
  name: string;
  description: string;
  location: Location;
}

export class Restaurant extends Model implements IRestaurant {
  name: string;
  description: string;
  ownerId: number;
  location: Location;

  static get tableName() {
    return "Restaurants";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "description", "ownerId", "location"],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        description: { type: "string" },
        ownerId: { type: "integer" },
        location: {
          type: "object",
          properties: {
            latitude: { type: "string" },
            longitude: { type: "string" },
          },
        },
      },
    };
  }

  static get relationMappings() {
    const { User } = require("./user");

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "Restaurants.ownerId",
          to: "Users.id",
        },
      },
    };
  }
}

async function createSchema() {
  if (await knex.schema.hasTable("Restaurants")) {
    return;
  }

  await knex.schema.createTable("Restaurants", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("description");
    // table.
    table.integer("ownerId").references("id").inTable("Users");
    table.timestamps(true, true);
  });
}

// createSchema();
