const Joi = require('joi');

module.exports = {

  // GET /v1/favoriteRecipes/details
  detailedFavoriteRecipes: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      user: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
  },

  // GET /v1/favoriteRecipes
  listFavoriteRecipes: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      user: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      recipe: Joi.any(),
    },
  },

  // POST /v1/favoriteRecipes
  createFavoriteRecipe: {
    body: {
      user: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      recipe: Joi.any().required(),
    },
  },

  // PUT /v1/favoriteRecipes/:favoriteRecipeId
  replaceFavoriteRecipe: {
    body: {
      user: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      recipe: Joi.any().required(),
    },
    params: {
      favoriteRecipeId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/favoriteRecipes/:favoriteRecipeId
  updateFavoriteRecipe: {
    body: {
      user: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      recipe: Joi.any().required(),
    },
    params: {
      favoriteRecipeId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  removeFavoriteRecipe: {
    params: {
      favoriteRecipeId: Joi.number().required(), // string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

};
