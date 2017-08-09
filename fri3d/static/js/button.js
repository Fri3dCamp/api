function show_login_information() {
  var name = readCookie("fri3d");
  if(name) {
    $("#user").html("<b>Aangemeld als: <tt>" + name + "</tt></b> <button onclick=\"logout();\">logout</button>");
  } else {
    $("#user").html("Je bent niet aangemeld...");
  }
}

function login() {
  var name = prompt("Wat is jouw naam?", "Fri3d Hacker");
  createCookie("fri3d", name);
  location.reload();
}

function logout() {
  eraseCookie("fri3d");
  location.reload();
}

// show current login information
$( document ).ready(show_login_information);
