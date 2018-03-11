//Global array of movie name strings
var topics = ["Boyz n the Hood", "Pulp Fiction", "Borat", "Menace II Society", "Goodfellas", "Scarface", "One Flew Over the Cuckoo's Nest", "New Jack City", "Jackie Brown", "8 Mile", "Forrest Gump", "The Godfather", "Terminator", "The Shining", "IT"];


//Function that creates new buttons using the strings in the Movie Name array
function makeButtons() {


    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var b = $("<button class='movie'>").attr("movie-name", topics[i]).text(topics[i]);
        $("#buttons").append(b);
    }

}

//Calling the Make Buttons function upon page load
makeButtons();





//Generating new gifs based on the button that was clicked
$(document).on("click", ".movie", function () {

    //Empties out the gifs div from any previous content it might've had
    $("#gifs").empty();

    //Gets the value of the movie-name attribute that we set up earlier from the specific button that was clicked
    var movieName = $(this).attr("movie-name");

    //Sets up the url that the ajax call will use
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movieName + "&api_key=KjGKCBE3CHHFMp0PAbWal01ui7fGSnN3&limit=10";

    //Ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        //Stores the actual image array that is returned within a results variable for easier access down below
        var results = response.data;

        //Loops through all the images in the image array that is returned...
        for (var i = 0; i < results.length; i++) {

            //Creates a new span for each gif within the array, & also a new paragraph to store that gif's rating
            var movieSpan = $("<span class = 'movie-span'>");
            var p = $("<p>");
            p.html("<br><strong>Rating</strong>: " + results[i].rating);

            //Creates a new image tag and sets its src attribute to the url of the gif that's in question
            var movieImage = $("<img class='movie-image'>");
            movieImage.attr("src", results[i].images.fixed_height_still.url);

            //Sets up code so that the gifs can be played or paused
            movieImage.attr("data-state", "still");
            movieImage.attr("data-still", results[i].images.fixed_height_still.url);
            movieImage.attr("data-animate", results[i].images.fixed_height.url);

            //Appends the movie image & its corresponding paragraph to the movie div, and then prepends that movie div to the main gifs div in the page
            movieSpan.append(movieImage);
            movieSpan.prepend(p);
            $("#gifs").prepend(movieSpan);
        }


        //If one of the gifs is clicked...
        $(".movie-image").on("click", function () {

            //Creates a variable that gets the value of the "data-state" attribute we assigned to each image in the loop above
            var state = $(this).attr("data-state");

            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
        });
    });
});







//Taking input from the form & adding it to the buttons 
$("#submit").on("click", function (event) {

    event.preventDefault();

    //Gets the value that was entered into the search box and then clears the search box out
    var newMovie = $("#gif-search").val();
    $("#gif-search").val("");

    //Adds the movie that was entered into our array of movies
    topics.push(newMovie);

    //Calls the make buttons function to regenerate all our buttons, with the new movie added to them
    makeButtons();

});








