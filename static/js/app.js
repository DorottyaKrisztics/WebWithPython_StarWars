
function addModalEventHandler() {
    $('#residentsModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var planetname = button.data('planetname'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        var residents = button.data('residents');
        console.log(residents.length);

        // x piece of residents link
        var residentsLinks = residents.split(',');
        console.log(residentsLinks);
        $("#residentsTable").find("tr:gt(0)").remove(); 
        
        for (var i = 0; i < residentsLinks.length; i++) {
            var apiLink = residentsLinks[i];
            $.ajax({
                dataType: "json",
                url: apiLink,
                success: function(response) {
                    var residentObj = response;
                    console.log(residentObj);


                    var newRow = document.createElement("tr");

                    var newCell = document.createElement('td');
                    newCell.textContent = residentObj['name'];
                    newRow.appendChild(newCell);

                    var newCell = document.createElement('td');
                    newCell.textContent = residentObj['height'];
                    newRow.appendChild(newCell);

                    var newCell = document.createElement('td');
                    newCell.textContent = residentObj['mass'];
                    newRow.appendChild(newCell);

                    var newCell = document.createElement('td');
                    newCell.textContent = residentObj['hair_color'];
                    newRow.appendChild(newCell);

                    var newCell = document.createElement('td');
                    newCell.textContent = residentObj['skin_color'];
                    newRow.appendChild(newCell);

                    var newCell = document.createElement('td');
                    newCell.textContent = residentObj['eye_color'];
                    newRow.appendChild(newCell);

                    var newCell = document.createElement('td');
                    newCell.textContent = residentObj['birth_year'];
                    newRow.appendChild(newCell);

                    var newCell = document.createElement('td');
                    newCell.textContent = residentObj['gender'];
                    newRow.appendChild(newCell);

                    document.getElementById("residentsTable").appendChild(newRow);
                }
            });
        }
        modal.find('.modal-title').text('Residents of ' + planetname);
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
        button.setAttribute("id", "residentsModalButton"); 
        button.setAttribute("class", "btn btn-primary btn-lg"); 
        button.setAttribute("data-toggle", "modal"); 
        button.setAttribute("data-target", "#residentsModal"); 
        button.setAttribute("data-planetname", planetObj['name']); 
        button.setAttribute("data-residents", planetObj['residents']);

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


function getPlanetData(apiLink) {
    $.getJSON(apiLink, function(response){
        // removes all rows except the first -- greater than [0]
        $("#planetTable").find("tr:gt(0)").remove(); 

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

