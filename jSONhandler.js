$(document).ready(function(){

    // make the ajax request, which gets the data
    $.ajax({
        url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

        // process_data is a callback function, the result of the data 
        // is automatically passed in as an argument
    }).done(process_data);
});

function process_data(json_data) {
    // Check your console to see what gets put there
    console.log(json_data);
    // Inspecting that, you can get a sense for the structure of the
    // JSON file, which should match the documentation here: 
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

    // upon inspection, you should see that json_data has a property 
    // "features", which is an array of objects that has data that
    // looks promising

    // often times we'll want to process or clean or filter the data 
    // somehow. Here, we're just going to store the features array 
    // into a new dictionary.

    var earthquake_data = {
        "earthquakes": json_data.features
    };

    // Now we use handlebars to create our template
    // This is taken straight from handlebars' website

    // Uses jquery to select the template (see below)
    var source = $("#entry-template").html();

    // Use handlebars to turn it into a template
    var template = Handlebars.compile(source);

    // Now pass the data into the template to generate the html
    var html_content = template(earthquake_data);

    // html is now a string with the raw html
    // we then put that into the earthquake-data div
    $("#earthquake-data").html(html_content);
}

// This is a handlebars helper function, just adds one to a value
Handlebars.registerHelper("inc", function(value, options){
    return parseInt(value) + 1;
});

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
