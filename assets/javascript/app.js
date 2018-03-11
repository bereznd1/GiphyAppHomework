// var animal = $(this).attr("data-animal");


var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=KjGKCBE3CHHFMp0PAbWal01ui7fGSnN3&limit=10";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {


});