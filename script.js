/* JavaScript for the responsive navigation menu */
function toggleMenu() {
    document
        .getElementById("nav-links")
        .classList.toggle("active");
}


/* JavaScript for the slideshow */

const slides = document.querySelectorAll('.slide');

let currentSlide = 0;

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
});

showSlide(0); // Show the first slide initially

setInterval(() => {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
}, 5000); // This changes slide every 5 seconds

/* JavaScript for the contact form validation */
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
    } else if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
    } else {
        alert('Thank you for your message!');
        contactForm.reset(); // Reset the form after submission
    }   
});

// JS for Contact Popup
function openPopup(id) {
    document.getElementById(id).style.display = "flex";
}

function closePopup(id) {
    document.getElementById(id).style.display = "none";
}
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const counsellor = document.getElementById("counsellor").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const subject = `Support Request from ${name}`;

        const body =
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `${message}`;

        window.location.href =
            `mailto:${counsellor}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });

});

/* ---------------- POPUPS ---------------- */
function openPopup(id){
    document.getElementById(id).style.display = "block";

    // start snake only when popup opens
    if (id === "snake") startSnake();
}

function closePopup(id){
    document.getElementById(id).style.display = "none";
}

/* ---------------- SNAKE ---------------- */
let canvas, ctx;
let snake, dir, food, gameInterval;
const box = 15;

function startSnake(){

    // prevent multiple intervals stacking
    if (gameInterval) clearInterval(gameInterval);

    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");

    snake = [{x: 5*box, y: 5*box}];
    dir = "RIGHT";
    food = spawnFood();

    document.onkeydown = (e) => {
        if(e.key === "ArrowLeft") dir = "LEFT";
        if(e.key === "ArrowRight") dir = "RIGHT";
        if(e.key === "ArrowUp") dir = "UP";
        if(e.key === "ArrowDown") dir = "DOWN";
    };

    gameInterval = setInterval(drawGame, 150);
}

function spawnFood(){
    return {
        x: Math.floor(Math.random()*20)*box,
        y: Math.floor(Math.random()*20)*box
    };
}

function drawSnake(){
    ctx.fillStyle = "lime";
    snake.forEach(s => ctx.fillRect(s.x, s.y, box, box));
}

function drawGame(){

    ctx.clearRect(0,0,300,300);

    let head = {...snake[0]};

    if(dir==="LEFT") head.x -= box;
    if(dir==="RIGHT") head.x += box;
    if(dir==="UP") head.y -= box;
    if(dir==="DOWN") head.y += box;

    // restart if hits wall
    if(head.x < 0 || head.y < 0 || head.x >= 300 || head.y >= 300){
        startSnake();
        return;
    }

    if(head.x === food.x && head.y === food.y){
        food = spawnFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    drawSnake();
}

/* ---------------- WORDLE ---------------- */
const answer = "CODE";

function checkWord(){
    let g = document.getElementById("guess").value.toUpperCase();

    document.getElementById("wordleResult").innerText =
        (g === answer) ? "Correct!" : "Try again!";
}

/* ---------------- RPS ---------------- */
function play(user){
    const choices = ["rock","paper","scissors"];
    const bot = choices[Math.floor(Math.random()*3)];

    let result;

    if(user === bot){
        result = "Draw!";
    } else if(
        (user==="rock" && bot==="scissors") ||
        (user==="paper" && bot==="rock") ||
        (user==="scissors" && bot==="paper")
    ){
        result = "You win!";
    } else {
        result = "You lose!";
    }

    document.getElementById("rpsResult").innerText =
        `Bot chose ${bot}. ${result}`;
}