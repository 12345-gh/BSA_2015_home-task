/* global require, console */
/*
    Реализовать REST API из домашнего по HTTP с помощью http модуля node.js. 
    Сделать отдельную программу, выполняющую то же самое с помощью expressjs. 
    Данные сгенерировать и хранить любым образом
    
    EXAMPLE TO USE:
        -- SELECT
        GET http://127.0.0.1:8080/users
        GET http://127.0.0.1:8080/user/5
        
        
        -- INSERT
        PUT http://127.0.0.1:8080/user/
        {
          "name": "John Papa",
          "age": "45",
          "picture": "http://placehold.it/32x32",
          "email": "johnpapa@gmail.com"
        }
            
        -- UPDATE
        POST http://127.0.0.1:8080/user/9
        {
          "name": "John Papa",
          "age": "45",
          "picture": "http://placehold.it/32x32",
          "email": "johnpapa@gmail.com"
        }
        
        -- DELETE
        DELETE http://127.0.0.1:8080/user/9
*/

var http = require('http');
var port = 8080;
var url  = require('url');
var qs = require('querystring');
var fs = require('fs');

var database = null;
var outputFilename = './db.json';
var dbCfg = null;
var cfgFile = './dbcfg.json';

var body = '';
var isFind = 0;

// Read from JSON file
fs.readFile(outputFilename, 'utf8', function (err, data) {
  if (err) throw err;
  database = JSON.parse(data);
});

// Read from JSON file
fs.readFile(cfgFile, 'utf8', function (err, data) {
  if (err) throw err;
  dbCfg = JSON.parse(data);
});

//Find a user by id
function find (id) {
    var user = database["User"+id];
    if ((null === user) || (undefined === user)) {
        throw new Error('user not found');
    }
    return user;
}

// Select user from database
function handle_GET(request, response) {
    // get request query from url
    var url_parts = url.parse(request.url,true).pathname;
    var pathname = url_parts.substring(1,url_parts.lastIndexOf("/"));
    var userId = url_parts.substring(url_parts.lastIndexOf("/")+1, url_parts.length);
    
    if (userId === 'users') {
        response.writeHead( 200, {'Content-Type': 'text/plain'} );
        response.write( JSON.stringify( database ) );
        response.end();
    } else if ((userId !== '') && (userId >= 0) && pathname === 'user'){
            try {
                response.writeHead( 200, {'Content-Type': 'text/plain'} );
                response.write( JSON.stringify( find(userId) ) );
                response.end();
            } catch (exeception) {
                response.writeHead( 404, {"Content-Type": "text/plain"} );  
                response.write("404 Not Found\n");  
                response.end();   
            }    
        } else {
            response.writeHead( 500, {"Content-Type": "text/plain"} );  
            response.write("500 Internal Server Error\n");  
            response.end(); 
        }
}

// Insert user to database
function handle_PUT(request, response) {
    // get request query from url
    var url_parts = url.parse(request.url,true).pathname;
    var pathname = url_parts.substring(1,url_parts.lastIndexOf("/"));
    var userId = ++dbCfg.lastId;
    var userInfo = '';
    
    request.on('data', function (data) {
        body = '';
        body += data;
        userInfo = qs.parse(body);
    });
    
    request.on('end',function() {
        
        if ((userId !== '') && (userId >= 0) && pathname === 'user'){
            var user = {
                "name": ('name' in userInfo) ? userInfo.name : "No name",
                "age": ('age' in userInfo) ? userInfo.age : "0",
                "picture": ('picture' in userInfo) ? userInfo.picture : "http://placehold.it/64x64",
                "email": ('email' in userInfo) ? userInfo.email : "nomail@nomail.com"
            };
            
            database["User"+userId] = user;

            // Save data to file JSON
            fs.writeFile(cfgFile, JSON.stringify(dbCfg, null, 4), function(err) {
                if(err) {
                    console.log(err);
                } 
            });

            // Save data to file JSON
            fs.writeFile(outputFilename, JSON.stringify(database, null, 4), function(err) {
                if(err) {
                    console.log(err);
                } 
            });

            response.writeHead( 201, {'Content-Type': 'text/plain'} );
            response.write('201 Created');
            response.end(); 
           
        } else {
            response.writeHead( 500, {"Content-Type": "text/plain"} );  
            response.write("500 Internal Server Error\n");  
            response.end(); 
        }
    });
}

// Update user in database
function handle_POST(request, response) {
    // get request query from url
    var url_parts = url.parse(request.url,true).pathname;
    var pathname = url_parts.substring(1,url_parts.lastIndexOf("/"));
    var userId = url_parts.substring(url_parts.lastIndexOf("/")+1, url_parts.length);
    var userInfo = '';
    
    request.on('data', function (data) {
        body = '';
        body += data;
        userInfo = qs.parse(body);
    });
    
    request.on('end',function() {
        
        if ((userId !== '') && (userId >= 0) && pathname === 'user'){
            var user = null;
            var findUser = null;

            try {
                findUser = find(userId);
            } catch (exeception) {
                response.writeHead( 404, {"Content-Type": "text/plain"} );  
                response.write("404 Not Found\n");  
                response.end(); 
            }

            
            if ((null !== findUser) && (undefined !== findUser)) {
                user = null;
                user = {
                    "name": ('name' in userInfo) ? userInfo.name : findUser.name,
                    "age": ('age' in userInfo) ? userInfo.age : findUser.age,
                    "picture": ('picture' in userInfo) ? userInfo.picture : findUser.picture,
                    "email": ('email' in userInfo) ? userInfo.email : findUser.email
                };
                database["User"+userId] = user;
                
                // Save data to file JSON
                fs.writeFile(outputFilename, JSON.stringify(database, null, 4), function(err) {
                    if(err) {
                        console.log(err);
                        response.writeHead( 500, {"Content-Type": "text/plain"} );  
                        response.write("500 Internal Server Error\n");  
                        response.end(); 
                    } else {
                        response.writeHead( 200, {'Content-Type': 'text/plain'} );
                        response.write('200 OK');
                        response.end();    
                    }
                });
            } 
        } else {
            response.writeHead( 500, {"Content-Type": "text/plain"} );  
            response.write("500 Internal Server Error\n");  
            response.end(); 
        }
    });
}

// Delete user from database
function handle_DELETE(request, response) {
    // get request query from url
    var url_parts = url.parse(request.url,true).pathname;
    var pathname = url_parts.substring(1,url_parts.lastIndexOf("/"));
    var userId = url_parts.substring(url_parts.lastIndexOf("/")+1, url_parts.length);
    var userInfo = '';
    
    request.on('data', function (data) {
        body = '';
        body += data;
        userInfo = qs.parse(body);
    });
    
    request.on('end',function() {
        
        if ((userId !== '') && (userId >= 0) && pathname === 'user'){
            var user = null;
            var findUser = null;

            try {
                findUser = find(userId);
            } catch (exeception) {
                response.writeHead( 404, {"Content-Type": "text/plain"} );  
                response.write("404 Not Found\n");  
                response.end(); 
            }
            
            if ((null !== findUser) && (undefined !== findUser)) {
                
                delete database["User"+userId];
                
                // Save data to file JSON
                fs.writeFile(outputFilename, JSON.stringify(database, null, 4), function(err) {
                    if(err) {
                        console.log(err);
                        response.writeHead( 500, {"Content-Type": "text/plain"} );  
                        response.write("500 Internal Server Error\n");  
                        response.end(); 
                    } else {
                        response.writeHead( 200, {'Content-Type': 'text/plain'} );
                        response.write('200 OK');
                        response.end();    
                    }
                });
            } 
        } else {
            response.writeHead( 500, {"Content-Type": "text/plain"} );  
            response.write("500 Internal Server Error\n");  
            response.end(); 
        }
    });
}

// Bad request to server
function handle_BAD_REQUEST(response){
    response.writeHead( 400, {"Content-Type": "text/plain"} );  
    response.write("400 Bad Request\n");  
    response.end(); 
}

// Server request handler
function handle_request( request, response ) {
    
    switch (request.method) {
        case 'GET':
            handle_GET(request, response);      // Select user from database
            break;
        case 'POST':
            handle_POST(request, response);     // Update user in database
            break;
        case 'PUT':
            handle_PUT(request, response);      // Insert user to database
            break;
        case 'DELETE':
            handle_DELETE(request, response);   // Delete user from database
            break;
        default:
            handle_BAD_REQUEST(response);
            break;
    }
    console.log('Request processing ended');
}

http.createServer(handle_request).listen(port, '127.0.0.1');
console.log('Started Node.js http server at http://127.0.0.1:' + port);  