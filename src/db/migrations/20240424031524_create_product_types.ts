import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product_types', (table) => {
    table.increments('product_type_id').primary();
    table.uuid('uuid').defaultTo(knex.fn.uuid()).unique();
    table.string('name', 40).notNullable();
    table.string('description').checkLength('<', 100).nullable();

    /* Meta */
    table.integer('access_level').notNullable();
    table.boolean('is_deleted').defaultTo(false);
    table.string('created_by').notNullable();
    table.string('updated_by').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('product_types');
}
