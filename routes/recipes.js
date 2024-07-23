const express = require("express");
const recipeRouter = express.Router();
const Recipe = require("../models/recipe");

recipeRouter
  .route("/recipes")
  .get(async (req, res) => {
    const recipes = await Recipe.find().limit(15);
    res.json(recipes);
  })
  .post(async (req, res) => {
    const result = await Recipe.insertMany({
      title: req.body.title,
      ingredients: req.body.ingredients,
      description: req.body.description
    });
    res.status(200).send("success")
  });

recipeRouter.route("/recipes/recipe").get(async (req, res) => {
  const recipe = await Recipe.findById(req.query.id).exec();
  res.json(recipe);
});

module.exports = recipeRouter;
