const express = require('express');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const controller = require('../../controllers/rapidApiRecipe.controller');

const router = express.Router();


router
  .route('/recipes/search')
  /**
   * @api {get} v1/rapidApi/recipes/search List Users
   * @apiDescription Get a list of recipes
   * @apiVersion 1.0.0
   * @apiName ListSearchedRecipes
   * @apiGroup recipes
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page(The number of results to skip (between 0 and 900).)
   * @apiParam  {Number{1-100}}      [perPage=1]  Recipes per page(The number of results to return (between 0 and 100).)
   * @apiParam  {String}             [type]       Recipe's type (The type of the recipes. One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.)
   * @apiParam  {String}             [excludeIngredients]      Recipe's An comma-separated list of ingredients or ingredient types that must not be contained in the recipes.
   * @apiParam  {String}             [diet]      Recipe's The diet to which the recipes must be compliant. Possible values are: pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian.
   * @apiParam  {String}             [intolerances]      A comma-separated list of intolerances. All found recipes must not have ingredients that could cause problems for people with one of the given tolerances. Possible values are: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
   * @apiParam  {String}             [cuisine]      The cuisine(s) of the recipes. One or more (comma separated) of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american.
   * @apiParam  {Boolean}             [instructionsRequired]      Whether the recipes must have instructions.
   * @apiParam  {String=user,admin}  [role]       Recipe's role
   *
   * @apiSuccess {Object[]} List of recipes.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(controller.search);


router
.route('/recipes/random')
/**
 * @api {get} v1/rapidApi/recipes/search List Users
 * @apiDescription Get a list of recipes
 * @apiVersion 1.0.0
 * @apiName ListSearchedRecipes
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [number]    OPTIONAL:The number of random recipes to be returned. Must be in interval [1,100]. NOTE: Each random recipe returned counts as one request.
 * @apiParam  {String}             [tags]      OPTIONAL:Tags that the random recipe(s) must adhere to.
 * @apiParam  {Boolean}             [limitLicense]      OPTIONAL:Whether the recipes should have an open license that allows for displaying with proper attribution.
 *
 * @apiSuccess {Object[]} List of random recipes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.get(controller.random);



router
.route('/recipes/searchComplex')
/**
 * @api {get} v1/rapidApi/recipes/search List Users
 * @apiDescription Get a list of recipes
 * @apiVersion 1.0.0
 * @apiName ListSearchedRecipes
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [number]    OPTIONAL:The number of random recipes to be returned. Must be in interval [1,100]. NOTE: Each random recipe returned counts as one request.
 * @apiParam  {String}             [tags]      OPTIONAL:Tags that the random recipe(s) must adhere to.
 * @apiParam  {Boolean}             [limitLicense]      OPTIONAL:Whether the recipes should have an open license that allows for displaying with proper attribution.
 *
 * @apiSuccess {Object[]} List of random recipes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.get(controller.complex);


router
.route('/recipes/autocomplete')
/**
 * @api {get} v1/rapidApi/recipes/search List Users
 * @apiDescription Get a list of recipes
 * @apiVersion 1.0.0
 * @apiName ListSearchedRecipes
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-25}}         [number]    OPTIONAL:The number of results between [1,25].
 * @apiParam  {String}             [query]      OPTIONAL:The query to be autocompleted.
 *
 * @apiSuccess {Object[]} List of random recipes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.get(controller.autocompleterecipe);

router
.route('/food/detect')
/**
 * @api {get} v1/rapidApi/food/detect List Users
 * @apiDescription Detect ingredients and dishes in texts.
 * @apiVersion 1.0.0
 * @apiName ListIngredients
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {String}             [text]      REQUIRED: The text in which food items such as dish names and ingredients should be detected in.
 *
 * @apiSuccess {Object[]} List of Detected ingredients and dishes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.post(controller.detectfood);

router
.route('/ingredients/autocomplete')
/**
 * @api {get} v1/rapidApi/recipes/search List Users
 * @apiDescription Get a list of recipes
 * @apiVersion 1.0.0
 * @apiName ListSearchedRecipes
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-25}}         [number]    OPTIONAL:The number of results between [1,25].
 * @apiParam  {String}             [query]      OPTIONAL:The query to be autocompleted.
 *
 * @apiSuccess {Object[]} List of random recipes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.get(controller.autocompleteingredient)

router
.route('/food/ingredients/substitutes')
/**
 * @api {get} v1/rapidApi/recipes/search List Users
 * @apiDescription Get a list of recipes
 * @apiVersion 1.0.0
 * @apiName ListSearchedRecipes
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-25}}         [number]    OPTIONAL:The number of results between [1,25].
 * @apiParam  {String}             [query]      OPTIONAL:The query to be autocompleted.
 *
 * @apiSuccess {Object[]} List of random recipes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.get(controller.substituteingredient)

router
.route('/recipes/:id/summary')
/**
 * @api {get} v1/rapidApi/recipes/search List Users
 * @apiDescription Get a list of recipes
 * @apiVersion 1.0.0
 * @apiName ListSearchedRecipes
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-25}}         [number]    OPTIONAL:The number of results between [1,25].
 * @apiParam  {String}             [query]      OPTIONAL:The query to be autocompleted.
 *
 * @apiSuccess {Object[]} List of random recipes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.get(controller.recipeoverview);

router
.route('/recipes/:id/information')
/**
 * @api {get} v1/rapidApi/recipes/search List Users
 * @apiDescription Get a list of recipes
 * @apiVersion 1.0.0
 * @apiName ListSearchedRecipes
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-25}}         [number]    OPTIONAL:The number of results between [1,25].
 * @apiParam  {String}             [query]      OPTIONAL:The query to be autocompleted.
 *
 * @apiSuccess {Object[]} List of random recipes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.get(controller.recipeingredients)


router
.route('/recipes/:id/analyzedInstructions')
/**
 * @api {get} v1/rapidApi/recipes/search List Users
 * @apiDescription Get a list of recipes
 * @apiVersion 1.0.0
 * @apiName ListSearchedRecipes
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-25}}         [number]    OPTIONAL:The number of results between [1,25].
 * @apiParam  {String}             [query]      OPTIONAL:The query to be autocompleted.
 *
 * @apiSuccess {Object[]} List of random recipes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.get(controller.recipesteps)

router
.route('/food/products/:id/nutritionWidget')
/**
 * @api {get} v1/rapidApi/recipes/search List Users
 * @apiDescription Get a list of recipes
 * @apiVersion 1.0.0
 * @apiName ListSearchedRecipes
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-25}}         [number]    OPTIONAL:The number of results between [1,25].
 * @apiParam  {String}             [query]      OPTIONAL:The query to be autocompleted.
 *
 * @apiSuccess {Object[]} List of random recipes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.get(controller.recipenutritions)

router
.route('/recipes/findByIngredients')
/**
 * @api {get} v1/rapidApi/recipes/search List Users
 * @apiDescription Get a list of recipes
 * @apiVersion 1.0.0
 * @apiName ListSearchedRecipes
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-25}}         [number]    OPTIONAL:The number of results between [1,25].
 * @apiParam  {String}             [query]      OPTIONAL:The query to be autocompleted.
 *
 * @apiSuccess {Object[]} List of random recipes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.get(controller.generaterecipe)

router
.route('/recipes/guessNutrition')
/**
 * @api {get} v1/rapidApi/guessNutrition Guess Nutrition by Dish Name
 * @apiDescription Guess the macro nutrients of a dish given its title.
 * @apiVersion 1.0.0
 * @apiName ListSearchedRecipes
 * @apiGroup recipes
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {String}             [title]      REQUIRED: The title of the dish.
 *
 * @apiSuccess {Object[]} List of random recipes.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
.get(controller.guessnutrition)

module.exports = router;
