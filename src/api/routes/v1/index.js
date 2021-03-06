const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const rapidApi = require('./rapidApi.route');
const favoriteRecipe = require('./favoriteRecipe.route');
const ingredient = require('./ingredient.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/rapidApi', rapidApi);
router.use('/favoriteRecipes', favoriteRecipe);
router.use('/ingredient', ingredient);

module.exports = router;
