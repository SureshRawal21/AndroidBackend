
exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('college')
    return await knex.schema.createTable('college',table=>{
        table.increments('college_id').primary();
    table.string('name');
    table.string('location');
    table.string('course');
    table.string('price');
table.string('college_image');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('college')
};