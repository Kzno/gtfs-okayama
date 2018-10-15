var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

	const query = `
	select
		'Feature' as type,
		row_to_json(
			(
				select p from (
					select
					stop_name as stop_name,
					stop_id as stop_id
				) as p
			)
		)as properties,
		st_asGeoJson(geom)::json as geometry
	from stops;`;

	db.task(async t => {
		const rtn = await t.any(query);
		console.log(rtn);
		res.json(rtn);
	});

	/*
	res.json(
		[{
			"type": "Feature",
			"properties": {
				"stop_name": "岡山バスセンター"
			},
			"geometry": {
				"type": "Point",
				"coordinates": [133.933387, 34.683716]
			}
		}, {
			"type": "Feature",
			"properties": {
				"stop_name": "大都会岡山バス停"
			},
			"geometry": {
				"type": "Point",
				"coordinates": [133.924387, 34.663716]
			}
		}]
	);
	*/

});

module.exports = router;
