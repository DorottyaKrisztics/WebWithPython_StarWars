
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

    var newCell = document.createElement('td');
    newCell.textContent = planetObj['residents'];
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


function addModalEventHandler() {
    $('#residentsModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('residents') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
    });
}


function getPlanetData() {
    $.getJSON('http://swapi.co/api/planets/', function(response){
        
        processResults(response['results']);
    });
}

function main() {
    getPlanetData();         
    addModalEventHandler();
}

$(document).ready(main);

