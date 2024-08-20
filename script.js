// script.js
document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById("ball");
    let isDragging = false;
    let offsetX, offsetY;
    let gravity = 0.5; // Gravity force
    let velocityY = 0; // Initial vertical velocity
    let ballX, ballY;

    // Set initial position of the ball
    ball.style.left = "100px";
    ball.style.top = "100px";

    // Event listener for mouse movement
    document.addEventListener("mousemove", function(event) {
        if (isDragging) {
            // Update ball position during drag
            ball.style.left = (event.clientX - offsetX) + "px";
            ball.style.top = (event.clientY - offsetY) + "px";
        }
    });

    // Event listener for mouse down (start dragging)
    ball.addEventListener("mousedown", function(event) {
        isDragging = true;
        offsetX = event.clientX - ball.getBoundingClientRect().left;
        offsetY = event.clientY - ball.getBoundingClientRect().top;
    });

    // Event listener for mouse up (stop dragging)
    document.addEventListener("mouseup", function() {
        isDragging = false;
    });

    // Function to apply gravity and update ball position
    function applyGravity() {
        if (!isDragging) {
            // Update vertical velocity due to gravity
            velocityY += gravity;

            // Update ball position based on velocity
            ballY = parseFloat(ball.style.top) || 0;
            ball.style.top = (ballY + velocityY) + "px";

            // Bounce if hitting the bottom of the viewport
            if (ballY + velocityY + ball.clientHeight > window.innerHeight) {
                velocityY *= -0.7; // Reverse and reduce velocity (bounce effect)
                ball.style.top = (window.innerHeight - ball.clientHeight) + "px";
            }
        }
    }

    // Continuously apply gravity
    setInterval(applyGravity, 16); // ~60 FPS

});
