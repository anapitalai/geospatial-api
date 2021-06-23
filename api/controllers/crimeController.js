const pool = require("../../db");

const crimes_query =
   "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((crime_type,date)) As properties FROM public As lg) As f) As fc";
// const crimes_query =
//   "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.where_is)::json As geometry, row_to_json((crime_type,showed_at_latitude)) As properties FROM public.crimes As lg) As f) As fc";
const geo_insert =
  "INSERT INTO public(latitude, longitude) VALUES ($1,$2)";

//const geo_update = "UPDATE public SET geom = ST_POINT($1,$2)";
const geo_update = "UPDATE public SET geom =ST_SetSRID(ST_POINT($1,$2),4326)";

//ST_SetSRID(ST_Point(-123.365556, 48.428611),4326)

const get_all_crimes = (req, res) => {
  pool.query(crimes_query, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0].row_to_json);
  });
};

const create_crime = (request, response) => {
  const { latitude, longitude } = request.body;
  console.log('update crime',longitude,latitude);
  pool.query(
    geo_insert,
    [latitude, longitude],
    (error, results) => {
      if (error) {
        throw error;
      }
      // pool.query(
      //    geo_update,
      //    [latitude, longitude]);
      response.status(201).send(`Point added with ID: ${results.insertId}`);
      
    }
  );
};

const update_crime = (request, response) => {
  const { latitude, longitude } = request.body;
  console.log(longitude,latitude);

  pool.query(
    geo_update,
    [latitude, longitude],
    (error, results) => {
      if (error) {
        throw error;
      }
 
      response.status(201).send(`Point updated with ID: ${results.insertId}`);
      console.log(results.insertId)
    }
  );
};


module.exports = {
  get_all_crimes,
  create_crime,
  update_crime
};
