var mongoose = require("mongoose");

var Canvas = mongoose.model("Canvas", {id: Number, canvasContext: variable});

module.exports.Canvas = Canvas;