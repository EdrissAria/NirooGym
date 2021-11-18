import React, { useRef, useEffect } from 'react'

function Login() {
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // making our context 
        var c = canvas.getContext("2d");
        // function random range 
        function randomRange(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
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
            this.draw = function () {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = this.fillColor;
                c.fill();
                c.strokeStyle = '#000';
                c.stroke();
            }
            // update method for update the moving of circles 
            this.update = function () {
                if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }
                if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
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
                let radius = randomRange(15, 40);
                var x = Math.random() * (window.innerWidth - radius * 2) + radius;
                var y = Math.random() * (window.innerHeight - radius * 2) + radius;
                var dx = (Math.random() - 0.5) * 10;
                var dy = (Math.random() - 0.5) * 10;
                let fillColor = color[Math.floor(Math.random() * color.length)];
                circleArray.push(new Circle(x, y, dx, dy, radius, fillColor));
            }
        }
        function animate() {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (var i = 0; i < circleArray.length; i++) {
                circleArray[i].update();
            }
        }
        init();
        animate();

    }, [])
    return (
        <div className="login_container">
            <canvas ref={canvasRef} />
            <div className="login_card">
                <div className="login_header"><h1>Login</h1></div>
                <form className="login_form">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" className="login_input" placeholder="username" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="login_input" placeholder="password" />
                    <button type="submit" className="login_submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
