$(document).ready(function () {
    var toons = ["Bugs Bunny", "Elmer Fudd", "Tweety"];
    var $searchButtons = $("div.search-buttons");
    var $addToon = $("#add-toon");
    var url = "http://api.giphy.com/v1/gifs/search?api_key=nKAMR4x2vLiOe2HJePFzIVnGfsAeFokB&limit=10&q="

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

    function runSearch() {
        var toon = $(this).attr("data-name");
        url = url+toon;

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var toonDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                console.log(p);
                var toonImage = $("<img>");
                toonImage.attr("src", results[i].images.fixed_height.url);
                console.log(toonImage);
                toonImage.append(p);
                toonDiv.append(toonImage);
                $(".gifs-appear-here").append(toonDiv);
              }
        });
    }

    $addToon.on("click", function (event) {
        event.preventDefault();
        var toon = $("#toon-input").val().trim();
        toons.push(toon);
        renderButtons();
    });

    $(document).on("click", ".toon", runSearch);

    renderButtons();


    //// end of doc.ready
});