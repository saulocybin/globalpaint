window.onload = function () {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100)
}