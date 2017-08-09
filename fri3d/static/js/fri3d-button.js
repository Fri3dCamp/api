// TODO: check location for localhost, if so use "local" path, else fixed

function refresh_button(button) {
  var target = encodeURIComponent(button.data("target"));
  $.get( "/api/button?target=" + target, function( amount ) {
    $(button.find("DIV")[0]).html(amount);
  });
  setTimeout(5000, function() { refresh_button(button); })
}

function click_button(button) {
  var target = button.data("target");
  var data   = { "target" : target };
  $.ajax({
    type: "POST",
    url: "/api/button",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      if(data) {
        $.notify("Ok.", {
          className: "success",
          position:"top center"
        });
        refresh_button(button);
      } else {
        errMsg = ""; // TODO
        $.notify("Oops: " + errMsg, {
          className: "error",
          position:"top center"
        });
      }
    },
    failure: function(errMsg) {
      $.notify("Opps: " + errMsg, {
        className: "error",
        position:"top center"
      });
    }
  });
}

function make_button(div) {
  var target = div.id || location.href;
  var image   = $("<img>",   { "src"   : "/static/images/fri3d.jpeg" });
  var text    = $("<span>",  { "class" : "text" }).text("I'm in");
  var counter = $("<div>",   { "class" : "amount" });
  $(div).append( image, text, counter );
  $(div).data("target", target);
  var name = readCookie("fri3d");
  if(name) {
    $(div).click( function() { click_button($(div)) } );
  }
  refresh_button($(div))
}

// detect buttons
$( document ).ready(function() {
  // add button styling
  $("<link/>", {
     rel: "stylesheet",
     type: "text/css",
     href: "/static/css/fri3d-button.css"
  }).appendTo("head");

  // discover button(s) on this page
  $(".fri3d.button").each(function(index) {
    make_button(this);
  });
});
