document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       RESPONSIVE NAVIGATION MENU
    ========================== */

    window.toggleMenu = function () {
        document
            .getElementById("nav-links")
            .classList.toggle("active");
    };


    /* =========================
       SLIDESHOW
    ========================== */

    const slides = document.querySelectorAll(".slide");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    function nextSlide() {
        currentSlide =
            currentSlide === slides.length - 1
            ? 0
            : currentSlide + 1;

        showSlide(currentSlide);
    }

    function previousSlide() {
        currentSlide =
            currentSlide === 0
            ? slides.length - 1
            : currentSlide - 1;

        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        showSlide(0);

        nextButton?.addEventListener("click", nextSlide);
        prevButton?.addEventListener("click", previousSlide);

        setInterval(nextSlide, 5000);
    }



    /* =========================
       CONTACT POPUP
    ========================== */

    window.openPopup = function (id) {
        const popup = document.getElementById(id);

        if (!popup) return;

        popup.classList.add("active");

        if (id === "snake") {
            startSnake();
        }
    };


    window.closePopup = function (id) {
        const popup = document.getElementById(id);

        if (!popup) return;

        popup.classList.remove("active");
    };



    /* =========================
       CONTACT FORM
    ========================== */

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const counsellor =
                document.getElementById("counsellor")?.value;

            const name =
                document.getElementById("name")?.value.trim();

            const email =
                document.getElementById("email")?.value.trim();

            const message =
                document.getElementById("message")?.value.trim();


            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }


            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }


            const subject = `Support Request from ${name}`;

            const body =
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `${message}`;


            window.location.href =
                `mailto:${counsellor}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


            contactForm.reset();

        });
    }



    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }



    /* =========================
              SNAKE GAME
    ========================== */
const gameCanvas = document.querySelector('#gameCanvas');
const ctx = gameCanvas.getContext('2d');
const scoreElement = document.querySelector('#score');
const startButton = document.querySelector('#startButton');
const restartButton = document.querySelector('#restartButton');
const gameWidth = gameCanvas.width;
const gameHeight = gameCanvas.height;
const cellSize = 20;
const initialSnakeLength = 3;
let snake = [];
let direction = 'right';
let food = {};
let score = 0;
let gameInterval;
startButton.addEventListener('click', () => {
    init();
    startButton.disabled = true;
    restartButton.disabled = true;
});
function init() {
    snake = []; 
    for (let i = initialSnakeLength - 1; i >= 0; i--) {
        snake.push({ x: i * cellSize, y: 0 });
    }
    direction = 'right';
    placeFood();
    score = 0;
    scoreElement.textContent = score;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}
function placeFood() {
    food = {
        x: Math.floor(Math.random() * (gameWidth / cellSize)) * cellSize,
        y: Math.floor(Math.random() * (gameHeight / cellSize)) * cellSize
    };
}
function gameLoop() {
    const head = { ...snake[0] };
    switch (direction) {    
        case 'right': head.x += cellSize; break;
        case 'left': head.x -= cellSize; break;
        case 'down': head.y += cellSize; break;
        case 'up': head.y -= cellSize; break;
    }
    if (head.x < 0 || head.x >= gameWidth || head.y < 0 || head.y >= gameHeight || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
        restartButton.disabled = false;
        return;
    }   
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }
    draw();
}
function draw() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, cellSize, cellSize);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, cellSize, cellSize);
}
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
        case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
        case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
        case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
    }
});
restartButton.addEventListener('click', () => {
    init();
    restartButton.disabled = false;
});
startButton.disabled = false;

    /* =========================
              WORDLE
    ========================== */

    const answer = "CODE";


    window.checkWord = function () {

        const guess =
            document
            .getElementById("guess")
            .value
            .toUpperCase();


        document
        .getElementById("wordleResult")
        .innerText =
            guess === answer
            ? "Correct!"
            : "Try again!";

    };



    /* =========================
          ROCK PAPER SCISSORS
    ========================== */

    window.play = function (userChoice) {

        const choices = [
            "rock",
            "paper",
            "scissors"
        ];


        const computerChoice =
            choices[
                Math.floor(Math.random() * choices.length)
            ];


        let result;


        if (userChoice === computerChoice) {

            result = "Draw!";

        }

        else if (

            (userChoice === "rock" &&
             computerChoice === "scissors")

            ||

            (userChoice === "paper" &&
             computerChoice === "rock")

            ||

            (userChoice === "scissors" &&
             computerChoice === "paper")

        ) {

            result = "You win!";

        }

        else {

            result = "You lose!";

        }



        document
        .getElementById("rpsResult")
        .innerText =
            `Bot chose ${computerChoice}. ${result}`;

    };


});