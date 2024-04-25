import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('p', (table) => {
    /* Base column data */
    table.increments('product_id').primary();
    table.uuid('uuid').defaultTo(knex.fn.uuid()).unique();
    table.string('name', 40).notNullable();
    table.string('description', 80).nullable();

    /* Relations */
    table.integer('catalog_category_id').unsigned().notNullable();
    table
      .foreign('catalog_category_id')
      .references('catalog_category_id')
      .inTable('cc')
      .onDelete('NO ACTION')
      .onUpdate('CASCADE');

    table.integer('m_id').unsigned().notNullable();
    table
      .foreign('m_id')
      .references('m_id')
      .inTable('ms')
      .onDelete('NO ACTION')
      .onUpdate('CASCADE');

    table.integer('product_type_id').unsigned().notNullable();
    table
      .foreign('product_type_id')
      .references('product_type_id')
      .inTable('product_types')
      .onDelete('NO ACTION')
      .onUpdate('CASCADE');

    /* Meta */
    table.boolean('is_deleted').defaultTo(false);
    table.string('created_by').notNullable();
    table.string('updated_by').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('p');
}
