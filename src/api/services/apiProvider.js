const httpStatus = require('http-status');
const unirest = require('unirest');
const {forIn, isObject, isEmpty} = require('lodash');
const { foodAPI } = require('../../config/vars');

exports.get = (url, filter)=>{
  const prom = new Promise((resolve, reject)=>{
    unirest.get(foodAPI.url + url) // "/recipes/informationBulk?ids=602708%2C227961"
    .header("X-RapidAPI-Key", foodAPI.key)
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
      if (result.status === 200 || result.status === 201 || result.status === 404) {
        resolve(result)
      } else{
        reject(result);
      }
    })
    .catch(reject);
  });
  
  return prom;
}


exports.post = (url, filter)=>{
  const prom = new Promise((resolve, reject)=>{
    var apiReq = unirest.post(foodAPI.url + url) // "/recipes/parseIngredients"
          .header("X-RapidAPI-Key", foodAPI.key)
          .header("Content-Type", "application/x-www-form-urlencoded");
          if (isEmpty(filter) && isObject(filter)) {
            forIn(filter, (val, key)=>{
              apiReq = apiReq.send(`${key}=${val}`);
            });
          }
          // .send("ingredientList=3 oz pork shoulder")
          // .send("servings=2")
          apiReq
          .end(function (result) {
            console.log(result.status, result.headers, result.body);
            if (result.status === 200 || result.status === 201 || result.status === 404) {
              resolve(result)
            } else{
              reject(result);
            }
          })
          .catch(reject);
      });
  
  return prom;
}
