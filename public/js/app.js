// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});


// Save an Article
$(document).on("click", ".save", function () {
  // Empty the notes from the note section
  $("#deleteComment").empty();
  // Save the id from the p tag
  var thisId = $(this).parent().prev().children().attr("data-id");
  // Now make an ajax call for the Article
  $.ajax({
    method: "PUT",
    url: "/articles/saved" + thisId,
    data: {
      saved: true
    }
  })
    .then(function (data) {
      console.log(data);
      alert("Article saved");
    });
  // new #1?

  // Scrape the articles
  $(document).on("click", ".scrape-new", function () {
    // Now make an ajax call to scrape
    $.ajax({
      method: "GET",
      url: "/scrape",
    })
    $.post("/articles").then(function () {
      location.replace('/articles');
    }).catch(function (err) {
      throw err;
    });
    alert("Scraping New Articles...");
  });
  //play area end
  $(document).on("click", ".clear", function () {
    // Empty the notes from the note section
    $("#deleteComment").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/saved" + thisId,
    })
      // With that done, add the note information to the page
      .then(function (data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/saved/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function (data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
