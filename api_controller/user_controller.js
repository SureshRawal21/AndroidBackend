const knex= require('knex');
const config = require('../knexfile');
const md5 = require('md5');
var path = require('path');
const dbClient=knex(config);

var jwt = require('jsonwebtoken');
const tokenconfig = require('../config');

const multer = require('multer'); //to upload the image file
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    // console.log(file.fieldname);
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});
var upload = multer({ storage: storage }).single('imageFile');


function loginHandler(req,res){
    let email = req.body.email;
    let password = req.body.password;
    let pwd=md5(password);

    dbClient('user').where({ email: email})
    .select('*')
    .then(function(result) {
    if (!result || !result[0])  {
        return res.status(400).json({
            status : 'fail',
            message: 'Invalid Email'
          });
    }
    var pass = result[0].password;
    if (pwd === pass) {
        let token = jwt.sign({email: email},
            tokenconfig.secret,
            { expiresIn: '24h' // expires in 24 hours
            }
          );
          // return the JWT token for the future API calls
          return res.json({
            status : 'true',
            token: token,
            name: result[0].name,
            user_id: result[0].user_id,
            email: result[0].email,
            role:result[0].role
          });
    } else {
        return res.status(400).json({
            status : 'fail',
            message: 'Incorrect password'
          });    }
  })
  .catch(function(error) {
    console.log(error);
  });   
}


function registerHandler(req,res){
  let name = req.body.name;
  let gender = req.body.gender;
  let email = req.body.email;
  let password = req.body.password;
  let pwd=md5(password);
  console.log(name);
  console.log(gender);
  console.log(email);
  console.log(password);

  dbClient('user').where({ email: email})
  .select('email')
  .then(function(result) {
    // checking if the email is registered or not
    // if the email is not registered then only allow to register
    if (!result || !result[0])  {
      dbClient('user').insert({
        name:name,
        gender:gender,
        email:email,
        password:pwd,
      })
      .then(data => {
        res.json({
          status: 'true',
          message:"Registered Successful"
        })
      })
      .catch(error => {
        console.log(error);
        res.json({
            status: 'fail',
            message:"Registered failed"
            
        })
      })
    }
    else{
      return res.status(400).json({
        status: 'fail',
        message: 'email repeated'
      })
    }
  })
  .catch(function(error) {
    console.log(error);
  });
}

function editUserHandler(req,res){

  let user_id=req.params.id;

  let name = req.body.name;
  let gender = req.body.gender;

  dbClient('user').update({
    name: name,
    gender:gender
  })
  .where('user_id',user_id)
  .then(function(result) {
        return res.json({
          status:'true'
        });
        })
  .catch(function(error) {
    console.log(error);
    res.json({
      status:"fail"
    })
  });   
}

function changeUserImageHandler(req,res){

  let user_id=req.params.id;

  let user_image = req.body.user_image;
  dbClient('user').update({
    user_image:user_image
  })
  .where('user_id',user_id)
  .then(function(result) {
        return res.json({
          status:'true'
        });
        })
  .catch(function(error) {
    console.log(error);
    res.json({
      status:"fail"
    })
  });   
}

function changeUserPasswordHandler(req,res){

  let user_id=req.params.id;

  let old_password = req.body.old_password;
  let old_pwd = md5(old_password);
  let new_password = req.body.new_password;
  let new_pwd=md5(new_password);

  dbClient('user').where({ user_id: user_id})
  .select('password')
  .then(function(result) {
  var pass = result[0].password;
    if (pass == old_pwd)  {
      dbClient('user').update({
        password:new_pwd
      })
      .where('user_id',user_id)
      .then(function(result) {
            return res.json({
              status:'true'
            });
            })
      .catch(function(error) {
        console.log(error);
        res.json({
          status:"fail"
        })
      });             
    }
    else{
      return res.status(400).json({
        message: 'Password does not match'
      })
    }
  })
  .catch(function(error) {
    console.log(error);
  });
}

function viewUserHandler(req,res){

  let user_id=req.params.id;

  dbClient('user')
  .select('*')
  .where('user_id',user_id)
  .then(function(result) {
        return res.json(
          result
        );
        })
  .catch(function(error) {
    console.log(error);
    res.json({
      status:"fail"
    })
  });   
}

function delUserHandler(req,res){

  let user_id=req.params.id;

  dbClient('user')
  .delete()
  .where('user_id',user_id)
  .then(function(result) {
    return res.json({
      status:'true'
    });
    })
  .catch(function(error) {
    console.log(error);
    res.json({
      status:"fail"
    })
  });   
}

//to upload image
function uploadImage(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json(req.file);
  });

}
module.exports = {
    'login' : loginHandler,
    'register':registerHandler,
    'edit_user':editUserHandler,
    'change_image':changeUserImageHandler,
    'change_password':changeUserPasswordHandler,
    'view_user_id':viewUserHandler,
    'del_user':delUserHandler,
    'uploadImage':uploadImage    
 }