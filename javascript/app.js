  
// Array to hold our starting items and for users 
// to push new items into
  var topics = ["Superman", "Batman", "Wonder Woman", "Spider-Man", "Iron Man"];


    // houses the function that renders the buttons
    function renderButtons() {

      // empties the div containing the buttons
      $("#button-view").empty();

      // loops over the array of topics
      for (var i=0; i < topics.length; i++) {
        // creates an html button and stores it as a variable
        var topicButton = $("<button>");

        // adds classes to the button
        topicButton.addClass("topic");
        topicButton.addClass("btn-primary");
        topicButton.addClass("hero");

        // adds the data attribute of "hero" to each button created
        topicButton.attr("data-hero", topics[i]);

        
        // gives text to the button based on the location
        // the object in the array
        topicButton.text(topics[i]);

        // appends the button to the button view div
        $("#button-view").append(topicButton);
      }
    }

    // function for adding topics to the topic array
    $("#add-topic").on("click", function(event) {

      // prevents page from refreshing
      event.preventDefault();

      // value in the submit field stored in a variable
      var topic = $("#topic-input").val().trim();

      // adds the new topic to the topics array
      topics.push(topic);
      
      
      // runs the renderButtons function to display the
      // newly created button 
      renderButtons();

    });
    

  
  
 
   function displayGifs() {
        var hero = $(this).attr("data-hero");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
          hero + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g&offset=10";

        // ajax call
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          
        // empty's the gif-display div
        $('.gif-display').empty();
         
         // stores response.data in a variable for easier
         // access 
          var results = response.data;
            
            // loops over onjects from the ajax call
            for (var i = 0; i < results.length; i++) {
              
              // creates a div to hold each gif
              var gifDiv = $("<div class='gifDiv'>");
              
              // stores gif rating(g, pg, etc.)
              var rating = results[i].rating;

              // creates paragraph for holding the rating
              // on the html, stores it in a variable
              var p = $("<p>").text("Rating: " + rating);

              // creates image tag and stores it in a variable
              var heroImage = $("<img>");
             
             // adds the attribute of src to use the url of the image
             // and finds that image's url in the ajax call
              heroImage.attr("src", results[i].images.fixed_height.url);
              
              //adss class of "heroImage" to each gif
              heroImage.addClass("heroImage");

              // prepends the variable p to the gifDiv
              gifDiv.prepend(p);
              // prepends the gif to the giDiv
              gifDiv.prepend(heroImage);
              // prepends the gifDiv to the gif-display div
              $(".gif-display").prepend(gifDiv);
            }
          });
      };
// allows new buttons created to display gifs when click
// by running the displayGif function
$(document).on("click", ".topic", displayGifs); 

// runs the renderButtons on pageload to display the starting
// objects in the array as buttons
renderButtons();
