
exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('applied_college')
    return await knex.schema.createTable('applied_college',table=>{
        table.increments('applied_college_id').primary();
  
    table.integer('user_id');
    table.integer('college_id');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('applied_college')
};