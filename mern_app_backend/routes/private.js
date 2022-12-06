const express = require("express");
const router = express.Router();
const {getPrivateData} = require('../controllers/private');
const {protect} = require('../utlils/protect_auth'); 
router.route('/').get(protect,getPrivateData);


module.exports = router;