const express = require("express");
const mongoose = require("mongoose")
const path = require("path")
const recipeRouter = require("./routes/recipes")
const searchRouter = require("./routes/search")
const userscontroler = require("./controler/usercontroler")
const middleware =require("./middleware/checktoken")
require("dotenv").config()
const app = express();

const PORT =  3001

MONGO_URI ="mongodb+srv://alirezasaffaryazdi:UvEXZq3v1rtLEafD@cluster0.xvajdnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use(express.json())
app.use(express.static("./public"))
app.use("/api", recipeRouter, searchRouter)
//app.use("/users/fav",middleware)
//app.use("/recipes",middleware)
//app.use("/recipes/recipe",middleware)
//app.use("/recipes/add",middleware)

app.get("/recipes", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.get("/recipes/recipe", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "recipe.html"))
})

app.get("/recipes/add", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "addRecipe.html"))
})

app.get("/users/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "signup.html"))
})

app.get("/users/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"))
})

app.get("/users/fav", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "fav.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.post("/api/recipe/fav",userscontroler.addfav)

app.post("/api/users/signup", userscontroler.signup) 

app.post("/api/users/login", userscontroler.login)

app.post("/api/recipe/rate", userscontroler.rate)

app.post("/api/user/favs", userscontroler.showfav)


const connectDB = (url) => {
    return mongoose.connect(url);
}
const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => console.log("listening..."))
    } catch (err) {
        console.log(err)
    }
}

start()
