var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function handleRegisterAnimation(){
  x.style.left="-120%";
  y.style.left="33%";
  z.style.left="110px";
}
function handleLoginAnimation(){
  x.style.left="33%";
  y.style.left="120%";
  z.style.left="0px";
}