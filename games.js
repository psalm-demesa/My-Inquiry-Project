// =========================
// MOBILE MENU
// =========================

function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("active");
}

// =========================
// POPUPS
// =========================

function openPopup(id) {
    const popup = document.getElementById(id);

    if (!popup) return;

    popup.classList.add("active");

    if (id === "snake") {
        startSnake();
    }
}

function closePopup(id) {
    const popup = document.getElementById(id);

    if (!popup) return;

    popup.classList.remove("active");
}

window.addEventListener("click", function (e) {

    document.querySelectorAll(
        ".snake-popup,.wordle-popup,.rps-popup"
    ).forEach(function (popup) {

        if (e.target === popup) {
            popup.classList.remove("active");
        }

    });

});

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        document.querySelectorAll(
            ".snake-popup,.wordle-popup,.rps-popup"
        ).forEach(function (popup) {
            popup.classList.remove("active");
        });

    }

});


// =========================
// WORDLE
// =========================

document.addEventListener("DOMContentLoaded", () => {
    newWord();
});

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

    currentWord =
        words[Math.floor(Math.random() * words.length)];

    document.getElementById("clue").textContent =
        currentWord.clue;

    document.getElementById("guess").value = "";
    document.getElementById("wordleResult").textContent = "";

}

function checkWord() {

    const guess = document
        .getElementById("guess")
        .value
        .toUpperCase();

    const result = document.getElementById("wordleResult");

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

        } else if (currentWord.word.includes(guess[i])) {

            output += "🟨 ";

        } else {

            output += "⬜ ";

        }

    }

    result.innerHTML = `
        <p>${output}</p>
        <p><strong>Correct letters:</strong> ${correct}/${currentWord.word.length}</p>
    `;

    if (guess === currentWord.word) {

        result.innerHTML += "<p>🎉 Correct!</p>";

        setTimeout(newWord, 2000);
    }

}


// =========================
// ROCK PAPER SCISSORS
// =========================

function play(playerChoice) {

    const choices = ["rock", "paper", "scissors"];

    const computer =
        choices[Math.floor(Math.random() * 3)];

    let result = "";

    if (playerChoice === computer) {

        result = "🤝 Draw!";

    }

    else if (

        (playerChoice === "rock" && computer === "scissors") ||
        (playerChoice === "paper" && computer === "rock") ||
        (playerChoice === "scissors" && computer === "paper")

    ) {

        result = "🎉 You Win!";

    }

    else {

        result = "😔 You Lose!";

    }

    document.getElementById("rpsResult").innerHTML =

        `You chose <b>${playerChoice}</b><br>
         Computer chose <b>${computer}</b><br><br>
         ${result}`;

}



// =========================
// SNAKE
// =========================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 15;

let snake;
let direction;
let food;
let gameLoop;

function startSnake() {

    clearInterval(gameLoop);

    snake = [
        { x: 150, y: 150 }
    ];

    direction = "RIGHT";

    food = {

        x: Math.floor(Math.random() * 20) * grid,
        y: Math.floor(Math.random() * 20) * grid

    };

    gameLoop = setInterval(drawSnake, 120);

}

document.addEventListener("keydown", function (e) {

    if (e.key === "ArrowUp" && direction !== "DOWN")
        direction = "UP";

    if (e.key === "ArrowDown" && direction !== "UP")
        direction = "DOWN";

    if (e.key === "ArrowLeft" && direction !== "RIGHT")
        direction = "LEFT";

    if (e.key === "ArrowRight" && direction !== "LEFT")
        direction = "RIGHT";

});

function drawSnake() {

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let head = {

        x: snake[0].x,
        y: snake[0].y

    };

    if (direction === "UP") head.y -= grid;
    if (direction === "DOWN") head.y += grid;
    if (direction === "LEFT") head.x -= grid;
    if (direction === "RIGHT") head.x += grid;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {

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

    snake.forEach(function (part) {

        ctx.fillRect(part.x, part.y, grid - 1, grid - 1);

    });

    ctx.fillStyle = "#8FCB9B";

    ctx.fillRect(food.x, food.y, grid - 1, grid - 1);

}