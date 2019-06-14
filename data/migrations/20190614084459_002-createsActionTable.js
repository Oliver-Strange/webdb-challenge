exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", tbl => {
    tbl.increments();
    tbl
      .string("description", 128)
      .notNullable()
      .unique();
    tbl.string("notes", 256).notNullable();
    tbl
      .boolean("completed")
      .notNullable()
      .defaultTo(false);
    tbl
      .integer("project_id")
      .unsigned()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};
