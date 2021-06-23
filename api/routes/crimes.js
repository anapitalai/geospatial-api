const express = require("express");
const router = express.Router();
const crimeController = require('../controllers/crimeController')




//get all alumni routes
router.get("/",crimeController.get_all_crimes);
router.post("/",crimeController.create_crime);



module.exports = router;
