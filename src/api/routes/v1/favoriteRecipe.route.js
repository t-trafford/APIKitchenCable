const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/favoriteRecipe.controller');
const userController = require('../../controllers/user.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  detailedFavoriteRecipes,
  listFavoriteRecipes,
  createFavoriteRecipe,
  replaceFavoriteRecipe,
  updateFavoriteRecipe,
  removeFavoriteRecipe,
} = require('../../validations/favoriteRecipe.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', userController.load);


router
  .route('/')
  /**
   * @api {get} v1/favoriteRecipes List favoriteRecipes
   * @apiDescription Get a list of favorite Recipes
   * @apiVersion 1.0.0
   * @apiName ListFavoriteRecipes
   * @apiGroup FavoriteRecipe
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  FavoriteRecipes per page
   *
   * @apiSuccess {Object[]} favoriteRecipes List of favoriteRecipes.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(ADMIN), validate(listFavoriteRecipes), controller.list)
  /**
   * @api {post} v1/favoriteRecipes Create favoriteRecipe
   * @apiDescription Create a new favoriteRecipe
   * @apiVersion 1.0.0
   * @apiName FavoriteRecipe
   * @apiGroup FavoriteRecipe
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             user     User's id
   * @apiParam  {String{6..128}}     recipe_id  recipe's id
   *
   * @apiSuccess (Created 201) {String}  _id         favoriteRecipe's _id
   * @apiSuccess (Created 201) {String}  user       User's id
   * @apiSuccess (Created 201) {String}  recipe_id      recipe's id
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(), validate(createFavoriteRecipe), controller.create);


router
  .route('/details')
  /**
   * @api {get} v1/favoriteRecipes/details User wise favoriteRecipes details
   * @apiDescription Get logged in user favoriteRecipes information
   * @apiVersion 1.0.0
   * @apiName UserFavoriteRecipes
   * @apiGroup FavoriteRecipes
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  recipes      FavoriteRecipes's array
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(authorize(), validate(detailedFavoriteRecipes), controller.detailed_list);


router
  .route('/:favoriteRecipeId')
  /**
   * @api {get} v1/favoriteRecipes/:id Get FavoriteRecipe
   * @apiDescription Get favoriteRecipe information
   * @apiVersion 1.0.0
   * @apiName GetFavoriteRecipe
   * @apiGroup FavoriteRecipe
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id         FavoriteRecipe's id
   * @apiSuccess {String}  user       FavoriteRecipe's user
   * @apiSuccess {String}  recipe      FavoriteRecipe's id
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} v1/favoriteRecipes/:id Replace FavoriteRecipe
   * @apiDescription Replace the whole user document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceFavoriteRecipe
   * @apiGroup FavoriteRecipe
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             user     FavoriteRecipe's user
   * @apiParam  {String{6..128}}     recipe  FavoriteRecipe's recipe
   * (You must be an admin to change the user's role)
   *
   * @apiSuccess {String}  id         FavoriteRecipe's id
   * @apiSuccess {String}  recipe       FavoriteRecipe's recipe
   * @apiSuccess {String}  user      FavoriteRecipe's user
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(authorize(LOGGED_USER), validate(replaceFavoriteRecipe), controller.replace)
  /**
   * @api {patch} v1/favoriteRecipes/:id Update FavoriteRecipe
   * @apiDescription Update some fields of a FavoriteRecipe document
   * @apiVersion 1.0.0
   * @apiName UpdateFavoriteRecipe
   * @apiGroup FavoriteRecipe
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             user     FavoriteRecipe's user
   * @apiParam  {String{6..128}}     recipe  FavoriteRecipe's recipe
   * (You must be an admin to change the user's role)
   *
   * @apiSuccess {String}  id         FavoriteRecipe's id
   * @apiSuccess {String}  user       FavoriteRecipe's user
   * @apiSuccess {String}  recipe      FavoriteRecipe's recipe
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .patch(authorize(LOGGED_USER), validate(updateFavoriteRecipe), controller.update)
  /**
   * @api {patch} v1/favoriteRecipes/:id Delete FavoriteRecipe
   * @apiDescription Delete a user
   * @apiVersion 1.0.0
   * @apiName DeleteFavoriteRecipe
   * @apiGroup FavoriteRecipe
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

  // TODO authorize(LOGGED_USER)
  .patch(authorize(LOGGED_USER), validate(updateFavoriteRecipe), controller.update)

  .delete(authorize(), validate(removeFavoriteRecipe), controller.remove);


module.exports = router;
