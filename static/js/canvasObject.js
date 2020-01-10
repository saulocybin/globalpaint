class Canvas {
    constructor(id, canvasContext) {
        this.createId();
        this.canvasContext= canvasContext;
    }

    createId(){
        this.id = Math.floor(100000 + Math.random() * 900000);
    }
}