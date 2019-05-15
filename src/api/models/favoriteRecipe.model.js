const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
// const moment = require('moment-timezone');
const APIError = require('../utils/APIError');


/**
 * FavoriteRecipe Schema
 * @private
 */
const favoriteRecipeSchema = new mongoose.Schema({
  recipe: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

/**
 * Statics
 */
favoriteRecipeSchema.statics = {

  /**
   * Get favoriteRecipe
   *
   * @param {ObjectId} id - The objectId of favoriteRecipe.
   * @returns {Promise<FavoriteRecipe, APIError>}
   */
  async get(id) {
    try {
      let favoriteRecipe;

      if (mongoose.Types.ObjectId.isValid(id)) {
        favoriteRecipe = await this.findById(id).exec();
      }
      if (favoriteRecipe) {
        return favoriteRecipe;
      }

      throw new APIError({
        message: 'FavoriteRecipe does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List favoriteRecipes in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of favoriteRecipes to be skipped.
   * @param {number} limit - Limit number of favoriteRecipes to be returned.
   * @returns {Promise<FavoriteRecipe[]>}
   */
  list({
    page = 1, perPage = 30, user, recipe,
  }) {
    const options = omitBy({ user, recipe }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};

/**
 * @typedef FavoriteRecipe
 */
module.exports = mongoose.model('FavoriteRecipe', favoriteRecipeSchema);
