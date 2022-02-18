import { Model } from "objection";
import knex from "../../database/db";

export interface IUser {
  id: number;
  email: string;
  role: string;
}

export class User extends Model implements IUser {
  id: number;
  email: string;
  password: string;
  role: string;

  static get tableName() {
    return "Users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "password", "role"],

      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        password: { type: "string" },
        role: { type: "string", default: "USER" },
      },
    };
  }
}

async function createSchema() {
  if (await knex.schema.hasTable("Users")) {
    return;
  }

  await knex.schema.createTable("Users", (table) => {
    table.increments("id").primary();
    table.string("email");
    table.string("password");
    table.string("role").defaultTo("USER");
    table.timestamps(true, true);
  });
}

createSchema();
