import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Images', (table) => {
    table.increments('id').primary();
    table.string('original');
    table.string('size_500_x_500');
    table.string('size_100_x_100');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Images');
}
