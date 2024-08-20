// script.js
document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById("ball");
    let isDragging = false;
    let isGravityActive = true;
    let offsetX, offsetY;
    let gravity = 0.5;
    let velocityY = 0;

    ball.style.left = "100px";
    ball.style.top = "100px";

    document.addEventListener("mousemove", function(event) {
        if (isDragging) {
            ball.style.left = (event.clientX - offsetX) + "px";
            ball.style.top = (event.clientY - offsetY) + "px";
        }
    });

    ball.addEventListener("mousedown", function(event) {
        isDragging = true;
        isGravityActive = false;
        offsetX = event.clientX - ball.getBoundingClientRect().left - window.scrollX;
        offsetY = event.clientY - ball.getBoundingClientRect().top - window.scrollY;

    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
        isGravityActive = true;
    });

    ball.addEventListener("click", function() {
        isGravityActive = true;
    });

    function applyGravity() {
        if (!isDragging && isGravityActive) {
            const ballRect = ball.getBoundingClientRect();
            const footerRect = document.querySelector("footer").getBoundingClientRect();
    
            // Get the scroll position
            const scrollY = window.scrollY;
    
            // Calculate the footer's position relative to the viewport
            const footerTop = footerRect.top + scrollY;
    
            // Update vertical velocity due to gravity
            velocityY += gravity;
    
            // Update ball position based on velocity
            let ballTop = parseFloat(ball.style.top) || 0;
            ballTop += velocityY;
    
            // Ensure the ball stops above the footer
            if (ballTop + ballRect.height > footerTop) {
                velocityY *= -0.7; // Reverse and reduce velocity (bounce effect)
                ballTop = footerTop - ballRect.height;
                if (Math.abs(velocityY) < 0.1) {
                    velocityY = 0; // Stop bouncing when velocity is very small
                }
            }
    
            // Update the ball's position
            ball.style.top = ballTop + "px";
        }
    }

    setInterval(applyGravity, 16);
});
