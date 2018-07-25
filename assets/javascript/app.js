$(document).ready(function () {
    var toons = ["Bugs Bunny", "Elmer Fudd", "Tweety", "Marvin the Martian", "Daffy Duck", "Wile E. Coyote"];
    var $searchButtons = $("div.search-buttons");
    var $addToon = $("#add-toon");
    var $gifDisplay = $(".gifs-appear-here");

    function renderButtons() {
        $searchButtons.empty();

        
        for (var i = 0; i < toons.length; i++) {
            var a = $("<button>");
            a.addClass("toon m-1 btn btn-dark");
            a.attr("data-name", toons[i]);
            a.text(toons[i]);
            $searchButtons.append(a);
        }
    }
    function resetDisplay(){
        $gifDisplay.empty();
    }

    function runSearch() {
        //reset the display & url before running search
        resetDisplay();
        var url = "https://api.giphy.com/v1/gifs/search?api_key=nKAMR4x2vLiOe2HJePFzIVnGfsAeFokB&limit=10&rating=pg-13&q="
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
                $toonDiv.addClass("col-m-4 border m-2 bg-light");
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
        if (!toons.includes(toon) && (toon)){
        toons.push(toon);}
        renderButtons();
        document.getElementById("toon-form").reset();
    });

    $searchButtons.on("click", ".toon", runSearch);
    $gifDisplay.on("click", "img", playPauseGIF);

    renderButtons();


    //// end of doc.ready
});