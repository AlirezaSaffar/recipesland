const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "recipe title must be provided"]
    },
    createdBy: {
        type: String,
        required: [false]
    },
    ingredients: {
        type: String,
        required: [true, "ingredients must be provided"]
    },
    description: {
        type: String,
        required: [false]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    rate: {
        type: Number,
        default: 0
    },
    numberOfRate: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Recipe', recipeSchema)