const knex = require('knex');
const config = require('../knexfile');

const dbClient = knex(config);




function getAllCommentHandler(req, res) {

  let college_id = req.params.id;
console.log(college_id);
  dbClient({ a: 'user', b: 'comment',  })
      .select({
        comment: 'b.comment',
        name: 'a.name'
      })
      .where('college_id', college_id)
      .whereRaw('?? = ??', ['a.user_id', 'b.user_id'])
  
      .then(data => { //data aauncha
        res.json(data)

      })
      .catch(function (error) {
        console.log(error);
      });
}

function addCommentHandler(req, res) {

  let college_id = req.body.college_id;
  let comment = req.body.comment;
  let user_id = req.body.user_id;

  console.log(college_id,comment,user_id);

  dbClient('comment').insert({
    comment: comment,
    user_id: user_id,
    college_id: college_id
  })
    .then(data => {
      res.json({
        success: 'true'
      })
    })
    .catch(error => {
      console.log(error);
      res.json({
        success: 'false'
      })
    })
}

module.exports = {
  'getAllComment': getAllCommentHandler,
  'addComment': addCommentHandler
}