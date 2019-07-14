var express = require('express');
var router = express.Router();



const rate=require('../../api_controller/rate_controller');

// for login
router.post('/rate',rate.rate);
router.get('/:college_id/rate',rate.getRating);



module.exports = router;
