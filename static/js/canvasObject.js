class Canvas {
    constructor(id, canvasContext) {
        this.createId();
        this.canvasContext= canvasContext;
    }

    createId(){
        // creates random 6-digit number
        this.id = Math.floor(100000 + Math.random() * 900000);
    }
}