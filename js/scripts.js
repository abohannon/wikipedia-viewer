var apiURL = "https://en.wikipedia.org/w/api.php?callback=?";

$(document).ready(function(){

  $("#js-search-form").on("submit", search);

});

function search(event){
  event.preventDefault(); // Prevent page reload after search

  // create variable from the value of user's input/search
  var queryValue = $('#search').val();

  // testing the value is
  console.log(queryValue);

  // hide main image and move search elements to top of screen after search
  $(".main-img").addClass("hide");
  $(".content").css("margin-top", "0%");

  // clear search results upon new search
  $("#js-display-result").empty();

  // call Wikipedia API and get the data we want
  $.getJSON(apiURL, {
    action: 'query',
    format: 'json',
    inprop: "url",
    formatversion: 2,
    generator: 'search',
    gsrsearch: queryValue,
    gsrwhat: "text",
    prop: 'extracts|info',
    exsentences: 3,
    exintro: "",
    explaintext: "",
    exlimit: 20,

  })
  // if the call is successful, do this
  .success(function(response){
    console.log(response);


    // Below is all the stuff i had to work through before I figured out how to iterate through my JSON array and print the appropriate variables in an html structure, while also replicating that structure for each item in the array.
    // var resultTitle = response.query.pages[1].title;
    // var resultSumm = response.query.pages[1].extract;
    // var resultLink = response.query.pages[1].canonicalurl;

    // console.log(resultTitle);
    // console.log(resultSumm);
    // console.log(resultLink);

    // $("#js-title").html(resultTitle);
    // $("#js-title").html(resultTitle);
    // $("#js-link").attr("href", resultLink);
    // work's for one... now need to iterate into each


    // for(var i = 0; i < response.query.pages.length; i++){
    //
    //   var resultTitle = response.query.pages[i].title;
    //
    //   console.log(resultTitle);
    // }

    response.query.pages.forEach(function(resp){
      $('#js-display-result').append(
        "<div class='card horizontal hoverable'><div class='card-stacked'><div class='card-content'><h5 id='js-title'>"+resp.title+"</h5><p id='js-summary'>"+resp.extract+"</p></div><div class='card-action'><a href="+resp.canonicalurl+" id='js-link'>Learn More</a></div></div></div>"
      );
    });


  });



}
