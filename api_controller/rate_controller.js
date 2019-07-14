const knex= require('knex');
const config = require('../knexfile');


const dbClient=knex(config);



function rateHandler(req,res){
    let user_id = req.body.user_id;
    let college_id = req.body.college_id;
    let rate = req.body.rate;
    dbClient('rating').where('college_id',college_id)
    .where('user_id',user_id)
  .select('rating_id')
  .then(function(result) {
    // checking if the email is registered or not
    // if the email is not registered then only allow to register
    if (!result || !result[0])  {
       dbClient('rating').insert({
        user_id:user_id,
        college_id:college_id,
        rate: rate
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
    else{
      return res.status(400).json({
        message: 'You have already rate this college'
      })
    }
  })
  .catch(function(error) {
    console.log(error);
  });
   
}

function getRatingHandler(req,res){
    let college_id = req.params.college_id;

    dbClient('rating')
    .avg('rate as rate')
    .where('college_id',college_id)
    
      .then(data => {
        res.json({
          rate: data[0].rate
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
    'getRating' : getRatingHandler,
    'rate': rateHandler  
 }