const pool = require("../../db");

var buildings_query =
  "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((gid,name)) As properties FROM uni_buildings As lg) As f) As fc";

  const building_insert =
  "INSERT INTO public(latitude, longitude) VALUES ($1,$2)";

//const geo_update = "UPDATE public SET geom = ST_POINT($1,$2)";
const building_update = "UPDATE public SET geom =ST_SetSRID(ST_Point($2,$1),4326) where gid IN(select max(gid) from public)";




const get_all_buildings = (req, res) => {
  pool.query(buildings_query, (error, results) => {
    if (error) throw error;

    res.status(200).json(results.rows[0].row_to_json);
  });
};



const create_new_building = (req, res) => {
  pool.query(buildings_query, (error, results) => {
    if (error) throw error;

    res.status(200).json(results.rows[0].row_to_json);
  });
};

module.exports = {
  get_all_buildings,
  create_new_building
};
