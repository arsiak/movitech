
// GET MOVIES INFO

var apiKey = "api_key=74e421022814be845bbda0ea64416be2";
var urlStart = "https://api.themoviedb.org/";

var most_popular_movie_list ="3/discover/movie?sort_by=popularity.desc&";
var movie_details_url = "3/movie/"
var search_movie_url = "3/search/movie?query="


var img_base_url = "https://image.tmdb.org/t/p/";
var img_size ="w154";

var url_genre  = "/3/discover/movie?with_genres=";
var sort_by_best_rating_url = "&sort_by=vote_average.desc"


function getInfoMovie(id){
  $.getJSON(urlStart + movie_details_url + id + "?" + apiKey, function(jd) {
    // ADD MOVIE INFO TO THE HTML PAGE

    /*images_url_for_a_movie.forEach(element => {
      console.log(element);
      $("#imgMovieSlides").append("<img src=\"" + imageUrl + "\" alt=\" \">");
    });*/

    $("#movieGenre").children().remove(); // We empty genres list 
    $('#movieName').text(jd.original_title);
    $("#movieRating").text(jd.vote_average);
    $('#movieDescr').text(jd.overview);
    jd.genres.forEach(genre => {
      $("#movieGenre").append("<li>" + genre.name + "</li>");
    });
    $('#movieReleaseDate').text(jd.release_date);
    $('#movieBudget').text(jd.budget);
    var posterPath = jd.poster_path;
    $("#moviePoster img").attr("src", img_base_url + img_size + posterPath);
 });
 $("#imgMovieSlides").children().remove();
 $(".list_img").children().remove();
  insertImagesForAMovie(id);
  insertImagesSimilarMovies(id);
}

/* Images and link for 10 similar movies */
function insertImagesSimilarMovies(id){
  $.getJSON(urlStart + movie_details_url + id + "/similar?" + apiKey, function(jd){
    for(let i=0; i<jd.results.length && i<=9; i++){
      $(".list_img").append("<li class=\"img\"><a href=\"#\"><img src=\"https://image.tmdb.org/t/p/w154/" +jd.results[i].poster_path + "\" alt=\" \"></a></li>");
    }
    /*jd.results.forEach(movie => {
      $(".list_img").append("<li class=\"img\"><a href=\"#\"><img src=\"https://image.tmdb.org/t/p/w154/" +movie.poster_path + "\" alt=\" \"></a></li>");
    });*/
  });
}

function insertImagesForAMovie(id){
  $.ajax({
    url: urlStart + movie_details_url + id + "/images?" + apiKey,
    type: 'get',
    dataType: 'json',
    success: function(jd) {
          jd.backdrops.forEach((element) => {
              $("#imgMovieSlides").append("<div style=\"display:none\"><img src=\"https://image.tmdb.org/t/p/original/" + element.file_path + "\" alt=\" \"></div>");
          });
    }
  });
}

$(document).ready(() => {
  // GET LIST OF MOST POPULAR MOVIES
  $.getJSON(urlStart + most_popular_movie_list + apiKey, function(jd) {
    // GET MOST POPULAR MOVIE
    var idMostPopularMovie = jd.results[0].id;
    getInfoMovie(idMostPopularMovie);
 });

 $.getJSON(urlStart + "3/genre/movie/list?" + apiKey, function(jd){
   jd.genres.forEach(genre => {
    $(".genre").append("<li><a href=\"#\" id=\""+genre.id+"\">"+genre.name+"</a><ul><li><a href=\"\">Best movie</a></li> <li><a href=\"\">Random movie</a></li></ul></li>");
   });
 });
});

$( "#searchMovieForm" ).submit(function( event ) {
  var search_movie_input = $( "#searchMovie" ).val();
  // GET LIST OF MOST POTENTIAL MOVIES
  $.getJSON(urlStart + search_movie_url + search_movie_input + "&" + apiKey, function(jd) {
    // GET FIRST POTENTIAL MOVIE
    getInfoMovie(jd.results[0].id);
 });
  event.preventDefault();
});


  /*IMAGES FOR A MOVIE SLIDES*/
  setInterval(function() { 
    $('#imgMovieSlides > div:first').fadeOut(1000).next().fadeIn(1000).end().appendTo('#imgMovieSlides');
  },  3000);
