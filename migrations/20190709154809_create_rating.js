
exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('rating')
    return await knex.schema.createTable('rating',table=>{
        table.increments('rating_id').primary();
    table.integer('rate');
    table.integer('user_id');
    table.string('college_id');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('rating')
};