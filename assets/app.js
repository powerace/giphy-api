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
	  var results = response.data;
	  displayResults(results);
	  gifClicks(results);
	}).fail(function(err) {
	  throw err;
	});
});

//click gif behavior
function gifClicks(results){
	$('.searchResults').on('click', '.animalImage', function(){
		var imgSrc = $(this).attr('src');
		var gifNum = $(this).attr('data-number');
		var still = results[gifNum].images.original_still.url;
		var gif = results[gifNum].images.fixed_height.url;


		if (imgSrc === still){
			$(this).attr('src', gif);
		} else {
			$(this).attr('src', still);
		}
		
	});
}

function displayResults(results){
	for (var i = 0; i < results.length; i++) {
	    var gifDiv = $("<div class='animalItem'>");

	    var rating = results[i].rating;

	    var p = $("<p>").text("Rating: " + rating);

	    var animalImage = $("<img class='animalImage'>");
	    animalImage.attr("src", results[i].images.original_still.url);

	    gifDiv.append(p).append(animalImage);

	    $(".searchResults").append(gifDiv);

	    animalImage.attr('data-number', i);
	}
}

function buildButton(name){
	
	$('.searchButtons').append('<button class="animal btn btn-primary">' + name + '</button>');
	
}