function createNewRow(planetObj) {
   
    var newRow = document.createElement("tr");

    var newCell = document.createElement('td');
    newCell.textContent = planetObj['name'];
    newRow.appendChild(newCell);

    var newCell = document.createElement('td');
    newCell.textContent = planetObj['diameter'];
    newRow.appendChild(newCell);

    var newCell = document.createElement('td');
    newCell.textContent = planetObj['climate'];
    newRow.appendChild(newCell);

    var newCell = document.createElement('td');
    newCell.textContent = planetObj['terrain'];
    newRow.appendChild(newCell);

    var newCell = document.createElement('td');
    newCell.textContent = planetObj['surface_water'];
    newRow.appendChild(newCell);

    var newCell = document.createElement('td');
    newCell.textContent = planetObj['population'];
    newRow.appendChild(newCell);
    
    return newRow;
}

/* 
getJSON -> getdata
processPlanetArray
  -> iterate through planets
    -> createRow based on planet obj
    -> insertRowIntoDOM
 */

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

