const recipes = document.querySelector(".recipes");
const searchForm = document.querySelector(".search");
const searchField = document.querySelector(".search-field");
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
fetch("/recipes",{
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token:  getcookie("login")
  })

}).then((res) => {console.log(res)})

function exit(){
  setcookie("login", " ", -1);
  window.location.assign("/users/login");

}

fetch("/api/recipes").then(async (res) => {
  let result = await res.json();
  while (recipes.firstChild) {
    recipes.firstChild.remove();
  }
  result.forEach((element) => {
    let card = document.createElement("div");
    card.classList.add("card");
    let title = document.createElement("h3");
    title.classList.add("title");
    let ingredients = document.createElement("p");
    ingredients.classList.add("ingredients");
    let date = document.createElement("p");
    date.classList.add("date");
    let rate = document.createElement("p");
    rate.classList.add("rate");
    let rateContainer = document.createElement("div");
    rateContainer.classList.add("rate-container");
    rateContainer.append(rate);
    rateContainer.append(date);
    card.append(title);
    card.append(ingredients);
    card.append(rateContainer);
    title.textContent = element.title;
    ingredients.textContent = "ingredients: " + element.ingredients;
    date.textContent = element.createdAt.toLocaleString();
    rate.textContent = "rating: " + element.rate;
    card.onclick = (e) => {
      window.location.href = "/recipes/recipe?id=" + element._id;
    };
    console.log(element.title);
    recipes.appendChild(card);
  });
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = searchField.value;
  searchField.innerHTML = "";
  fetch("/api/search?title=" + value)
    .then(async (res) => {
      let result = await res.json();
      while (recipes.firstChild) {
        recipes.firstChild.remove();
      }
      console.log(result);
      result.forEach((element) => {
        let card = document.createElement("div");
        card.classList.add("card");
        let title = document.createElement("h3");
        title.classList.add("title");
        let ingredients = document.createElement("p");
        ingredients.classList.add("ingredients");
        let date = document.createElement("p");
        date.classList.add("date");
        let rate = document.createElement("p");
        rate.classList.add("rate");
        let rateContainer = document.createElement("div");
        rateContainer.classList.add("rate-container");
        rateContainer.append(rate);
        rateContainer.append(date);
        card.append(title);
        card.append(ingredients);
        card.append(rateContainer);
        title.textContent = element.title;
        ingredients.textContent = "ingredients: " + element.ingredients;
        date.textContent = element.createdAt.toLocaleString();
        rate.textContent = "rating: " + element.rate;
        card.onclick = (e) => {
          window.location.href = "/recipes/recipe?id=" + element._id;
        };
        recipes.appendChild(card);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
