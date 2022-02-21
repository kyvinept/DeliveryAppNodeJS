import { Model } from "objection";
import knex from "models/database/connection";

export interface IToken {
  refreshToken: string;
  userId: number;
}

export class Token extends Model implements IToken {
  refreshToken: string;
  userId: number;

  static get tableName() {
    return "Tokens";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["refreshToken", "userId"],

      properties: {
        id: { type: "integer" },
        refreshToken: { type: "string" },
        userId: { type: "integer" },
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
          from: "Tokens.userId",
          to: "Users.id",
        },
      },
    };
  }
}

async function createSchema() {
  if (await knex.schema.hasTable("Tokens")) {
    return;
  }

  await knex.schema.createTable("Tokens", (table) => {
    table.increments("id").primary();
    table.string("refreshToken");
    table.integer("userId").references("id").inTable("Users");
    table.timestamps(true, true);
  });
}

createSchema();
