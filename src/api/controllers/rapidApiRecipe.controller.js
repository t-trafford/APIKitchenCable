/* eslint-disable camelcase */
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const unirest = require('unirest');
const { isArray } = require('lodash');
const unirest_prom = require('../services/unirest.promiseProvider');
const { foodAPI } = require('../../config/vars');
const Ingredient = require('../models/ingredient.model');


/**
 * search recipe
 * @public
 */
exports.search = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      query.push(`number=${ req.query.number||10}`);
      query.push(`offset=${ req.query.offset||0}`);
      if (req.query.diet) {
        query.push(`diet=${ req.query.diet}`);
      }
      if (req.query.excludeIngredients) {
        query.push(`excludeIngredients=${ req.query.excludeIngredients}`);
      }
      if (req.query.intolerances) {
        query.push(`intolerances=${ req.query.intolerances}`);
      }
      if (req.query.type) {
        query.push(`type=${ req.query.type}`);
      }
      if (req.query.cuisine) {
        query.push(`cuisine=${ req.query.cuisine}`);
      }
      if (req.query.query) {
        query.push(`query=${ req.query.query}`);
      } else {
        query.push('query=a');
      }
    } else{
      query.push('number=20');
      query.push('offset=0');
      query.push('query=a');
    }
    let url = `${foodAPI.url}/recipes/search?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

/**
 * random recipe
 * @public
 */
exports.random = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      query.push(`number=${ req.query.number||20}`);
      query.push(`limitLicense=${ req.query.limitLicense||false}`);
      if (req.query.tags) {
        query.push(`tags=${ req.query.tags}`);
      }
    } else{
      query.push('number=20');
    }
    let url = `${foodAPI.url}/recipes/random?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);

        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.complex = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      query.push(`limitLicense=${ req.query.limitLicense||false}`);
      query.push(`offset=${ req.query.offset||0}`);
      query.push(`number=${ req.query.number||10}`);
      if (req.query.query) {
        query.push(`query=${ req.query.query}`);
      }
      if (req.query.cuisine) {
        query.push(`cuisine=${ req.query.cuisine}`);
      }
      if (req.query.diet) {
        query.push(`diet=${ req.query.diet}`);
      }
      if (req.query.type) {
        query.push(`type=${ req.query.type}`);
      }
      if (req.query.includeIngredients) {
        query.push(`includeIngredients=${ req.query.includeIngredients}`);
      }
      if (req.query.excludeIngredients) {
        query.push(`excludeIngredients=${ req.query.excludeIngredients}`);
      }

      if (req.query.intolerances) {
        query.push(`intolerances=${ req.query.intolerances}`);
      }
      if (req.query.ranking) {
        query.push(`ranking=${ req.query.ranking}`);
      }
      if (req.query.minCalories) {
        query.push(`minCalories=${ req.query.minCalories}`);
      }
      if (req.query.minFat) {
        query.push(`minFat=${ req.query.minFat}`);
      }
      if (req.query.maxFat) {
        query.push(`maxFat=${ req.query.maxFat}`);
      }
      if (req.query.minProtein) {
        query.push(`minProtein=${ req.query.minProtein}`);
      }
      if (req.query.maxProtein) {
        query.push(`maxProtein=${ req.query.maxProtein}`);
      }
      if (req.query.minCarbs) {
        query.push(`minCarbs=${ req.query.minCarbs}`);
      }
      if (req.query.maxCarbs) {
        query.push(`maxCarbs=${ req.query.maxCarbs}`);
      }
      if (req.query.fillIngredients) {
        query.push(`fillIngredients=${ req.query.fillIngredients}`);
      }
      if (req.query.instructionsRequired) {
        query.push(`instructionsRequired=${ req.query.instructionsRequired}`);
      }
      if (req.query.addRecipeInformation) {
        query.push(`addRecipeInformation=${ req.query.addRecipeInformation}`);
      }
      if (req.query.minAlcohol) {
        query.push(`minAlcohol=${ req.query.minAlcohol}`);
      }
      if (req.query.maxAlcohol) {
        query.push(`maxAlcohol=${ req.query.maxAlcohol}`);
      }
      if (req.query.minCaffeine) {
        query.push(`minCaffeine=${ req.query.minCaffeine}`);
      }
      if (req.query.maxCaffeine) {
        query.push(`maxCaffeine=${ req.query.maxCaffeine}`);
      }
      if (req.query.minCopper) {
        query.push(`minCopper=${ req.query.minCopper}`);
      }
      if (req.query.maxCopper) {
        query.push(`maxCopper=${ req.query.maxCopper}`);
      }
      if (req.query.minCalcium) {
        query.push(`minCalcium=${ req.query.minCalcium}`);
      }
      if (req.query.maxCalcium) {
        query.push(`maxCalcium=${ req.query.maxCalcium}`);
      }
      if (req.query.minCholine) {
        query.push(`minCholine=${ req.query.minCholine}`);
      }
      if (req.query.maxCholine) {
        query.push(`maxCholine=${ req.query.maxCholine}`);
      }
      if (req.query.minCholesterol) {
        query.push(`minCholesterol=${ req.query.minCholesterol}`);
      }
      if (req.query.minFluoride) {
        query.push(`minFluoride=${ req.query.minFluoride}`);
      }
      if (req.query.maxFluoride) {
        query.push(`maxFluoride=${ req.query.maxFluoride}`);
      }
      if (req.query.minSaturatedFat) {
        query.push(`minSaturatedFat=${ req.query.minSaturatedFat}`);
      }
      if (req.query.maxSaturatedFat) {
        query.push(`maxSaturatedFat=${ req.query.maxSaturatedFat}`);
      }
      if (req.query.minVitaminA) {
        query.push(`minVitaminA=${ req.query.minVitaminA}`);
      }
      if (req.query.maxVitaminA) {
        query.push(`maxVitaminA=${ req.query.maxVitaminA}`);
      }
      if (req.query.minVitaminC) {
        query.push(`minVitaminC=${ req.query.minVitaminC}`);
      }
      if (req.query.maxVitaminC) {
        query.push(`maxVitaminC=${ req.query.maxVitaminC}`);
      }
      if (req.query.minVitaminD) {
        query.push(`minVitaminD=${ req.query.minVitaminD}`);
      }
      if (req.query.maxVitaminD) {
        query.push(`maxVitaminD=${ req.query.maxVitaminD}`);
      }
      if (req.query.minVitaminE) {
        query.push(`minVitaminE=${ req.query.minVitaminE}`);
      }
      if (req.query.minVitaminK) {
        query.push(`minVitaminK=${ req.query.minVitaminK}`);
      }
      if (req.query.maxVitaminK) {
        query.push(`maxVitaminK=${ req.query.maxVitaminK}`);
      }
      if (req.query.minVitaminB1) {
        query.push(`minVitaminB1=${ req.query.minVitaminB1}`);
      }
      if (req.query.maxVitaminB1) {
        query.push(`maxVitaminB1=${ req.query.maxVitaminB1}`);
      }
      if (req.query.minVitaminB2) {
        query.push(`minVitaminB2=${ req.query.minVitaminB2}`);
      }
      if (req.query.maxVitaminB2) {
        query.push(`maxVitaminB2=${ req.query.maxVitaminB2}`);
      }
      if (req.query.minVitaminB3) {
        query.push(`minVitaminB3=${ req.query.minVitaminB3}`);
      }
      if (req.query.maxVitaminB3) {
        query.push(`maxVitaminB3=${ req.query.maxVitaminB3}`);
      }
      if (req.query.minVitaminB5) {
        query.push(`minVitaminB5=${ req.query.minVitaminB5}`);
      }
      if (req.query.maxVitaminB5) {
        query.push(`maxVitaminB5=${ req.query.maxVitaminB5}`);
      }
      if (req.query.minVitaminB6) {
        query.push(`minVitaminB6=${ req.query.minVitaminB6}`);
      }
      if (req.query.maxVitaminB6) {
        query.push(`maxVitaminB6=${ req.query.maxVitaminB6}`);
      }
      if (req.query.minVitaminB12) {
        query.push(`minVitaminB12=${ req.query.minVitaminB12}`);
      }
      if (req.query.maxVitaminB12) {
        query.push(`maxVitaminB12=${ req.query.maxVitaminB12}`);
      }
      if (req.query.minFiber) {
        query.push(`minFiber=${ req.query.minFiber}`);
      }
      if (req.query.maxFiber) {
        query.push(`maxFiber=${ req.query.maxFiber}`);
      }
      if (req.query.minFolate) {
        query.push(`minFolate=${ req.query.minFolate}`);
      }
      if (req.query.maxVitaminB2) {
        query.push(`maxVitaminB2=${ req.query.maxVitaminB2}`);
      }
      if (req.query.maxFolate) {
        query.push(`maxFolate=${ req.query.maxFolate}`);
      }
      if (req.query.minFolicAcid) {
        query.push(`minFolicAcid=${ req.query.minFolicAcid}`);
      }
      if (req.query.minIodine) {
        query.push(`minIodine=${ req.query.minIodine}`);
      }
      if (req.query.maxIodine) {
        query.push(`maxIodine=${ req.query.maxIodine}`);
      }
      if (req.query.minIron) {
        query.push(`minIron=${ req.query.minIron}`);
      }
      if (req.query.maxIron) {
        query.push(`maxIron=${ req.query.maxIron}`);
      }
      if (req.query.minMagnesium) {
        query.push(`minMagnesium=${ req.query.minMagnesium}`);
      }
      if (req.query.maxMagnesium) {
        query.push(`maxMagnesium=${ req.query.maxMagnesium}`);
      }
      if (req.query.minManganese) {
        query.push(`minManganese=${ req.query.minManganese}`);
      }
      if (req.query.maxManganese) {
        query.push(`maxManganese=${ req.query.maxManganese}`);
      }
      if (req.query.minPhosphorus) {
        query.push(`minPhosphorus=${ req.query.minPhosphorus}`);
      }

      if (req.query.maxPhosphorus) {
        query.push(`maxPhosphorus=${ req.query.maxPhosphorus}`);
      }

      if (req.query.minPotassium) {
        query.push(`minPotassium=${ req.query.minPotassium}`);
      }

      if (req.query.maxPotassium) {
        query.push(`maxPotassium=${ req.query.maxPotassium}`);
      }

      if (req.query.minSelenium) {
        query.push(`minSelenium=${ req.query.minSelenium}`);
      }

      if (req.query.maxSelenium) {
        query.push(`maxSelenium=${ req.query.maxSelenium}`);
      }

      if (req.query.minSodium) {
        query.push(`minSodium=${ req.query.minSodium}`);
      }
      if (req.query.maxSodium) {
        query.push(`maxSodium=${ req.query.maxSodium}`);
      }
      if (req.query.minSugar) {
        query.push(`minSugar=${ req.query.minSugar}`);
      }
      if (req.query.maxSugar) {
        query.push(`maxSugar=${ req.query.maxSugar}`);
      }
      if (req.query.minZinc) {
        query.push(`minZinc=${ req.query.minZinc}`);
      }
      if (req.query.maxZinc) {
        query.push(`maxZinc=${ req.query.maxZinc}`);
      }
      if (req.query.equipment) {
        query.push(`equipment=${ req.query.equipment}`);
      }
      if (req.query.author) {
        query.push(`author=${ req.query.author}`);
      }
    } else{
      query.push('number=10');
      query.push('offset=0');
      query.push('limitLicense=false');
    }
    let url = `${foodAPI.url}/recipes/searchComplex?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);

        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.autocompleterecipe = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      query.push(`query=${ req.query.query||"chicken"}`);
      if (req.query.number) {
        query.push(`number=${ req.query.number}`);
      }
    } else{
      query.push('query=chicken');
    }
    let url = `${foodAPI.url}/recipes/autocomplete?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.detectfood = async (req, res, next) => {
  try {
    let url = `${foodAPI.url}/food/detect`;

    let request_obj = unirest.post(url)
      .header('X-RapidAPI-Key', foodAPI.key)
      .send('text=' + (req.body.text || ''));

    unirest_prom(request_obj)
      .then((result) => {
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.detectAndParsefood = async (req, res, next) => {
  try {
    const url = `${foodAPI.url}/food/detect`;

    const request_obj = unirest.post(url)
      .header('X-RapidAPI-Key', foodAPI.key)
      .send(`text=${req.body.ingredientText}`);

    unirest_prom(request_obj)
      .then((result) => {
        if (result && isArray(result.annotations)) {
          const prom = [];
          (result.annotations).forEach((item) => {
            prom.push(execute_ops(req.body.user, item));
          });

          Promise.all(prom)
            .then((reslt) => {
              Ingredient.find({
                user: typeof req.body.user === 'object' ? req.body.user : mongoose.Types.ObjectId(req.body.user),
                tag: 'ingredient',
              }).then((savedIngredients) => {
                res.status(httpStatus.CREATED);
                res.json(savedIngredients);
              });
            })
            .catch((err) => {
              res.status(httpStatus.BAD_REQUEST);
              next(err);
            });
        } else {
          res.status(httpStatus.CREATED);
          res.json([]);
        }
      }).catch((err) => {
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

const execute_ops = (user, item) => new Promise((resolve, reject) => {

    Ingredient.findOne({
      user: typeof user === 'object' ? user : mongoose.Types.ObjectId(user),
      ingredient: item.annotation,
      tag: item.tag,
    }).then(async (existingEntry) => {
      if (!existingEntry) {
        const ingredient = new Ingredient({
          user: typeof user === 'object' ? user : mongoose.Types.ObjectId(user),
          ingredient: item.annotation,
          tag: item.tag,
        });
        const savedRecord = await ingredient.save();
        resolve(savedRecord);
      } else {
        resolve(existingEntry);
      }
    });
  });

// export.detectAndParsefood = async (req, res, next) => {
//   try {
//     var url = foodAPI.url+"/food/detect";

//     var request_obj = unirest.post(url)
//     .header("X-RapidAPI-Key", foodAPI.key)
//     .send("text="+req.body.ingredientText);

//     unirest_prom(request_obj)
//     .then(result => {
//     }).catch(err=>{
//       console.log(err)
//       next(err);
//     });
//     } catch (error) {
//       next(error);
//     }
// };

exports.autocompleteingredient = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      query.push(`query=${ req.query.query||" "}`);

      if (req.query.number) {
        query.push(`number=${ req.query.number}`);
      }
      if (req.query.metaInformation) {
        query.push(`metaInformation=${ req.query.metaInformation}`);
      }
      if (req.query.intolerances) {
        query.push(`intolerances=${ req.query.intolerances}`);
      }
    } else{
      query.push('query= ');
    }
    let url = `${foodAPI.url}/recipes/autocomplete?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.substituteingredient = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      query.push(`ingredientName=${ req.query.ingredientName||"butter"}`);
    }else {
      query.push('ingredientName=butter');
    }
    let url = `${foodAPI.url}/food/ingredients/substitutes?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.recipeoverview = async (req, res, next) => {
  try {
    let query = [];
    // if (req.query) {
    //   query.push(':id=' +(req.query.id||"4632"));
    // }else{
    //   query.push(':id=4632');

    // }
    let url = `${foodAPI.url}/recipes/${req.params.id||4632}/summary`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.recipeingredients = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      // query.push('includeNutrition=' +req.query.includeNutrition||"true");
      query.push('includeNutrition=true');

      // query.push(':id=' +(req.query.id||10));
      // if (req.query.includeNutrition) {
      //   query.push('includeNutrition=' +req.query.includeNutrition);
      // }
    }else {
      // query.push('id=4632');

    }
    let url = `${foodAPI.url}/recipes/${req.params.id||4632}/information?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.recipesteps = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      //   query.push(':id=' +(req.query.id||324694));
      if (req.query.stepBreakdown) {
        query.push(`stepBreakdown=${ req.query.stepBreakdown}`);
      }
    }else {
      // query.push(':id=324694');

    }
    let url = `${foodAPI.url}/recipes/${req.params.id||324694}/analyzedInstructions?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};

exports.recipenutritions = async (req, res, next) => {
  try {
    let url = `${foodAPI.url}/recipes/${req.params.id||262682}/nutritionWidget`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key)
      .header('Accept', 'text/html');

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};


exports.generaterecipe = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      query.push(`ingredients=${ req.query.ingredients||"apple,sugar,egg"}`);
      if (req.query.number) {
        query.push(`number=${ req.query.number}`);
      }
      if (req.query.limitLicense) {
        query.push(`limitLicense=${ req.query.limitLicense}`);
      }
      if (req.query.ranking) {
        query.push(`ranking=${ req.query.ranking}`);
      }
      if (req.query.fillIngredients) {
        query.push(`fillIngredients=${ req.query.fillIngredients}`);
      }
    } else{
      query.push('ingredients=apple,sugar,egg');
    }
    let url = `${foodAPI.url}/recipes/findByIngredients?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};


exports.findByIngredients = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      query.push(`ingredients=${ req.query.ingredients||""}`);
      if (req.query.number) {
        query.push(`number=${ req.query.number}`);
      }
      if (req.query.limitLicense) {
        query.push(`limitLicense=${ req.query.limitLicense}`);
      }
      if (req.query.ranking) {
        query.push(`ranking=${ req.query.ranking}`);
      }
      if (req.query.fillIngredients) {
        query.push(`fillIngredients=${ req.query.fillIngredients}`);
      }
    }else {
      query.push('ingredients=');
    }
    let url = `${foodAPI.url}/recipes/findByIngredients?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};


exports.get_information_bulk = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      query.push(`ids=${ req.query.ids||''}`);
      if (req.query.includeNutrition) {
        query.push(`includeNutrition=${ req.query.includeNutrition}`);
      }
    } else{
      query.push(`ids=${ req.query.ids||''}`);
    }
    let url = `${foodAPI.url}/recipes/informationBulk?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};


exports.guessnutrition = async (req, res, next) => {
  try {
    let query = [];
    if (req.query) {
      query.push(`title=${ req.query.title||"Spaghetti Aglio et Olio"}`);
    }else {
      query.push('title=');
    }
    let url = `${foodAPI.url}/recipes/guessNutrition?${query.join('&')}`;
    console.log(url);
    let request_obj = unirest.get(url)
      .header('X-RapidAPI-Key', foodAPI.key);

    unirest_prom(request_obj)
      .then((result) => {
        console.log(result);
        res.status(httpStatus.OK);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    next(error);
  }
};
