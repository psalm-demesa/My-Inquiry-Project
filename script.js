document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       NAVIGATION
    ========================= */

    window.toggleMenu = function () {
        const menu = document.getElementById("nav-links");

        if (menu) {
            menu.classList.toggle("active");
        }
    };


    /* =========================
       SLIDESHOW
    ========================= */

    let currentSlide = 0;

    function getSlides() {
        return document.querySelectorAll(".slide");
    }

    function showSlide(index) {

        const slides = getSlides();

        if (slides.length === 0) return;

        if (index >= slides.length) {
            currentSlide = 0;
        }

        if (index < 0) {
            currentSlide = slides.length - 1;
        }

        slides.forEach(function (slide, i) {

            if (i === currentSlide) {
                slide.style.display = "flex";
            } else {
                slide.style.display = "none";
            }

        });
    }


    function nextSlide() {

        const slides = getSlides();

        if (slides.length === 0) return;

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }


    function previousSlide() {

        const slides = getSlides();

        if (slides.length === 0) return;

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    }


    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");


    if (nextButton) {
        nextButton.addEventListener("click", nextSlide);
    }

    if (prevButton) {
        prevButton.addEventListener("click", previousSlide);
    }


    /* Start slideshow */

    showSlide(0);


    /* Automatic slideshow */

    setInterval(function () {
        nextSlide();
    }, 5000);


    /* =========================
       QUOTE POPUP
    ========================= */

    window.openQuoteForm = function () {

        const form = document.getElementById("quoteForm");

        if (form) {
            form.classList.add("active");
        }

    };


    window.closeQuoteForm = function () {

        const form = document.getElementById("quoteForm");

        if (form) {
            form.classList.remove("active");
        }

    };


    /* =========================
       SUBMIT QUOTE
    ========================= */

    window.submitQuote = function () {

        const quoteInput =
            document.getElementById("userQuote");

        const authorInput =
            document.getElementById("quoteAuthor");

        const message =
            document.getElementById("quoteMessage");


        const quote =
            quoteInput.value.trim();

        const author =
            authorInput.value.trim();


        /* Don't allow empty quotes */

        if (quote === "") {

            message.textContent =
                "Please enter a quote.";

            return;
        }


        /* =========================
           CREATE NEW SLIDE
        ========================= */

        const newSlide =
            document.createElement("div");

        newSlide.className = "slide";


        const quoteElement =
            document.createElement("h2");

        quoteElement.className = "quote";

        quoteElement.textContent =
            `"${quote}"`;


        const authorElement =
            document.createElement("p");

        authorElement.className =
            "quote-author";

        authorElement.textContent =
            "- " + (author || "Anonymous");


        newSlide.appendChild(quoteElement);
        newSlide.appendChild(authorElement);


        /* =========================
           ADD SLIDE
        ========================= */

        const slider =
            document.getElementById("slider");

        const buttons =
            slider.querySelector(".quote-buttons");


        slider.insertBefore(
            newSlide,
            buttons
        );


        /* =========================
           SAVE QUOTE
        ========================= */

        let savedQuotes =
            JSON.parse(
                localStorage.getItem("quotes")
            ) || [];


        savedQuotes.push({
            quote: quote,
            author: author || "Anonymous"
        });


        localStorage.setItem(
            "quotes",
            JSON.stringify(savedQuotes)
        );


        /* =========================
           RESET FORM
        ========================= */

        quoteInput.value = "";
        authorInput.value = "";
        message.textContent = "";


        /* =========================
           CLOSE POPUP
        ========================= */

        closeQuoteForm();


        /* =========================
           SHOW NEW SLIDE
        ========================= */

        const slides = getSlides();

        currentSlide = slides.length - 1;

        showSlide(currentSlide);

    };


    /* =========================
       LOAD SAVED QUOTES
    ========================= */

    const savedQuotes =
        JSON.parse(
            localStorage.getItem("quotes")
        ) || [];


    savedQuotes.forEach(function (item) {

        const newSlide =
            document.createElement("div");

        newSlide.className = "slide";


        const quoteElement =
            document.createElement("h2");

        quoteElement.className = "quote";

        quoteElement.textContent =
            `"${item.quote}"`;


        const authorElement =
            document.createElement("p");

        authorElement.className =
            "quote-author";

        authorElement.textContent =
            "- " + item.author;


        newSlide.appendChild(quoteElement);
        newSlide.appendChild(authorElement);


        const slider =
            document.getElementById("slider");

        const buttons =
            slider.querySelector(".quote-buttons");


        slider.insertBefore(
            newSlide,
            buttons
        );

    });


    /* =========================
       CLOSE POPUP WHEN CLICKING
       OUTSIDE
    ========================= */

    const quoteForm =
        document.getElementById("quoteForm");


    if (quoteForm) {

        quoteForm.addEventListener(
            "click",
            function (event) {

                if (event.target === quoteForm) {
                    closeQuoteForm();
                }

            }
        );

    }

});

function openPopup(id) {
    const popup = document.getElementById(id);

    if (popup) {
        popup.classList.add("active");
    }
}

function closePopup(id) {
    const popup = document.getElementById(id);

    if (popup) {
        popup.classList.remove("active");
    }
}

function toggleMenu() {
    const navLinks = document.getElementById("nav-links");

    if (navLinks) {
        navLinks.classList.toggle("active");
    }
}