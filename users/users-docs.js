/**
 * @api {get} /users/ Request all users
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiDescription Get all users:
  * Grabs all users from the table
 *
 *
 * @apiSuccess {Number} id ID of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} first_name First name of the User.
 * @apiSuccess {String} last_name Last name of the User.
 *
 * @apiSuccessExample Success-Response:
 *    200 OK
 *    [
 *      {
 *        "id": 1,
 *        "email": "local-part@domain",
 *        "first_name": "John",
 *        "last_name": "Doe"
 *      },
 *      // Etc
 *    ]
 *
 * @apiError (Error 400) UsersNotFound Could not retrieve users.
 *
 * @apiErrorExample Message-Response:
 *    404 Not Found
 *    {
 *      "message": "Could not retrieve users"
 *    }
 */

 /**
 * @api {post} /users/register Register a new user
 * @apiVersion 1.0.0
 * @apiName RegisterUser
 * @apiGroup Users
 *
 * @apiDescription Register New User:
  * Takes a request body, no headers required.
 *
 * @apiSuccess {String} token Token to authenticate the user with
 * @apiSuccess {Number} id ID of the new user.
 *
 * @apiExample {js} Example request.body:
 *    {
  *      "email": "johndoe@gmail.com",
  *      "password": "blahblah",
  *      "first_name": "John",
  *      "last_name": "Doe",
  *      "profileType": "public" // private is the alternative
  *    }
 *
 * @apiSuccessExample Success-Response:
  *    201 Created
 *     {
 *       "id": 1,
 *       "token": "jsonwebtoken",
 *       "message": "User saved, token is used to authenticate"
 *     }
 *
 * @apiError (Reject 400) EmailTaken That email is already taken
 * @apiError (Error 400) FailRegister Could not register that account
 * @apiError (Reject 400) InvalidFields You must supply a user with username, password, and first_name
 */

 /**
  * @api {post} /users/login Login a user/client
  * @apiVersion 1.0.0
  * @apiName LoginUser
  * @apiGroup Users
  *
  * @apiSuccess {String} token Token to authenticate the user with
  * @apiSuccess {String} user_id The id of the logged in user
  *
  * @apiSuccessExample Success-Response:
  *    200 OK
  *    {
  *      "user_id": 1,
  *      "token": "jsonwebtoken"
  *    }
  *
  * @apiError (Reject 400) InvalidCredentials Invalid Credentials
  * @apiError (Reject 400) InvalidFormat You must supply an email and password
  *
  */

 /**
  * @api {get} /users/:id Get a user by ID
  * @apiVersion 1.0.0
  * @apiName GetUser
  * @apiGroup Users
  *
  * @apiParam {Number} id Unique user id
  *
  * @apiSuccess {Number} id ID of the User.
  * @apiSuccess {String} email Email of the User.
  * @apiSuccess {String} first_name First name of the User.
  * @apiSuccess {String} last_name Last name of the User.
  * @apiSuccess {Array} trips Trips the user has posted.
  *
  * @apiSuccessExample Success-Response:
  *    200 OK
  *    {
  *      "id": 1,
  *      "email": "local-part@domain",
  *      "first_name": "John",
  *      "last_name": "Doe",
  *      "trips": [
  *        {
  *           "id": 1,
  *           "user_id": 1,
  *           "location": "Somewhere",
  *           "description": "Visted somewhere, etc",
  *           "short_desc": "Desc"
  *        }
  *      ]
  *    }
  *
  * @apiError (Error 404) FailGetUser Could not find user.
  */

 /**
  * @api {put} /users/:id Update a user
  * @apiVersion 1.0.0
  * @apiName UpdateUser
  * @apiGroup Users
  *
  * @apiParam {Number} id Unique user id
  *
  * @apiSuccess {String} message User updated.
  * @apiSuccess {Number} user_id ID of updated user.
  *
  * @apiExample {js} Example request.body:
  *    {
  *      // email is unique, changing it will require it not be in use
  *      "password": "newpassword",
  *      "first_name": "change",
  *      "last_name": "change"
  *    }
  *
  * @apiExample {js} Example Header (required) request.header:
  *     {
  *       "token": "jsonwebtoken"
  *     }
  *
  *  @apiError (Error 400) FailUpdateUser Could not update user.
  */

 /**
  * @api {delete} /users/:id Delete a user
  * @apiVersion 1.0.0
  * @apiName DeleteUser
  * @apiGroup Users
  *
  * @apiParam {Number} id Unique user id
  *
  * @apiSuccess {String} message User deleted.
  * @apiSuccess {Number} user_id ID of deleted user.
  *
  * @apiExample {js} Example Header (required) request.header:
  *     {
  *       "token": "jsonwebtoken"
  *     }
  *
  * @apiError (Rejected 400) UnauthorizedDelete Invalid Credentials
  * @apiError (Error 400) FailDeleteUser Could not delete user
  */