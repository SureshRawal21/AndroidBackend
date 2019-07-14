var express = require('express');
var router = express.Router();



const user=require('../../api_controller/user_controller');

// for login
router.post('/login',user.login);
router.post('/upload',user.uploadImage);


// for register
router.post('/register',user.register);

//for edit profile
router.put('/:id/edit-user',user.edit_user);

//for changing user image
router.put('/:id/change-image',user.change_image);

//for changing password
router.put('/:id/change-password',user.change_password);

//for selecting college by id
router.get('/:id/user',user.view_user_id);

//for deleting user
router.delete('/:id/del-user',user.del_user);





module.exports = router;
