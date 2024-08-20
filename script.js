// script.js
document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById("ball");

    document.addEventListener("mousemove", function(event) {
        // Get the mouse position
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Update the ball's position
        ball.style.left = (mouseX - ball.clientWidth / 2) + "px";
        ball.style.top = (mouseY - ball.clientHeight / 2) + "px";
    });
});
