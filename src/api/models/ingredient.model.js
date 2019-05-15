  const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../utils/APIError');

/**
 * Ingredient Schema
 * @private
 */
const ingredientSchema = new mongoose.Schema({
  ingredient: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  image: {
    type: String,
    default: '',
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
ingredientSchema.statics = {

  /**
   * Get ingredient
   *
   * @param {ObjectId} id - The objectId of ingredient.
   * @returns {Promise<Ingredient, APIError>}
   */
  async get(id) {
    try {
      let ingredient;

      if (mongoose.Types.ObjectId.isValid(id)) {
        ingredient = await this.findById(id).exec();
      }
      if (ingredient) {
        return ingredient;
      }

      throw new APIError({
        message: 'Ingredient does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },


  /**
   * List ingredients in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of ingredients to be skipped.
   * @param {number} limit - Limit number of ingredients to be returned.
   * @returns {Promise<Ingredient[]>}
   */
  list({
    page = 1, perPage = 30, user, ingredient,
  }) {
    const options = omitBy({ user, ingredient }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};

/**
 * @typedef Ingredient
 */
module.exports = mongoose.model('Ingredient', ingredientSchema);
