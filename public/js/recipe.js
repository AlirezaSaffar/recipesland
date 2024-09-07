function setcookie(name, value, exday) {
  var date = new Date();
  date.setTime(date.getTime() + exday * 24 * 60 * 60000);
  var exp = "expires=" + date.toGMTString();
  document.cookie = name + "=" + value + ";" + exp + ";path=/";
}
function getcookie(name) {
    var nmae = +"=";
    var decodecookie = decodeURIComponent(document.cookie);
    var x = decodecookie.split(";");
    var i;
    var xx;
    for (i = 0; i < x.length; i++) {
      xx = x[i];
      while (xx.charAt(0) == " ") {
        xx = xx.substring(1);
      }
      if (xx.indexOf(name) == 0) {
        return xx.substring(name.length + 1);
      }
    }
    return " ";
  }
var mycheck = getcookie("login");
if (mycheck == " ") {
  window.location.assign("/users/login");
}
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let container = document.querySelector(".container")
const title = document.createElement("h2")
title.classList.add("title")
const user = document.createElement("h5")
user.classList.add("user")
const ingredients = document.createElement("p")
ingredients.classList.add("ingredients")
const description = document.createElement("p")
description.classList.add("description")
const rate = document.createElement("p")
const date = document.createElement("p")

fetch("/recipes/recipe",{
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token:  getcookie("login")
  }),

})


fetch("/api/recipes/recipe?id="+params.id).then(async res => {
    let result = await res.json()
    title.textContent = result.title
    setcookie("foodname", result.title,1 )
    ingredients.textContent = "ingredients: "+ result.ingredients
    description.textContent = "description: " + result.description
    rate.textContent = "rating: " + result.rate
    date.textContent = result.createdAt
    container.appendChild(title)
    container.appendChild(ingredients)
    container.appendChild(description)
    container.appendChild(rate)
    container.appendChild(date)
})

const favButton = document.querySelectorAll(".add-favorite")

function funcfav(){
 
    var name = mycheck;
   
  d=getcookie("foodname")
  console.log(d)
    fetch("/api/recipe/fav", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
            food: d
        }),
      }).then(response=>{
        console.log(response)
        return response})
        alert("this recipe added to your favorites");
}

function funcrate(r){
  
   d=getcookie("foodname")
   fetch("/api/recipe/rate", {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       rate :r,
       food:d
     }),
   }).then(response=>{
     console.log(response)
     return response})
  alert("thank you for rating♥")
  fetch("/api/recipes/recipe?id="+params.id).then(async res => {
    let result = await res.json()
    console.log(result)
    title.textContent = result.title
    ingredients.textContent = "ingredients: "+ result.ingredients
    description.textContent = "description: " + result.description
    rate.textContent = "rating: " + result.rate
    console.log(result.date)
    date.textContent = result.createdAt
    container.appendChild(title)
    container.appendChild(ingredients)
    container.appendChild(description)
    container.appendChild(rate)
    container.appendChild(date)
})
}

 function gohome(){
  window.location.assign("/recipes");
}











