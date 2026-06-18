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