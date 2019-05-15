const httpStatus = require('http-status');
const mongoose = require('mongoose');
const Ingredient = require('../models/ingredient.model');
const { omit, isArray } = require('lodash');
const rapidApiRecipe = require('./rapidApiRecipe.controller');

/**
 * Get ingredient
 * @public
 */
exports.get = async (req, res, next) => {
  const { id } = req.query.id;

  Ingredient.findOne({ _id: mongoose.Types.ObjectId(id) })
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};

/**
 * Create new ingredient
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    req.body.user = req.body.user || req.user._id;

    const existingEntry = await Ingredient.findOne({
      user: typeof req.body.user === 'object' ? req.body.user : mongoose.Types.ObjectId(req.body.user),
      ingredient: req.body.ingredient,
    });
    if (existingEntry) {
      res.status(httpStatus.CREATED);
      res.json(existingEntry);
    } else {
      const ingredient = new Ingredient(req.body);
      const savedIngredient = await ingredient.save();
      res.status(httpStatus.CREATED);
      res.json(savedIngredient);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * parse new ingredient
 * @public
 */
exports.parse = async (req, res, next) => {
  try {
    req.body.user = req.body.user || req.user._id;

    rapidApiRecipe.detectAndParsefood(req, res, next);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing ingredient
 * @public
 */
exports.update = (req, res, next) => {
  req.body = req.body || {};
  req.body.user = req.body.user || req.user._id;
  const ingredient = new Ingredient(req.body);

  ingredient.save()
    .then(savedI => res.json(savedI))
    .catch(e => next(e));
};

/**
 * Get ingredient list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.list(req.query);
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};
/**
 * Replace existing ingredient
 * @public
 */
exports.replace = async (req, res, next) => {
  try {

    req.body = req.body || {};
    req.body.user = req.body.user || req.user._id;
    const { ing } = req.query;
    const newsavedIngredient = new Ingredient(req.body);
    const newsavedIngredientObject = omit(newsavedIngredient.toObject(), '_id');

    await Ingredient.update(newsavedIngredientObject, { override: true, upsert: true });
    const savedI = await Ingredient.findById(ing.favoriteRecipeId);

    res.json(savedI);
  } catch (error) {
    next(error);
  }
};
/**
 * Get ingredient list with details
 * @public
 */
exports.detailed_list = async (req, res, next) => {
  try {
    req.query = req.query || {};
    req.query.user = req.query.user || req.user._id;
    req.query.tag = req.query.tag || 'ingredient';
    const ingredients = await Ingredient.list(req.query);
    if (ingredients && ingredients.length > 0) {
      const userIngredient = (ingredients || []).map(fr => fr.ingredient).join();
      req.query = req.query || {};
      req.query.ingredients = userIngredient;
      req.query.fillIngredients = false;
      req.query.number = 20;
      rapidApiRecipe.findByIngredients(req, res, next);
    } else {
      res.json(ingredients);
    }

  } catch (error) {
    next(error);
  }
};


/**
 * Get ingredient list with details
 * @public
 */
exports.userwise_list = async (req, res, next) => {
  try {
    req.query = req.query || {};
    req.query.user = req.query.user || req.user._id;
    req.query.tag = req.query.tag || 'ingredient';
    const ingredients = await Ingredient.list(req.query);
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Ingredient
 * @public
 */
exports.remove = (req, res, next) => {
  const { id } = req.query.id;

  Ingredient.deleteOne({ _id: mongoose.Types.ObjectId(id) })
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
