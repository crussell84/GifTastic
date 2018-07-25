$(document).ready(function () {
    var toons = ["Bugs Bunny", "Elmer Fudd", "Tweety"];
    var $searchButtons = $("div.search-buttons");
    var $addToon = $("#add-toon");
    var $gifDisplay = $(".gifs-appear-here");

    function renderButtons() {
        $searchButtons.empty();

        // Looping through the array of movies
        for (var i = 0; i < toons.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("toon");
            // Adding a data-attribute with a value of the movie at index i
            a.attr("data-name", toons[i]);
            // Providing the button's text with a value of the movie at index i
            a.text(toons[i]);
            // Adding the button to the HTML
            $searchButtons.append(a);
        }
    }
    function resetDisplay(){
        $gifDisplay.empty();
    }

    function runSearch() {
        //reset the display & url before running search
        resetDisplay();
        var url = "http://api.giphy.com/v1/gifs/search?api_key=nKAMR4x2vLiOe2HJePFzIVnGfsAeFokB&limit=10&rating=pg-13&q="
        var toon = $(this).attr("data-name");
        url = url + toon;

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var $toonDiv = $("<div>");
                $toonDiv.addClass("col-m-4 border m-2");
                var $p = $("<p>").text("Rating: " + results[i].rating).addClass("text-center font-weight-bold m-2");
                var $toonImage = $("<img>");
                $toonImage.attr({
                    "src": results[i].images.fixed_height_still.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "still",
                    "class": "rounded m-2"
                });
                $toonDiv.append($p);
                $toonDiv.append($toonImage);
                $gifDisplay.append($toonDiv);
            }
        });
    }

    function playPauseGIF() {
        var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }

    $addToon.on("click", function (event) {
        event.preventDefault();
        var toon = $("#toon-input").val().trim();
        toons.push(toon);
        renderButtons();
    });

    $searchButtons.on("click", ".toon", runSearch);
    $gifDisplay.on("click", "img", playPauseGIF);

    renderButtons();


    //// end of doc.ready
});