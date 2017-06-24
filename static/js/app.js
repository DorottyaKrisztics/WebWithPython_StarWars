
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


    // button in the cell
    var newCell = document.createElement('td');
    planetObjLen = planetObj['residents'].length;

    if (planetObjLen != 0) {
        var button = document.createElement("button");

        button.setAttribute("type", "button"); 
        button.setAttribute("class", "btn btn-primary btn-lg"); 
        button.setAttribute("data-toggle", "modal"); 
        button.setAttribute("data-target", "#residentsModal"); 
        button.setAttribute("data-residents", "6"); 

        var buttonText = document.createTextNode(planetObjLen + ' resident(s)');

        button.appendChild(buttonText);
        newCell.appendChild(button);
    } else {
        newCell.textContent = "No known residents";
    }
    newRow.appendChild(newCell);

    return newRow;
}


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
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data('residents'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-title').text('New message to ' + recipient);
    });
}


function previousButton() {
    // create a button
    var button = document.createElement("button");
    var buttonText = document.createTextNode('PREVIOUS');
    button.appendChild(buttonText);
    document.getElementById("nextPreviousPage").appendChild(button);

    button.setAttribute("id", "previousButton"); 

    button.addEventListener("click", function() { 
        if (button.getAttribute("data-apilink") != "null") {

            var previousApiLink = button.getAttribute("data-apilink");
            getPlanetData(previousApiLink);  

        } else {
            alert("there is not any previous page");
        }
    });   
}


function nextButton() {
    var button = document.createElement("button");
    var buttonText = document.createTextNode('NEXT');
    button.appendChild(buttonText);
    document.getElementById("nextPreviousPage").appendChild(button);

    button.setAttribute("id", "nextButton"); 

    button.addEventListener("click", function() { 
        if (button.getAttribute("data-apilink") != "null") {

            var nextApiLink = button.getAttribute("data-apilink");
            getPlanetData(nextApiLink); 

        } else {
            alert("there is not any other page");
        }
    });        
}


function getPlanetData(apiLink) {
    $.getJSON(apiLink, function(response){
        
        $("#planetTable").find("tr:gt(0)").remove(); // removes all rows except the first

        processResults(response['results']);

        var previousButton = document.getElementById("previousButton");
        previousButton.setAttribute("data-apilink", response['previous']); 

        var nextButton = document.getElementById("nextButton");
        nextButton.setAttribute("data-apilink", response['next']); 

        console.log(response);

    });
}

function main() {
    getPlanetData('http://swapi.co/api/planets/?page=1');         
    addModalEventHandler();
    previousButton();
    nextButton();
    
}

$(document).ready(main);

