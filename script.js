// script.js
document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById("ball");
    let isDragging = false;
    let isGravityActive = false;
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
        offsetX = event.clientX - ball.getBoundingClientRect().left;
        offsetY = event.clientY - ball.getBoundingClientRect().top;
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

            velocityY += gravity;
            let ballTop = parseFloat(ball.style.top) || 0;
            ballTop += velocityY;

            if (ballTop + ballRect.height > footerRect.top) {
                velocityY *= -0.7;
                ballTop = footerRect.top - ballRect.height;
                if (Math.abs(velocityY) < 0.1) {
                    velocityY = 0;
                }
            }

            ball.style.top = ballTop + "px";
        }
    }

    setInterval(applyGravity, 16);
});
