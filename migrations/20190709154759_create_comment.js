
exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('comment')
    return await knex.schema.createTable('comment',table=>{
        table.increments('comment_id').primary();
    table.string('comment');
    table.integer('user_id');
    table.string('college_id');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('comment')
};