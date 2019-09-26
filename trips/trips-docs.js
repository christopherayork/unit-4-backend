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
 *          "trip_id": 1,
 *          "user_id": 1,
 *          "location": "Somewhere",
 *          "description": "Text",
 *          "short_desc": "Short text",
 *          "photo_id": 1,
 *          "url": "Some URL" // just matches the default photo
 *        },
 *        {
 *          "id": 2,
 *          "user_id": 4,
 *          "location": "Somewhere else",
 *          "description": "Text",
 *          "short_desc": "Short text",
 *          "photo_id": 3,
 *          "url": "Some other URL"
 *        }
 *        // and so on
 *      ]
 *
 * @apiError (Error 404) TripsNotFound Could not retrieve trips
 */

/**
 * @api {post} /trips/ Post a trip
 * @paiVersion 1.0.0
 * @apiName PostTrip
 * @apiGroup Trips
 *
 * @apiDescription Post a trip
 *
 * @apiExample {js} Example request.body:
 *      {
 *        "location": "Somewhere",
 *        "description": "Something",
 *        "short_desc": "Short something",
 *        // photos are optional
 *        "photos": [
 *          {
 *            "default": true,
 *            "url": "Some Url"
 *          },
 *          {
 *            "url": "Some other Url"
 *          }
 *          // etc
 *        ]
 *      }
 *
 * @apiExample {js} Example request.headers:
 *       {
 *         "token": "jsonwebtoken"
 *       }
 *
 * @apiSuccess {String} message Trip created
 * @apiSuccess {Number} trip_id
 * @apiSuccess {Number} photos Number of photos added
 *
 * @apiError (Reject 400) Unauthorized Permission denied
 * @apiError (Error 400) TripPostFail Could not post trip
 */

/**
 * @api {get} /trips/:id Get a trip by ID
 * @apiVersion 1.0.0
 * @apiName GetTrip
 * @apiGroup Trips
 *
 * @apiDescription Get a trip by ID
 *
 * @apiParam {Number} id Unique trip ID
 *
 * @apiSuccess {Number} id ID of the trip
 * @apiSuccess {String} location Trip location
 * @apiSuccess {String} description Trip description
 * @apiSuccess {String} short_desc Trip short description
 *
 * @apiSuccessExample
 *      {
 *        "id": 1,
 *        "location": "Somewhere",
 *        "description": "Something",
 *        "short_desc": "Short something",
 *        "photos": [
 *          {
 *            "url": "Some url"
 *          },
 *          {
 *            "url": "Some other url"
 *          }
 *          // etc
 *        ]
 *      }
 *
 * @apiError (Error 404) TripNotFound Could not find trip
 */

/**
 * @api {put} /trips/:id Update a trip by ID
 * @apiVersion 1.0.0
 * @apiName UpdateTrip
 * @apiGroup Trips
 *
 * @apiDescription Update a trip by ID
 *
 * @apiParam {Number} id Unique trip ID
 *
 * @apiSuccess {String} message Trip updated
 *
 * @apiExample {js} Example request.body:
 *      {
 *        "location": "Somewhere update"
 *      }
 *
 * @apiExample {js} Example request.headers:
 *      {
 *        "token": "jsonwebtoken"
 *      }
 *
 * @apiError (Reject 400) Redundant No changes to make
 * @apiError (Reject 400) Unauthorized Permission denied
 * @apiError (Error 400) FailTripUpdate Trip could not be updated
 */

/**
 * @api {delete} /trips/:id Delete a trip by ID
 * @apiVersion 1.0.0
 * @apiName DeleteTrip
 * @apiGroup Trips
 *
 * @apiDescription Delete a trip by ID
 *
 * @apiParam {Number} id Unique trip ID
 *
 * @apiSuccess {String} message Trip deleted
 *
 * @apiExample {js} Example request.headers:
 *      {
 *        "token": "jsonwebtoken"
 *      }
 *
 * @apiError (Reject 400) Unauthorized Permission denied
 * @apiError (Error 400) DeleteTripFail Could not delete trip
 */

/**
 * @api {get} /trips/photo/:id Get a photo by ID
 * @apiVersion 1.0.0
 * @apiName GetPhoto
 * @apiGroup Trips
 *
 * @apiDescription Get a photo by ID
 *
 * @apiParam {Number} id Unique photo ID
 *
 * @apiSuccess {Number} id Photo ID
 * @apiSuccess {String} url URL of the photo
 *
 * @apiError (Error 404) NotFound Could not find photo
 */

/**
 * @api {put} /trips/photo/:id Update a photo by ID
 * @apiVersion 1.0.0
 * @apiName UpdatePhoto
 * @apiGroup Trips
 * @apiDescription Update a photo by ID
 * @apiParam {Number} id Unique photo ID
 *
 * @apiSuccess {String} message Photo updated
 * @apiExample {js} Example request.body:
 *      {
 *        "url": "New URL"
 *      }
 * @apiExample {js} Example request.headers:
 *      {
 *        "token": "jsonwebtoken"
 *      }
 *
 * @apiError (Reject 400) Unauthorized Permission denied
 * @apiError (Error 400) UpdatePhotoFail Could not update photo
 */

/**
 * @api {delete} /trips/photo/:id Delete a photo by ID
 * @apiVersion 1.0.0
 * @apiName DeletePhoto
 * @apiGroup Trips
 * @apiDescription Delete a photo by ID
 * @apiParam {Number} id Unique photo ID
 *
 * @apiSuccess {String} message Deleted photo
 * @apiExample {js} Example request.headers:
 *      {
 *        "token": "jsonwebtoken"
 *      }
 *
 * @apiError (Error 400) DeleteFail Could not delete photo
 */

/**
 * @api {get} /trips/:id/photos Get all photos of a trip
 * @apiVersion 1.0.0
 * @apiName GetTripPhotos
 * @apiGroup Trips
 * @apiDescription Get all photos of a trip
 * @apiParam {Number} id Unique trip ID
 *
 * @apiSuccess {Array} photos All trip photos
 * @apiSuccessExample Success-Response:
 *      200 OK
 *      [
 *        {
 *          "url": "Photo URL"
 *        },
 *        {
 *          "url": "Another photo URL"
 *        }
 *        // etc
 *      ]
 *
 * @apiError (Error 404) GetTripPhotosFail Could not retrieve photos
 */

/**
 * @api {post} /trips/:id/photos Post photos to a trip
 * @apiVersion 1.0.0
 * @apiName PostTripPhotos
 * @apiGroup Trips
 * @apiDescription Post photos to a trip
 * @apiParam {Number} id Unique trip ID
 *
 * @apiSuccess {String} message Photos posted to trip
 * @apiExample {js} Example request.body:
 *      [
 *        {
 *          "default": true,
 *          "url": "New photo URL"
 *        },
 *        {
 *          "url": "Another new photo URL"
 *        },
 *        // etc, min 1
 *      ]
 * @apiExample {js} Example request.headers:
 *      {
 *        "token": "jsonwebtoken"
 *      }
 *
 * @apiError (Reject 400) Unauthorized Permission denied
 * @apiError (Error 400) PostTripPhotosFail Failed to post photos
 */

/**
 * @api {delete} /trips/:id/photos Delete all trip photos
 * @apiVersion 1.0.0
 * @apiName DeleteTripPhotos
 * @apiGroup Trips
 * @apiDescription Delete all trip photos
 * @apiParam {Number} id Unique trip ID
 *
 * @apiSuccess {String} message Deleted photos
 * @apiSuccess {Number} count Number of photos deleted
 * @apiExample {js} Example request.headers:
 *      {
 *        "token": "jsonwebtoken"
 *      }
 *
 * @apiError (Reject 400) Unauthorized Permission denied
 * @apiError (Error 400) DeleteTripPhotosFail Could not delete photos
 */


