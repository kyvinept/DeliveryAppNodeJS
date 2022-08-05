import {Knex} from 'knex';
import {UserRole} from '../src/models/database/user';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('Users', (table) => {
      table.increments('id').primary();
      table.string('email');
      table.string('role').defaultTo(UserRole.user);
      table.timestamps(true, true);
    })
    .createTable('Tokens', (table) => {
      table.increments('id').primary();
      table.string('refresh_token', 1024);
      table
        .integer('userId')
        .references('id')
        .inTable('Users')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('User_Passwords', (table) => {
      table.increments('id').primary();
      table.string('password', 1024);
      table.string('forget_password_token', 1024);
      table
        .integer('user_id')
        .references('id')
        .inTable('Users')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('User_Passkeys', (table) => {
      table.increments('id').primary();
      table.string('challenge', 512);
      table
        .integer('user_id')
        .references('id')
        .inTable('Users')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('Passkeys_Authenticator', (table) => {
      table.increments('id').primary();
      table.string('credential_id', 512);
      table.string('credential_public_key', 512);
      table.bigint('counter');
      table
        .integer('user_passkeys_id')
        .references('id')
        .inTable('User_Passkeys')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('Passkeys_Authenticator')
    .dropTable('User_Passkeys')
    .dropTable('User_Passwords')
    .dropTable('Tokens')
    .dropTable('Users');
}
