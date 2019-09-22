/**
 * @api {get} /trips/ Get all trips
 * @apiVersion 1.0.0
 * @apiName GetTrips
 * @apiGroup Trips
 *
 * @apiDescription Get all trips
 *
 * @apiSuccess {Number} id ID of trip
 * @apiSuccess {Number} user_id ID of user who posted the trip
 * @apiSuccess {String} location Location of trip
 * @apiSuccess {String} description Description of trip
 * @apiSuccess {String} short_desc Short description of the trip, the tagline
 *
 * @apiSuccessExample Success-Response:
 *      200 OK
 *      [
 *        {
 *          "id": 1,
 *          "user_id": 1,
 *          "location": "Somewhere",
 *          "description": "Text",
 *          "short_desc": "Short text"
 *        },
 *        {
 *          "id": 2,
 *          "user_id": 4,
 *          "location": "Somewhere else",
 *          "description": "Text",
 *          "short_desc": "Short text"
 *        }
 *        // and so on
 *      ]
 *
 * @apiError (Error 404) TripsNotFound Could not retrieve trips
 */

