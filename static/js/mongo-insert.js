// Import the Mongo client and declare the URL to use.
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

// Set up a DB connection event handler.
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