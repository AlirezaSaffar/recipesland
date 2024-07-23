const express = require("express")
const searchRouter = express.Router()
const Recipe = require("../models/recipe")

searchRouter.route("/search").get(async (req, res) => {
    const title = req.query.title
    const recipes = await Recipe.find({title: title}).limit(15)
    res.json(recipes)
})

module.exports = searchRouter