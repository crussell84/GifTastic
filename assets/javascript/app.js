$(document).ready(function () {
    var toons = ["Bugs Bunny", "Elmer Fudd", "Tweety"];
    var $searchButtons = $("div.search-buttons");

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

    $("#add-toon").on("click", function (event) {
        event.preventDefault();
        var toon = $("#toon-input").val().trim();
        toons.push(toon);
        renderButtons();
    });

    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?api_key=nKAMR4x2vLiOe2HJePFzIVnGfsAeFokB&q=looney+toons&limit=1",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

    renderButtons();


    //// end of doc.ready
});