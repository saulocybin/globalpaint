window.onload = function () {

    // create 2d canvas object
    var canvas = document.getElementById('paintCanvas');
    var context = canvas.getContext('2d');

    var currentColour = {
        color: 'black'
    };
    var drawing = false;

    // add event listener to track mouse movement up, down left, right
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mouseout', mouseUp, false);
    canvas.addEventListener('mousemove', throttle(mouseMove, 10), false);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', resize, false);

    resize();

    function drawLine(x0, y0, x1, y1, color) {
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
    }

    function mouseDown(e) {
        drawing = true;
        currentColour.x = e.clientX || e.touches[0].clientX;
        currentColour.y = e.clientY || e.touches[0].clientY;
    }

    function mouseUp(e) {
        if (!drawing) { return; }
        drawing = false;
        drawLine(currentColour.x, currentColour.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, currentColour.color, true);
    }

    function mouseMove(e) {
        if (!drawing) { return; }
        drawLine(currentColour.x, currentColour.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, currentColour.color, true);
        currentColour.x = e.clientX || e.touches[0].clientX;
        currentColour.y = e.clientY || e.touches[0].clientY;
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

    // resize canvas to fill browser
    function resize() {
        context.putImageData();
        context.getImageData();
    }





}