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