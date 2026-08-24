// =========================
// MOBILE MENU
// =========================

function toggleMenu() {
    const nav = document.getElementById("nav-links");

    if (nav) {
        nav.classList.toggle("active");
    }
}


// =========================
// POPUPS
// =========================

function openPopup(id) {
    const popup = document.getElementById(id);

    if (!popup) return;

    popup.classList.add("active");
    document.body.classList.add("game-open");

    if (id === "snake") {
        startSnake();
    }
}


function closePopup(id) {
    const popup = document.getElementById(id);

    if (!popup) return;

    popup.classList.remove("active");
    document.body.classList.remove("game-open");
}


function closeAllPopups() {

    document.querySelectorAll(
        ".snake-popup, .wordle-popup, .rps-popup"
    ).forEach(popup => {
        popup.classList.remove("active");
        document.body.classList.remove("game-open");
    });

}


// Close popup when clicking outside
window.addEventListener("click", function (e) {

    document.querySelectorAll(
        ".snake-popup, .wordle-popup, .rps-popup"
    ).forEach(popup => {

        if (e.target === popup) {
            popup.classList.remove("active");
        }

    });

});


// Close popup with ESC key
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {
        closeAllPopups();
    }

});


// =========================
// WORDLE
// =========================

const words = [
    {
        word: "CODE",
        clue: "What programmers write."
    },
    {
        word: "CALM",
        clue: "A peaceful state of mind."
    },
    {
        word: "HOPE",
        clue: "A positive feeling about the future."
    },
    {
        word: "LOVE",
        clue: "A feeling of deep affection."
    },
    {
        word: "HELP",
        clue: "What you should ask for when you need support."
    },
    {
        word: "CARE",
        clue: "Showing kindness to others."
    },
    {
        word: "MIND",
        clue: "Your thoughts and emotions."
    },
    {
        word: "REST",
        clue: "Something everyone needs."
    }
];


let currentWord;


function newWord() {

    const randomWord =
        words[Math.floor(Math.random() * words.length)];

    currentWord = randomWord;


    const clue = document.getElementById("clue");
    const guess = document.getElementById("guess");
    const result = document.getElementById("wordleResult");


    if (clue) clue.textContent = currentWord.clue;
    if (guess) guess.value = "";
    if (result) result.textContent = "";

}


function checkWord() {

    const guessInput = document.getElementById("guess");
    const result = document.getElementById("wordleResult");


    if (!guessInput || !result) return;


    const guess =
        guessInput.value.toUpperCase();


    if (guess.length !== currentWord.word.length) {

        result.innerHTML =
            `Please enter a ${currentWord.word.length}-letter word.`;

        return;
    }


    let output = "";
    let correct = 0;


    for (let i = 0; i < guess.length; i++) {


        if (guess[i] === currentWord.word[i]) {

            output += "🟩 ";
            correct++;

        }

        else if (currentWord.word.includes(guess[i])) {

            output += "🟨 ";

        }

        else {

            output += "⬜ ";

        }

    }


    result.innerHTML = `
        <p>${output}</p>
        <p>
            <strong>Correct letters:</strong>
            ${correct}/${currentWord.word.length}
        </p>
    `;


    if (guess === currentWord.word) {

        result.innerHTML +=
            "<p>🎉 Correct!</p>";

        setTimeout(newWord, 2000);

    }

}


// Start Wordle after page loads
document.addEventListener("DOMContentLoaded", () => {

    newWord();

});


// =========================
// ROCK PAPER SCISSORS
// =========================

function play(playerChoice) {


    const choices =
        ["rock", "paper", "scissors"];


    const computer =
        choices[Math.floor(Math.random() * choices.length)];


    let result;


    if (playerChoice === computer) {

        result = "🤝 Draw!";

    }

    else if (

        (playerChoice === "rock" &&
        computer === "scissors") ||

        (playerChoice === "paper" &&
        computer === "rock") ||

        (playerChoice === "scissors" &&
        computer === "paper")

    ) {

        result = "🎉 You Win!";

    }

    else {

        result = "😔 You Lose!";

    }


    const output =
        document.getElementById("rpsResult");


    if (output) {

        output.innerHTML = `
            You chose <b>${playerChoice}</b><br>
            Computer chose <b>${computer}</b><br><br>
            ${result}
        `;

    }

}


// =========================
// SNAKE
// =========================

const canvas =
    document.getElementById("game");


let ctx = null;


if (canvas) {

    ctx = canvas.getContext("2d");

}


const grid = 15;


let snake = [];
let direction = "RIGHT";
let food;
let gameLoop;



function startSnake() {


    if (!canvas || !ctx) return;


    clearInterval(gameLoop);


    snake = [
        {
            x: 150,
            y: 150
        }
    ];


    direction = "RIGHT";


    food = {

        x: Math.floor(Math.random() * 20) * grid,
        y: Math.floor(Math.random() * 20) * grid

    };


    gameLoop =
        setInterval(drawSnake, 120);

}


document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        changeDirection("UP");
    }
    else if (event.key === "ArrowDown") {
        changeDirection("DOWN");
    }
    else if (event.key === "ArrowLeft") {
        changeDirection("LEFT");
    }
    else if (event.key === "ArrowRight") {
        changeDirection("RIGHT");
    }
});
function changeDirection(newDirection) {

    // Prevent the snake from instantly reversing
    if (newDirection === "UP" && direction !== "DOWN") {
        direction = "UP";
    }

    else if (newDirection === "DOWN" && direction !== "UP") {
        direction = "DOWN";
    }

    else if (newDirection === "LEFT" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    else if (newDirection === "RIGHT" && direction !== "LEFT") {
        direction = "RIGHT";
    }

}
// =========================
// SNAKE MOBILE CONTROLS
// =========================

document.querySelectorAll(".snake-controls button").forEach(button => {

    button.addEventListener("click", function () {

        const newDirection = this.dataset.direction;

        changeDirection(newDirection);

    });

});

function drawSnake() {


    if (!ctx || !canvas) return;


    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    let head = {

        x: snake[0].x,
        y: snake[0].y

    };


    if (direction === "UP") head.y -= grid;
    if (direction === "DOWN") head.y += grid;
    if (direction === "LEFT") head.x -= grid;
    if (direction === "RIGHT") head.x += grid;



    snake.unshift(head);



    if (
        head.x === food.x &&
        head.y === food.y
    ) {

        food = {

            x: Math.floor(Math.random() * 20) * grid,
            y: Math.floor(Math.random() * 20) * grid

        };

    }

    else {

        snake.pop();

    }



    if (

        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height

    ) {

        clearInterval(gameLoop);

        alert("Game Over!");

        return;

    }



    ctx.fillStyle = "#F47C67";


    snake.forEach(part => {

        ctx.fillRect(
            part.x,
            part.y,
            grid - 1,
            grid - 1
        );

    });



    ctx.fillStyle = "#8FCB9B";


    ctx.fillRect(
        food.x,
        food.y,
        grid - 1,
        grid - 1
    );

}

// =========================
// SNAKE RESTART BUTTON
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const restartSnakeButton = document.getElementById("restartBtn");

    if (restartSnakeButton) {

        restartSnakeButton.addEventListener("click", function () {

            startSnake();

        });

    }

});