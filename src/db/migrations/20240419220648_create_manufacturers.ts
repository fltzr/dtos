import type { Knex } from 'knex';

const TABLE = 'manufacturers';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE, (table) => {
    table.increments('manufacturer_id').primary();
    table.uuid('uuid').defaultTo(knex.fn.uuid()).unique(),
      table.string('name').notNullable().unique();
    table.string('description').checkLength('<', 100).nullable();
    table.boolean('is_deleted').defaultTo(false);
    table.string('access_level').notNullable();
    table.string('created_by').notNullable();
    table.dateTime('created_at').notNullable();
    table.string('updated_by').notNullable();
    table.dateTime('updated_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE);
}
