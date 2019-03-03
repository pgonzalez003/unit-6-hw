$(".btn-primary").on("click", function () {
    event.preventDefault();
    var gifSearch = $(".form-control").val().trim();
    console.log(gifSearch);
    var gifResult = $("<button type=\"button\">");
    console.log(gifResult)
    gifResult.addClass("btn-outline-danger");
    gifResult.text(gifSearch);
    console.log(gifResult.text(gifSearch));
    $("#button-landing").append(gifResult);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=F5EgmXa0GAhqXq0K4HpPhz0Afv5OBZg1&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(response);
            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {
                const animate = results[i].images.fixed_height_small.url;
                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating:  " + results[i].rating);

                var gifImage = $("<img>");


                gifImage.attr("src", animate);
                gifImage.attr("onclick", "gifPause(this)")
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate", animate);

                gifDiv.append(p);
                gifDiv.append(gifImage);

                $("#landing").append(gifDiv);
            }
        })


});

function gifPause(img) {
    console.log(img);
    var state = $(img).attr("data-state");
    console.log(state)
    if (state === "still") {
        console.log($(img).attr("data-animate"))
        $(img).attr("src", $(img).attr("data-animate"));
        $(img).attr("data-state", "animate");
    } else {
        $(img).attr("src", $(img).attr("data-still"));
        $(img).attr("data-state", "still");
    };
};