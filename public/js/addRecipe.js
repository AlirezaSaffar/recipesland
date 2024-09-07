
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
fetch("/recipes/add",{
method: "POST",
headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
},
body: JSON.stringify({
  token:  getcookie("login")
}),

})
  function add() {
    var title = document.getElementById("title").value;
    var ing = document.getElementById("ing").value;
    var desp = document.getElementById("desp").value;
    fetch("/api/recipes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy : mycheck,
        title: title,
        ingredients: ing,
        description: desp
      }),
    }).then((res) => {console.log(res)});
    alert('you added recipe')
    document.getElementById("title").value="";
    document.getElementById("ing").value="";
   document.getElementById("desp").value="";
  }
  function gohome(){
    window.location.assign("http://localhost:3001/recipes");
  }
