const slider = document.getElementById("slider");

function createSlide(quote, quote-author){
    const slide = document.createElement("div");
    slide.classList.add("slide");
    const quoteElement = document.createElement("h2");
    quoteElement.classList.add("quote");
    quoteElement.textContent = quote;
    const authorElement = document.createElement("p");
    authorElement.classList.add("quote-author");
    authorElement.textContent = quote-author;
    slide.appendChild(quoteElement);
    slide.appendChild(authorElement);
    slider.appendChild(slide);
}
createSlide(quoteElement.textContent, authorElement.textContent);