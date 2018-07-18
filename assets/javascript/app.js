$( document ).ready(function() {
    $.ajax({
    url: "http://api.giphy.com/v1/gifs/search?api_key=nKAMR4x2vLiOe2HJePFzIVnGfsAeFokB&q=looney+toons&limit=1",
    method: "GET"
}).then(function (response) {
    console.log(response);
});
//// end of doc.ready
});