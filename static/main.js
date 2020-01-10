(function () {

    // use canvasObject class
    var canvasObj = require('./js/canvasObject');
    var canvasObject = new canvasObj();

    var express = require("express");
    var mongoose = require("mongoose");
    var db = require("/static/js/db.js");

    // database address on localhost
    var url = 'mongodb://127.0.0.1:27017/globalpaint'

    var app = express();
    app.use(express.static);

    // configure socket
    var socket = io();

    // create 2d canvas object
    var canvas = document.getElementsByClassName('paintCanvas')[0];
    var context = canvas.getContext('2d');

    // var colors = document.getElementsByClassName('color');

    var saveButton = document.getElementbyId('saveCanvas');

    var current = {
        color: 'black'
    };
    var drawing = false;

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    // Sets canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    socket.on('drawing', onDrawingEvent);

    window.addEventListener('resize', onResize, false);
    onResize();

    saveButton.addEventListener('click', dbUpdateCanvas(canvasObj))

    function drawLine(x0, y0, x1, y1, color, emit) {
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

        if (!emit) { return; }
        var w = canvas.width;
        var h = canvas.height;

        socket.emit('drawing', {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color
        });
    }

    function onMouseDown(e) {
        drawing = true;
        current.x = e.clientX || e.touches[0].clientX;
        current.y = e.clientY || e.touches[0].clientY;
    }

    function onMouseUp(e) {
        if (!drawing) { return; }
        drawing = false;
        drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
    }

    function onMouseMove(e) {
        if (!drawing) { return; }
        drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
        current.x = e.clientX || e.touches[0].clientX;
        current.y = e.clientY || e.touches[0].clientY;
    }

    function onColorUpdate(e) {
        current.color = e.target.className.split(' ')[1];
    }

    // limit the number of events per second
    function throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function () {
            var time = new Date().getTime();

            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }

    function onDrawingEvent(data) {
        var w = canvas.width;
        var h = canvas.height;
        drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    // make the canvas fill its parent
    function onResize() {
        context.getImageData();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context.putImageData();
    }

    // update canvas object conext
    function updateContext(canvasObject) {
        (function () {

            // use canvasObject class
            var canvasObj = require('./js/canvasObject');
            var canvasObject = new canvasObj();
        
            var express = require("express");
            var mongoose = require("mongoose");
            var db = require("/static/js/db.js");
        
            // database address on localhost
            var url = 'mongodb://127.0.0.1:27017/globalpaint'
        
            var app = express();
            app.use(express.static);
        
            // configure socket
            var socket = io();
        
            // create 2d canvas object
            var canvas = document.getElementsByClassName('paintCanvas')[0];
            var context = canvas.getContext('2d');
        
            // var colors = document.getElementsByClassName('color');
        
            var saveButton = document.getElementbyId('saveCanvas');
        
            var current = {
                color: 'black'
            };
            var drawing = false;
        
            canvas.addEventListener('mousedown', onMouseDown, false);
            canvas.addEventListener('mouseup', onMouseUp, false);
            canvas.addEventListener('mouseout', onMouseUp, false);
            canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
        
            // Sets canvas size to window size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        
            socket.on('drawing', onDrawingEvent);
        
            window.addEventListener('resize', onResize, false);
            onResize();
        
            saveButton.addEventListener('click', dbUpdateCanvas(canvasObj))
        
            function drawLine(x0, y0, x1, y1, color, emit) {
                context.beginPath();
                context.moveTo(x0, y0);
                context.lineTo(x1, y1);
                context.strokeStyle = color;
                context.lineWidth = 2;
                context.stroke();
                context.closePath();
        
                if (!emit) { return; }
                var w = canvas.width;
                var h = canvas.height;
        
                socket.emit('drawing', {
                    x0: x0 / w,
                    y0: y0 / h,
                    x1: x1 / w,
                    y1: y1 / h,
                    color: color
                });
            }
        
            function onMouseDown(e) {
                drawing = true;
                current.x = e.clientX || e.touches[0].clientX;
                current.y = e.clientY || e.touches[0].clientY;
            }
        
            function onMouseUp(e) {
                if (!drawing) { return; }
                drawing = false;
                drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
            }
        
            function onMouseMove(e) {
                if (!drawing) { return; }
                drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
                current.x = e.clientX || e.touches[0].clientX;
                current.y = e.clientY || e.touches[0].clientY;
            }
        
            function onColorUpdate(e) {
                current.color = e.target.className.split(' ')[1];
            }
        
            // limit the number of events per second
            function throttle(callback, delay) {
                var previousCall = new Date().getTime();
                return function () {
                    var time = new Date().getTime();
        
                    if ((time - previousCall) >= delay) {
                        previousCall = time;
                        callback.apply(null, arguments);
                    }
                };
            }
        
            function onDrawingEvent(data) {
                var w = canvas.width;
                var h = canvas.height;
                drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
            }
        
            // make the canvas fill its parent
            function onResize() {
                context.getImageData();
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                context.putImageData();
            }
        
            // update canvas object conext
            function updateContext(canvasObject) {
                updateContext(canvasObject);
                canvasObject.context = context;
            }
            // create and store canvas - database 
        
            function dbCreateCanvas(context) {
                MongoClient.connect(url, { useNewUrlParser: true },
                    function (err, db) {
                        // Connect to the right DB and create an object.
                        var dbo = db.db("globalpaint");
                        var canvas = {
                            id: canvasObject.id,
                            canvasContext: canvasObject.canvasContext
                        };
        
                        // Insert the object as a document.
                        dbo.collection("Canvas").insertOne(canvas,
                            function (err, res) {
                                console.log("Added canvas to the DB");
                                db.close();
                            });
                    });
            }
        
            function dbUpdateCanvas(context) {
                MongoClient.connect(url, { useNewUrlParser: true },
                    function (err, db) {
                        // Connect to the right DB and create an object.
                        var dbo = db.db("globalpaint");
                        var canvas = {
                            id: canvasObject.id,
                            canvasContext: canvasObject.canvasContext
                        };
        
                        // Insert the object as a document.
                        dbo.collection("Canvas").insertOne(canvas,
                            function (err, res) {
                                console.log("Added canvas to the DB");
                                db.close();
                            });
                    });
            }
        
        })();
        canvasObject.context = context;
    }

    // create and store canvas - database 
    function dbCreateCanvas(context) {
        MongoClient.connect(url, { useNewUrlParser: true },
            function (err, db) {
                // Connect to the right DB and create an object.
                var dbo = db.db("globalpaint");
                var canvas = {
                    id: canvasObject.id,
                    canvasContext: canvasObject.canvasContext
                };

                // Insert the object as a document.
                dbo.collection("Canvas").insertOne(canvas,
                    function (err, res) {
                        console.log("Added canvas to the DB");
                        db.close();
                    });
            });
    }

    function dbUpdateCanvas(context) {
        MongoClient.connect(url, { useNewUrlParser: true },
            function (err, db) {
                // Connect to the right DB and create an object.
                var dbo = db.db("globalpaint");
                var canvas = {
                    id: canvasObject.id,
                    canvasContext: canvasObject.canvasContext
                };

                // Insert the object as a document.
                dbo.collection("Canvas").insertOne(canvas,
                    function (err, res) {
                        console.log("Added canvas to the DB");
                        db.close();
                    });
            });
    }

})();
