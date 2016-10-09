/* global require, console */
/*
    Реализовать REST API из домашнего по HTTP с помощью http модуля node.js. 
    Сделать отдельную программу, выполняющую то же самое с помощью expressjs. 
    Данные сгенерировать и хранить любым образом
*/

/* 
    EXAMPLE FOR USE:
    -- SELECT
    GET http://127.0.0.1:8080/&all
    GET http://127.0.0.1:8080/?index=3
    GET http://127.0.0.1:8080/?age=30
    GET http://127.0.0.1:8080/?name=Martina Chavez
    GET http://127.0.0.1:8080/?index=3&name=Martina Chavez
        
    // IMPORTANT: Item with index 500 need POST and than DELETE OR PUT
    -- INSERT for update use PUT
    POST http://127.0.0.1:8080 
        { index: 500,
          age: 36,
          picture: http://placehold.it/32x32,
          name: Brandie Young }
    
    -- REMOVE
    DELETE http://127.0.0.1:8080 
        { index: 500}
    
    -- UPDATE for insert use POST 
    PUT http://127.0.0.1:8080 
        { index: 500, 
          age: 55,
          picture: http://placehold.it/64x64,
          name: Post Name}
    PUT http://127.0.0.1:8080 
        { index: 500, 
          age: 33}      
*/

var http = require('http');
var static = require('node-static');
var file = new static.Server('.');
var url  = require('url');
var qs = require('querystring');
var fs = require('fs');
var database = [];
var outputFilename = './database.json';
var globalFilter = {};
var body = '';
var isFind = 0;

// Read from JSON file
fs.readFile(outputFilename, 'utf8', function (err, data) {
  if (err) throw err;
  database = JSON.parse(data);
});

// Filter data by index
function filterForArrByIndex(obj) {
    if ('index' in obj && globalFilter.index == obj.index) {
        return true;
    } else {
        return false;
    }    
}

// Filter data by name
function filterForArrByName(obj) {
    if ('name' in obj && globalFilter.name == obj.name) {
        return true;
    } else {
        return false;
    }    
}

// Filter data by age
function filterForArrByAge(obj) {
    if ('age' in obj && globalFilter.age == obj.age) {
        return true;
    } else {
        return false;
    }    
}

// Filter null elements
function removeEmptyArrayElements(arr) { 
   if (!Array.isArray(arr)) {
      return arr;
   } else {
       return arr.filter( function(elem) { 
          return elem !== null;
       } ).map(removeEmptyArrayElements);
   }
}

http.createServer(function(request, response) {
    file.serve(request, response);
    
    if (request.method == 'PUT') {
        body = '';

        request.on('data', function (data) {
            body += data;
        });

        request.on('end',function() {

            var PUT =  qs.parse(body);

            // try find element for delete
            isFind = 0;
            // It should be only one element in arr with unique index
            if ('index' in PUT){
                database.forEach(function(value){
                    if (value.index == PUT.index) {
                        // delete element by index
                        var i = database.indexOf(value);
                        
                        if ('picture' in PUT){
                            database[i].picture = PUT.picture;
                        }                        
                        if ('age' in PUT){
                            database[i].age = PUT.age;
                        }                        
                        if ('name' in PUT){
                            database[i].name = PUT.name;
                        }                        
                        isFind = 1;  
                    } 
                });
            } else {
                response.writeHead( 500, {"Content-Type": "text/plain"} );  
                response.write("500 Internal Server Error\n");  
                response.end(); 
            }

            if ( isFind === 1 ) {
                // Save data to file JSON
                fs.writeFile(outputFilename, JSON.stringify(database, null, 4), function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("JSON saved to " + outputFilename);
                    }
                });
                response.writeHead( 201, {'Content-Type': 'text/plain'} );
                response.write( JSON.stringify( PUT ) );
                response.end();    
            } else {
                response.writeHead( 500, {"Content-Type": "text/plain"} );  
                response.write("500 Internal Server Error\n");  
                response.end();     
            }
        });
    }
    else if (request.method == 'DELETE') {
            body = '';

            request.on('data', function (data) {
                body += data;
            });

            request.on('end',function() {

                var DELETE =  qs.parse(body);

                // try find element for delete
                isFind = 0;
                // It should be only one element in arr with unique index
                if ('index' in DELETE){
                    database.forEach(function(value){
                        if (value.index == DELETE.index) {
                            // delete element by index
                            var i = database.indexOf(value);
                            delete database[i];
                            database = removeEmptyArrayElements(database);
                            isFind = 1;
                        } 
                    });
                } else {
                    response.writeHead( 500, {"Content-Type": "text/plain"} );  
                    response.write("500 Internal Server Error\n");  
                    response.end(); 
                }

                if ( isFind === 1 ) {
                    // Save data to file JSON
                    fs.writeFile(outputFilename, JSON.stringify(database, null, 4), function(err) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("JSON saved to " + outputFilename);
                        }
                    });
                    response.writeHead( 201, {'Content-Type': 'text/plain'} );
                    response.write( JSON.stringify( DELETE ) );
                    response.end();    
                } else {
                    response.writeHead( 500, {"Content-Type": "text/plain"} );  
                    response.write("500 Internal Server Error\n");  
                    response.end();     
                }
            });
        }
        else if (request.method == 'POST') {
                body = '';

                // Resive request
                request.on('data', function (data) {
                    body += data;
                });

                request.on('end',function() {
                    // Get data
                    var POST =  qs.parse(body);  

                    isFind = 0;
                    // It should be only one element in arr with unique index
                    if ('index' in POST){
                        database.forEach(function(value){
                            if (value.index == POST.index) {
                                isFind = 1;   
                            } 
                        });
                    } else {
                        response.writeHead( 500, {"Content-Type": "text/plain"} );  
                        response.write("500 Internal Server Error\n");  
                        response.end(); 
                    }

                    if ( isFind === 0 ) {
                        database.push(POST);
                        // Save data to file JSON
                        fs.writeFile(outputFilename, JSON.stringify(database, null, 4), function(err) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("JSON saved to " + outputFilename);
                            }
                        });
                        response.writeHead( 201, {'Content-Type': 'text/plain'} );
                        response.write( JSON.stringify( POST ) );
                        response.end();    
                    } else {
                        response.writeHead( 500, {"Content-Type": "text/plain"} );  
                        response.write("500 Internal Server Error\n");  
                        response.end();     
                    }
                });
            }
            else if(request.method == 'GET') {
                // get request query from url
                var url_parts = url.parse(request.url,true);
                globalFilter = url_parts.query;

                // get data for rensponse
                var filteredArr = database;

                // Filter data by index
                if ('index' in globalFilter){
                    filteredArr = filteredArr.filter(filterForArrByIndex);
                }

                // Filter data by name
                if ('name' in globalFilter){
                    filteredArr = filteredArr.filter(filterForArrByName);
                }  

                // Filter data by age
                if ('age' in globalFilter){
                    filteredArr = filteredArr.filter(filterForArrByAge);
                }  

                if (!('index' in globalFilter) && !('name' in globalFilter) && !('age' in globalFilter) && !('all' in globalFilter)) {
                    response.writeHead( 404, {"Content-Type": "text/plain"} );  
                    response.write("404 Not Found\n");  
                    response.end();    
                } else {
                    response.writeHead( 200, {'Content-Type': 'text/plain'} );
                    response.write( JSON.stringify( filteredArr ) );
                    response.end();
                }
            }
}).listen(8080);

console.log('Server running on port 8080');  