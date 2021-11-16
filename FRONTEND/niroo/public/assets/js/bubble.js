var canvas = document.getElementById('canvas');
 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// making our context 
var c = canvas.getContext("2d");


// add event to change color of circles 
addEventListener('click', ()=>{
	init();
})
// update screen when resizes 
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
// array of color
var color = [
    '#2c3e50',
    '#e74c6c',
    '#ecf0f1',
    '#3498db',
    '#2980b9'
]
// constructor 
function Circle(x, y, dx, dy, radius, fillColor) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.fillColor = fillColor;
    // draw method for drawing circle
    c.strokeStyle = color[Math.floor(Math.random() * color.length)];
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.fillColor; 
        c.fill();
        c.stroke();
    }
    // update method for update the moving of circles 
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

// making object of Circle class 

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 200; i++) {
        let radius = Math.random() * 50;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 20;
        var dy = (Math.random() - 0.5) * 20;
        let fillColor = color[Math.floor(Math.random() * color.length)];
        circleArray.push(new Circle(x, y, dx, dy, radius, fillColor));
    }
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();