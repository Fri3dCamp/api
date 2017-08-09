function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = encodeURIComponent(name) + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

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
