
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
    $(".imageMovie").children().remove();
    $('#movieName').text(jd.original_title);
    $("#movieRating").text(jd.vote_average);
    $('#movieDescr').text(jd.overview);
    jd.genres.forEach(genre => {
      $("#movieGenre").append("<li>" + genre.name + "</li>");
    });
    $('#movieReleaseDate').text(jd.release_date);
    $('#movieBudget').text(jd.budget);
    var posterPath = jd.poster_path;
    $(".imageMovie").append("<img src=\""+img_base_url + "original" + posterPath + "\" alt=\"\"></img>");
 });
 $(".imagesMovie").children().remove();
 $(".list_img").children().remove();
  insertImagesForAMovie(id);
  insertImagesSimilarMovies(id);
}

/* Images and link for 10 similar movies */
function insertImagesSimilarMovies(id){
  $.getJSON(urlStart + movie_details_url + id + "/similar?" + apiKey, function(jd){
    for(let i=0; i<jd.results.length && i<=9; i++){
      $(".list_img").append("<li class=\"img\"><a href=\"#\"><img idMovie =\""+jd.results[i].id +"\"src=\"https://image.tmdb.org/t/p/w154/" +jd.results[i].poster_path + "\" alt=\" \"></a></li>");
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
              $(".imagesMovie").append("<div style=\"display:none\"><img src=\"https://image.tmdb.org/t/p/original/" + element.file_path + "\" alt=\" \"></div>");
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
    $(".genre").append("<li><a href=\"#\">"+genre.name+"</a><ul class=\"genreID\"><li class=\"bestMovie\"><a href=\"#\">Best movie</a></li> <li class=\"randomMovie\"><a href=\"#\">Random movie</a></li><input type=\"hidden\" value=\""+genre.id+"\"></ul>");
   });
 });
});

// BEST MOVIE FOR A SPECIFIC GENRE
$("body").on("click", ".bestMovie a", function(){
  var genreId = $(this).parent().parent().children('input').last().val();
  $.getJSON(urlStart + "3/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&with_genres=" + genreId + "&" + apiKey, function(jd){
    for (let i=0; i<=jd.results.length-1; i++){
      console.log(jd.results[i].vote_count);
      if(parseInt(jd.results[i].vote_count) > 200){
        getInfoMovie(jd.results[i].id);
        break;
      }
    }
  });
});

$("body").on("click",".list_img li a img", function(){
    getInfoMovie($(this).attr("idmovie"));
});

// RANDOM MOVIE FOR A SPECIFIC GENRE AFTER 2015
$("body").on("click", ".randomMovie a", function(){
  var genreId = $(this).parent().parent().children('input').last().val();
  $.getJSON(urlStart + "3/discover/movie?primary_release_date.gte=2015&with_genres=" + genreId + "&" + apiKey, function(jd){
    console.log(jd.results.length);
    getInfoMovie(jd.results[Math.floor(Math.random() * jd.results.length)].id);
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
    $('.imagesMovie > div:first').fadeOut(1000).next().fadeIn(1000).end().appendTo('.imagesMovie');
  },  3000);
