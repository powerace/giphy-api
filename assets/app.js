
var searchTerm = $('#search').val();

var url = "http://api.giphy.com/v1/gifs/search";
url += '?' + $.param({
  'api_key': "dc6zaTOxFJmzC",
   'q': searchTerm,
   'limit': 10,
   'rating': "pg-13"
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});