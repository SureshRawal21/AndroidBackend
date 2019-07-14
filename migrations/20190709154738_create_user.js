
exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('user')
    return await knex.schema.createTable('user',table=>{
        table.increments('user_id').primary();
    table.string('name');
    table.string('gender');
    table.string('email');
    table.string('password');
    table.string('role');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('users')
};