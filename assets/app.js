var searchButtons = ["aardvark", "beagle", "cobra"];

//build and append all buttons
for (var i = 0; i < searchButtons.length; i++){
	buildButton(searchButtons[i]);
}

//add button
$("button[type='submit']").on("click", function() {
	event.preventDefault();
	if ($('#name').val() != ''){
		buildButton($('#name').val());
	} 
	
});

//search with buttons
$(".searchButtons").on("click", "button.animal", function() {
	$(".searchResults").empty();
    var searchTerm = $(this).text().trim();
	var url = "http://api.giphy.com/v1/gifs/search";
	url += '?' + $.param({
	  'api_key': "dc6zaTOxFJmzC",
	   'q': searchTerm,
	   'limit': 10,
	   'rating': "g"
	});

	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(response) {
	  console.log(response);
	  var results = response.data;
	  displayResults(results);
	}).fail(function(err) {
	  throw err;
	});
});

function displayResults(results){
	for (var i = 0; i < results.length; i++) {
	    var gifDiv = $("<div class='animalItem'>");

	    var rating = results[i].rating;

	    var p = $("<p>").text("Rating: " + rating);

	    var animalImage = $("<img>");
	    animalImage.attr("src", results[i].images.fixed_height.url);

	    gifDiv.append(p).append(animalImage);

	    $(".searchResults").append(gifDiv);
	  }
}

function buildButton(name){
	
	$('.searchButtons').append('<button class="animal btn btn-primary">' + name + '</button>');
	
}