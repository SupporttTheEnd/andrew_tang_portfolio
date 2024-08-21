// script.js
document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById("ball");
    let isDragging = false;
    let isGravityActive = true;
    let offsetX, offsetY;
    let gravity = 0.3;
    let friction = 0.997; // Friction coefficient (values < 1)
    let velocityX = 0; // Added to handle horizontal velocity
    let velocityY = 0;
    let lastMouseX, lastMouseY;
    let draggingStartTime;

    ball.style.left = "100px";
    ball.style.top = "100px";

    document.addEventListener("mousemove", function(event) {
        if (isDragging) {
            let ballRect = ball.getBoundingClientRect();
            let deltaX = event.clientX - lastMouseX;
            let deltaY = event.clientY - lastMouseY;

            // Update ball position based on mouse movement
            ball.style.left = (parseFloat(ball.style.left) || 0) + deltaX + "px";
            ball.style.top = (parseFloat(ball.style.top) || 0) + deltaY + "px";

            // Update lastMouse positions
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;

            // Update velocity based on mouse movement
            velocityX = deltaX / (Date.now() - draggingStartTime);
            velocityY = deltaY / (Date.now() - draggingStartTime);
            draggingStartTime = Date.now();
        }
    });

    ball.addEventListener("mousedown", function(event) {
        isDragging = true;
        isGravityActive = false;
        offsetX = event.clientX - ball.getBoundingClientRect().left - window.scrollX;
        offsetY = event.clientY - ball.getBoundingClientRect().top - window.scrollY;
        
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        draggingStartTime = Date.now();
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
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
    
            // Apply friction
            velocityX *= friction;
            velocityY *= friction;
    
            // Update ball position based on velocity
            let ballLeft = parseFloat(ball.style.left) || 0;
            let ballTop = parseFloat(ball.style.top) || 0;
            ballLeft += velocityX;
            ballTop += velocityY;
            
            // Handle wrapping around screen edges
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (ballLeft + ballRect.width < 0) {
                ballLeft = viewportWidth; // Wrap to the right side
            } else if (ballLeft > viewportWidth) {
                ballLeft = -ballRect.width; // Wrap to the left side
            }
            
            // Ensure the ball stops above the footer
            if (ballTop + ballRect.height > footerTop) {
                velocityY *= -1; // Reverse velocity 
                ballTop = footerTop - ballRect.height;
                if (Math.abs(velocityY) < 0.1) {
                    velocityY = 0; // Stop bouncing when velocity is very small
                }
            }
    
            // Update the ball's position
            ball.style.left = ballLeft + "px";
            ball.style.top = ballTop + "px";
        }
    }

    setInterval(applyGravity, 16);
});
