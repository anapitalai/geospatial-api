const express = require("express");
const router = express.Router();
const roadController = require('../controllers/roadController')


//get all alumni routes
router.get("/", roadController.get_all_roads);


module.exports = router;
