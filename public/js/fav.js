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
fetch("/users/fav",{
  method: "POST",
headers: {
Accept: "application/json",
"Content-Type": "application/json",
},
body: JSON.stringify({
token:  getcookie("login")
}),
})

var username= getcookie("login");
fetch("/api/user/favs", {
 method: "POST",
 headers: {
   Accept: "application/json",
   "Content-Type": "application/json",
 },
 body: JSON.stringify({
   name:username
 }),
}).then(response=>{

 return response.json()}).then(date=>{
    console.log(date);
var foodsfav=date.split('-');
var txt="";
for(var i =1;i<foodsfav.length;i++){

  
  txt=txt + i.toString()+'.'+ foodsfav[i]+"<br>";
}
document.getElementById('ll').innerHTML= txt;


 })
 function gohome(){
  window.location.assign("http://localhost:3001/recipes");
}
