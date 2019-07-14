var express = require('express');
var router = express.Router();



const comment=require('../../api_controller/comment_controller');


//for selecting college by id
router.get('/:id/comment',comment.getAllComment);

//for deleting user
router.post('/add-comment',comment.addComment);





module.exports = router;
