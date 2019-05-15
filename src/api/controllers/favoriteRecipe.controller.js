const httpStatus = require('http-status');
const mongoose = require('mongoose');
const FavoriteRecipe = require('../models/favoriteRecipe.model');
const { omit } = require('lodash');
const rapidApiRecipe = require('./rapidApiRecipe.controller');

/**
 * Get user
 * @public
 */
exports.get = async (req, res, next) => {
  const { id } = req.query.id;

  FavoriteRecipe.findOne({ _id: mongoose.Types.ObjectId(id) })
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};

/**
 * Create new favoriteRecipe
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    req.body.user = req.body.user || req.user._id;
    const existingEntry = await FavoriteRecipe.findOne({
      user: typeof req.body.user === 'object' ? req.body.user : mongoose.Types.ObjectId(req.body.user),
      recipe: req.body.recipe,
    });
    if (existingEntry) {
      res.status(httpStatus.CREATED);
      res.json(existingEntry);
    } else {
      const favoriteRecipe = new FavoriteRecipe(req.body);
      const savedFavoriteRecipe = await favoriteRecipe.save();
      res.status(httpStatus.CREATED);
      res.json(savedFavoriteRecipe);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing Recipe
 * @public
 */
exports.update = (req, res, next) => {
  req.body = req.body || {};
  req.body.user = req.body.user || req.user._id;
  const favoriteRecipe = new FavoriteRecipe(req.body);

  favoriteRecipe.save()
    .then(savedRecipe => res.json(savedRecipe))
    .catch(e => next(e));
};

/**
 * Get favoriteRecipe list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const favoriteRecipes = await FavoriteRecipe.list(req.query);
    res.json(favoriteRecipes);
  } catch (error) {
    next(error);
  }
};
/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  try {

    req.body = req.body || {};
    req.body.user = req.body.user || req.user._id;
    const { favRecipe } = req.query;
    const newsavedFavoriteRecipe = new FavoriteRecipe(req.body);
    const newsavedFavoriteRecipeObject = omit(newsavedFavoriteRecipe.toObject(), '_id');

    await FavoriteRecipe.update(newsavedFavoriteRecipeObject, { override: true, upsert: true });
    const savedFavoriteRecipe = await FavoriteRecipe.findById(favRecipe.favoriteRecipeId);

    res.json(savedFavoriteRecipe);
  } catch (error) {
    next(error);
  }
};
/**
 * Get favoriteRecipe list with details
 * @public
 */
exports.detailed_list = async (req, res, next) => {
  try {
    req.query = req.query || {};
    req.query.user = req.query.user || req.user._id;
    const favoriteRecipes = await FavoriteRecipe.list(req.query);
    if (favoriteRecipes && favoriteRecipes.length > 0) {
      const userRecipes = (favoriteRecipes || []).map(fr => fr.recipe).join();
      req.query = req.query || {};
      req.query.ids = userRecipes;
      req.query.includeNutrition = false;
      rapidApiRecipe.get_information_bulk(req, res, next);
    } else {
      res.json(favoriteRecipes);
    }

  } catch (error) {
    next(error);
  }
};

/**
 * Delete favoriteRecipe
 * @public
 */
exports.remove = (req, res, next) => {
  const { favoriteRecipeId } = req.params;
  const { _id } = req.user;
  // TODO _id: mongoose.Types.ObjectId(id)
  FavoriteRecipe.deleteOne({ recipe: favoriteRecipeId, user: _id })
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
