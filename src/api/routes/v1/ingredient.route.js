const express = require('express');
const controller = require('../../controllers/ingredient.controller');
const userController = require('../../controllers/user.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', userController.load);


router
  .route('/')
  /**
   * @api {get} v1/Ingredient List Ingredient
   * @apiDescription Get a list of ingredient
   * @apiVersion 1.0.0
   * @apiName ListIngredient
   * @apiGroup ingredient
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Ingredient per page
   *
   * @apiSuccess {Object[]} Ingredient List of Ingredient.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(ADMIN), controller.list)
  /**
   * @api {post} v1/Ingredient Create ingredient
   * @apiDescription Create a new ingredient
   * @apiVersion 1.0.0
   * @apiName ingredient
   * @apiGroup ingredient
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             user     User's id
   * @apiParam  {String{6..128}}     ingredient_id  ingredient
   *
   * @apiSuccess (Created 201) {String}  _id         ingredient's _id
   * @apiSuccess (Created 201) {String}  user       User's id
   * @apiSuccess (Created 201) {String}  ingredient      ingredient
   * @apiSuccess (Created 201) {String}  tag      ingredient tag
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(), controller.create);


  router
  .route('/bucket')
  /**
   * @api {get} v1/Ingredient/bucket User wise Ingredient details
   * @apiDescription Get logged in user Ingredient information
   * @apiVersion 1.0.0
   * @apiName UserIngredient
   * @apiGroup Ingredient
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  ingredients      ingredients's array
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(authorize(), controller.userwise_list);

router
  .route('/recipes')
  /**
   * @api {get} v1/Ingredient/recipes User wise Ingredient recipes details
   * @apiDescription Get logged in user Ingredient information
   * @apiVersion 1.0.0
   * @apiName UserIngredient
   * @apiGroup Ingredient
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  recipes      recipe's array
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(authorize(), controller.detailed_list);

router
.route('/parse')
/**
 * @api {get} v1/Ingredient/parse Parse and save Ingredient
 * @apiDescription Get logged in user Ingredient information
 * @apiVersion 1.0.0
 * @apiName UserIngredient
 * @apiGroup Ingredient
 * @apiPermission user
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {String}             ingredientText     random text
 * (You must be an admin to change the user's role)
 *
 * @apiSuccess {String}  ingredients      Ingredient's array
 * @apiSuccess {Date}    createdAt  Timestamp
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
.post(authorize(), controller.parse);



router
  .route('/:ingredientId')
  /**
   * @api {get} v1/Ingredient/:id Get ingredient
   * @apiDescription Get ingredient information
   * @apiVersion 1.0.0
   * @apiName Getingredient
   * @apiGroup ingredient
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id         ingredient's id
   * @apiSuccess {String}  user       ingredient's user
   * @apiSuccess {String}  ingredient      ingredient's annotation
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} v1/Ingredient/:id Replace ingredient
   * @apiDescription Replace the whole user document with a new one
   * @apiVersion 1.0.0
   * @apiName Replaceingredient
   * @apiGroup ingredient
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             user     ingredient's user
   * @apiParam  {String{6..128}}     ingredient  ingredient
   * (You must be an admin to change the user's role)
   *
   * @apiSuccess {String}  id         ingredient's id
   * @apiSuccess {String}  ingredient       ingredient's ingredient
   * @apiSuccess {String}  user      ingredient's user
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(authorize(LOGGED_USER), controller.replace)
  /**
   * @api {patch} v1/Ingredient/:id Update ingredient
   * @apiDescription Update some fields of a ingredient document
   * @apiVersion 1.0.0
   * @apiName Updateingredient
   * @apiGroup ingredient
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             user     ingredient's user
   * @apiParam  {String{6..128}}     ingredient  ingredient
   * (You must be an admin to change the user's role)
   *
   * @apiSuccess {String}  id         ingredient's id
   * @apiSuccess {String}  user       ingredient's user
   * @apiSuccess {String}  ingredient      ingredient
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .patch(authorize(LOGGED_USER), controller.update)
  /**
   * @api {patch} v1/Ingredient/:id Delete ingredient
   * @apiDescription Delete a user
   * @apiVersion 1.0.0
   * @apiName Deleteingredient
   * @apiGroup ingredient
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  .delete(authorize(LOGGED_USER), controller.remove);


module.exports = router;
