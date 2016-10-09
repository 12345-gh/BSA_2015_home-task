/* global require, console */
/*
    Реализовать REST API из домашнего по HTTP с помощью http модуля node.js. 
    Сделать отдельную программу, выполняющую то же самое с помощью expressjs. 
    Данные сгенерировать и хранить любым образом

    BEFORE USE, PLEASE INSTALL:
        npm install express --save
        npm install body-parser
    
    EXAMPLE TO USE:
        -- SELECT
        GET http://127.0.0.1:8080/users
        GET http://127.0.0.1:8080/user/5
        
        
        -- INSERT
        PUT http://127.0.0.1:8080/user
        {
          "name": "John Papa",
          "age": "45",
          "picture": "http://placehold.it/32x32",
          "email": "johnpapa@gmail.com"
        }
            
        -- UPDATE
        PUT http://127.0.0.1:8080/user/9
        {
          "name": "John Papa",
          "age": "45",
          "picture": "http://placehold.it/32x32",
          "email": "johnpapa@gmail.com"
        }
        
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


/**
 * REST API
 */
var express = require('express');
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
var fs = require("fs");

var database = null;
var outputFilename = './db.json';
var dbCfg = null;
var cfgFile = './dbcfg.json';

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

// support json encoded bodies
app.use(bodyParser.json()); 
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

//Find a user by id
function find (id) {
    var user = database["User"+id];
    if ((null === user) || (undefined === user)) {
        throw new Error('user not found');
    }
    return user;
}

// Insert user to database
function insertUser (userInfo) {
    var userId = (++dbCfg.lastId);
    var user = {
        "name": ('name' in userInfo) ? userInfo.name : "No name",
        "age": ('age' in userInfo) ? userInfo.age : "0",
        "picture": ('picture' in userInfo) ? userInfo.picture : "http://placehold.it/32x32",
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
 
    return '201 Created';    
}

// update user in database
function updateUser (userId, userInfo) {
    var user = null;
    var findUser = null;
    
    try {
        findUser = find(userId);
    } catch (exeception) {
        return "404 Not Found\n";
    }
   
    if ((null !== findUser) && (undefined !== findUser)) {
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
            } 
        });
        
        return "200 OK";
    } else {
        return "500 Internal Server Error\n";
    }   
    
}

// delete user from database
function deleteUser (userId) {
    var findUser = null;
    
    try {
        findUser = find(userId);
    } catch (exeception) {
        return "404 Not Found\n";
    }
   
    if ((null !== findUser) && (undefined !== findUser)) {
        
        delete database["User"+userId];

        // Save data to file JSON
        fs.writeFile(outputFilename, JSON.stringify(database, null, 4), function(err) {
            if(err) {
                console.log(err);
            } 
        });
        
        return "200 OK";
    } else {
        return "500 Internal Server Error\n";
    }     
}

// HTTP GET /users
// Returns: the list of users in JSON format
app.get('/users', function (request, response) {
    response.json(database);
});

// HTTP GET /user/:id
// Param: :id is the unique identifier of the user you want to retrieve
// Returns: the user with the specified :id in a JSON format
// Error: 404 HTTP code if the user doesn't exists
app.get('/user/:id', function (request, response) {
    var userId = request.params.id;
    
    try {
        response.json(find(userId));
    } catch (exeception) {
        response.send("404 Not Found\n");
    }
});

// HTTP PUT /user
// Param: :id the unique identifier of the user you want to insert
// Body Param: the JSON user you want to insert
// Returns: 200 HTTP code
app.put('/user', function (request, response) {
    var userInfo = request.body;
        
    response.send(insertUser(userInfo));
});

// HTTP PUT /user/:id
// Param: :id the unique identifier of the user you want to update
// Body Param: the JSON user you want to update
// Returns: 200 HTTP code
// Error: 404 / 500 HTTP code if the user doesn't exists
app.put('/user/:id', function (request, response) {
    var userInfo = request.body;
    var userId = request.params.id;
        
    response.send(updateUser(userId, userInfo));
});

// HTTP POST /user/:id
// Body Param: the JSON user you want to update
// Returns: 200 HTTP code
// Error: 404 / 500 HTTP code if the user doesn't exists
app.post('/user/:id', function (request, response) {
    var userInfo = request.body;
    var userId = request.params.id;

    response.send(updateUser(userId, userInfo));
});

// HTTP DELETE /user/:id
// Param: :id the unique identifier of the user you want to delete
// Returns: 200 HTTP code
// Error: 404 / 500 HTTP code if the user doesn't exists
app.delete('/user/:id', function (request, response) {
    var userId = request.params.id;
    
    response.send(deleteUser(userId));
});


// Start server 
app.listen(port); //to port on which the express server listen
console.log('Started Express.js http server at http://127.0.0.1:' + port);  
