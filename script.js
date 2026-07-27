document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       RESPONSIVE NAVIGATION
    ========================= */

    window.toggleMenu = function () {
        document.getElementById("nav-links").classList.toggle("active");
    };


    /* =========================
       SLIDESHOW
    ========================= */

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
        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }

    function previousSlide() {
        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    }

    if (slides.length > 0) {

        showSlide(0);

        nextButton?.addEventListener("click", nextSlide);
        prevButton?.addEventListener("click", previousSlide);

        setInterval(nextSlide, 5000);

    }


    /* =========================
       POPUPS
    ========================= */

    window.openPopup = function (id) {

        const popup = document.getElementById(id);

        if (!popup) return;

        popup.classList.add("active");

        if (id === "snake" && typeof startSnake === "function") {
            startSnake();
        }

    };

    window.closePopup = function (id) {

        const popup = document.getElementById(id);

        if (!popup) return;

        popup.classList.remove("active");

    };

    window.addEventListener("click", function (e) {

        document.querySelectorAll(".snake-popup,.wordle-popup,.rps-popup,.pop-up")
            .forEach(function (popup) {

                if (e.target === popup) {
                    popup.classList.remove("active");
                }

            });

    });


    /* =========================
       CONTACT FORM
    ========================= */

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const counsellor = document.getElementById("counsellor").value;
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

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
                `Name: ${name}\nEmail: ${email}\n\n${message}`;

            window.location.href =
                `mailto:${counsellor}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            contactForm.reset();

        });

    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

});