

function processResults(planetArray) {
    for (var i = 0; i < planetArray.length; i++) {
        var planet = planetArray[i];
        var row = createNewRow(planet);
        // console.log(planet);
        document.getElementById("planetTable").appendChild(row);
    }
}



function getPlanetData() {
    $.getJSON('http://swapi.co/api/planets/', function(response){    
        // var firstPlanet = response['results'][0]['name'];
        
        processResults(response['results']);
    });
}



$(document).ready(getPlanetData);

