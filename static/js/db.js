var schemas = require("./schemas");

async function getCanvas(id) {
    return await schemas.Canvas.findOne({"id": id});
}

module.exports.getCanvas = getCanvas;