const pool = require("../../db");

const roads_query =
  "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((gid,road_name)) As properties FROM roads As lg) As f) As fc";

const get_all_roads = (req, res) => {
  pool.query(roads_query, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0].row_to_json);
  });
};

module.exports = {
  get_all_roads,
};
