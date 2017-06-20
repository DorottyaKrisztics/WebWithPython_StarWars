$.getJSON('http://swapi.co/api/planets/1', function(response){
    console.log(response['name'])
});