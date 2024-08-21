// script.js
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
        const headerRect = document.querySelector("header").getBoundingClientRect();

        // Get the scroll position
        const scrollY = window.scrollY;

        // Calculate the footer's and header's position relative to the viewport
        const footerTop = footerRect.top + scrollY;
        const headerBottom = headerRect.bottom + scrollY;

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

        if (ballLeft + ballRect.width < 0) {
            ballLeft = viewportWidth; // Wrap to the right side
        } else if (ballLeft > viewportWidth) {
            ballLeft = -ballRect.width; // Wrap to the left side
        }
        
        // Ensure the ball stops above the footer
        if (ballTop + ballRect.height > footerTop) {
            velocityY *= -1; // Reverse velocity
            ballTop = footerTop - ballRect.height; // Position the ball at the top of the footer
            if (Math.abs(velocityY) < 0.1) {
                velocityY = 0; // Stop bouncing when velocity is very small
            }
        }

        // Ensure the ball stops below the header
        if (ballTop < headerBottom) {
            velocityY *= -1; // Reverse velocity
            ballTop = headerBottom; // Position the ball at the bottom of the header
            if (Math.abs(velocityY) < 0.1) {
                velocityY = 0; // Stop bouncing when velocity is very small
            }
        }

        // Update the ball's position
        ball.style.left = ballLeft + "px";
        ball.style.top = ballTop + "px";
    }
}

function toggleGravity() {
    // Reverse gravity direction
    gravity *= -1;

    // Update button color based on gravity direction
    const button = document.querySelector(".gravity-button");
    if (gravity < 0) {
        button.style.backgroundColor = 'rgb(141, 38, 20)'; // Red for upward gravity
    } else {
        button.style.backgroundColor = '#156c15'; // Green for downward gravity
    }
}

setInterval(applyGravity, 16);

function resetGame(iframeId, url) {
    var iframe = document.getElementById(iframeId);
    iframe.src = '';
    iframe.src = url;
}

window.addEventListener("scroll", function() {
    const slider = document.querySelector('.footer-slider');
    const docHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    // Calculate the percentage of how far you've scrolled
    const scrollPercent = (scrollPosition / (docHeight - viewportHeight)) * 100;
    
    // Update the width of the slider
    slider.style.width = Math.min(scrollPercent, 100) + '%'; // Cap at 100%
});