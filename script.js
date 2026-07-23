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
