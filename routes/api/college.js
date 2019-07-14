var express = require('express');
var router = express.Router();



const college=require('../../api_controller/college_controller');

//for adding college
router.post('/add-college',college.add_college);

router.post('/apply-college',college.apply_college);

//for selecting college
router.get('/college-list',college.view_college);

//for selecting college by id
router.get('/:id/college',college.view_college_id);

//for searching college by name
router.get('/:search/college-search',college.search_college);

//for updating college
router.put('/:id/edit-college',college.edit_college);

//for deleting college
router.delete('/:id/del-college',college.del_college);

//for fetching courses
router.get('/course',college.get_courses);

//for fetching college by courses
router.get('/:course/browse-course-list',college.browse_course)

module.exports = router;
