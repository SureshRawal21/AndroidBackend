const knex= require('knex');
const config = require('../knexfile');

const dbClient=knex(config);

var jwt = require('jsonwebtoken');
const tokenconfig = require('../config');

function addCollegeHandler(req,res){
  let name = req.body.name;
  let location = req.body.location;
  let course = req.body.course;
  let price = req.body.price;
  let college_image = req.body.college_image;

  dbClient('college').insert({
    name:name,
    location:location,
    course:course,
    price:price,
    college_image:college_image
  })
  .then(data => {
    res.json({
      status: 'true'
    })
  })
  .catch(error => {
    console.log(error);
    res.json({
      status: 'fail'
    })
  })
  
}

function viewCollegeHandler(req,res){

  dbClient('college')
  .select('*')
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

function viewCollegeIdHandler(req,res){

  let college_id=req.params.id;

  dbClient('college')
  .select('*')
  .where('college_id',college_id)
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
function searchCollegeHandler(req,res){

  let search=req.params.search;
  console.log(search);
  dbClient('college')
  .select('*')
  .where('name','like','%'+search+'%')
  .orWhere('location','like','%'+search+'%')
  .orWhere('course','like','%'+search+'%')
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



function editCollegeHandler(req,res){

  let college_id=req.params.id;

  let name = req.body.name;
  let location = req.body.location;
  let course = req.body.course;
  let price = req.body.price;
  

  dbClient('college').update({
    name: name,
    location: location,
    course: course,
    price: price,
  
  })
  .where('college_id',college_id)
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

function delCollegeHandler(req,res){

  let college_id=req.params.id;

  dbClient('college')
  .delete()
  .where('college_id',college_id)
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

function getCoursesHandler(req,res){

  dbClient('college')
  .distinct('course')
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

function browseCoursesHandler(req,res){

  let course=req.params.course;

  dbClient('college')
  .select('*')
  .where('course',course)
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
function apply_college(req,res){
  let college_id = req.body.college_id;
  let user_id = req.body.user_id;
  

  dbClient('applied_college').insert({
    user_id: user_id,
    college_id: college_id
  })
  .then(data => {
    res.json({
      status: 'true'
    })
  })
  .catch(error => {
    console.log(error);
    res.json({
      status: 'fail'
    })
  })
  
}

module.exports = {
    'add_college':addCollegeHandler,
    'view_college':viewCollegeHandler,
    'view_college_id':viewCollegeIdHandler,
    'search_college':searchCollegeHandler,
    'edit_college':editCollegeHandler,
    'del_college':delCollegeHandler,
    'get_courses':getCoursesHandler,
    'browse_course':browseCoursesHandler,
    'apply_college':apply_college  
 }