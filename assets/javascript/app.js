$(".btn-primary").on("click", function () {
    event.preventDefault();
    var gifSearch = $(".form-control").val().trim();
    console.log(gifSearch);
    var gifResult = $("<button type=\"button\">");
    console.log(gifResult);
    gifResult.attr("data-gif", gifSearch);
    gifResult.addClass("btn-outline-danger");
    // gifResult.attr("id", "clickMe");
    gifResult.text(gifSearch);
    console.log(gifResult.text(gifSearch));
    $("#button-landing").append(gifResult);

});



$(document).on("click", ".btn-outline-danger", function() {
   var searchMe = $(this).attr("data-gif");
    console.log($(this).attr("data-gif"));
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchMe + "&api_key=F5EgmXa0GAhqXq0K4HpPhz0Afv5OBZg1&limit=10";

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
                // var gifRow = $("<div class=\'row\'>");
                // var gifCol = $("<div class=\'col-lg-12\'>");
                var p = $("<p>").text("Rating:  " + results[i].rating);

                var gifImage = $("<img>");


                gifImage.attr("src", animate);
                gifImage.attr("onclick", "gifPause(this)")
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate", animate);

                

                // gifDiv.addClass("gifLayout");

                gifDiv.append(p);
                gifDiv.append(gifImage);
                

                // gifRow.append(gifCol);
                // gifCol.append(gifDiv);

                $("#landing").append(gifRow);
            }
        })

})
    




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