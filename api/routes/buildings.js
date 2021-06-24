const express = require("express");
const router = express.Router();
const buildingController = require('../controllers/buildingController');


// const buildings_query =
//   "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((gid,name)) As properties FROM uni_buildings As lg) As f) As fc";


//get all alumni routes
router.get("/",buildingController.get_all_buildings);
router.post("/",buildingController.create_new_building);


 



module.exports = router;
