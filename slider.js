const sliderTrack = document.getElementById("sliderTrack");
const sliderViewport = document.getElementById("sliderViewport");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const dotsContainer = document.getElementById("sliderDots");

const originalSlides = Array.from(sliderTrack.children);
const totalSlides = originalSlides.length;

let currentIndex = 1;
let slideWidth = sliderViewport.clientWidth;
let isMoving = false;

// Clone the first and last slides for infinite sliding
const firstClone = originalSlides[0].cloneNode(true);
const lastClone = originalSlides[totalSlides - 1].cloneNode(true);

sliderTrack.appendChild(firstClone);
sliderTrack.insertBefore(lastClone, originalSlides[0]);

// Create one indicator dot for each original slide
const dots = [];

for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");

    dot.classList.add("dot");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

    dot.addEventListener("click", () => {
        if (!isMoving) {
            currentIndex = i + 1;
            moveToSlide();
        }
    });

    dotsContainer.appendChild(dot);
    dots.push(dot);
}

// Display the correct slide and active dot
function moveToSlide() {
    slideWidth = sliderViewport.clientWidth;

    sliderTrack.style.transform =
        `translateX(-${currentIndex * slideWidth}px)`;

    isMoving = true;
    updateDots();
}

// Highlight the active dot
function updateDots() {
    let activeIndex = currentIndex - 1;

    if (currentIndex === 0) {
        activeIndex = totalSlides - 1;
    } else if (currentIndex === totalSlides + 1) {
        activeIndex = 0;
    }

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === activeIndex);
    });
}

// Move to the next slide
nextButton.addEventListener("click", () => {
    if (!isMoving) {
        currentIndex++;
        moveToSlide();
    }
});

// Move to the previous slide
previousButton.addEventListener("click", () => {
    if (!isMoving) {
        currentIndex--;
        moveToSlide();
    }
});

// Reset the position after reaching a cloned slide
sliderTrack.addEventListener("transitionend", () => {
    if (currentIndex === totalSlides + 1) {
        sliderTrack.style.transition = "none";
        currentIndex = 1;
        moveToPosition();
    } else if (currentIndex === 0) {
        sliderTrack.style.transition = "none";
        currentIndex = totalSlides;
        moveToPosition();
    }

    isMoving = false;
});

// Set the slide position without animation
function moveToPosition() {
    slideWidth = sliderViewport.clientWidth;

    sliderTrack.style.transform =
        `translateX(-${currentIndex * slideWidth}px)`;

    sliderTrack.offsetHeight;
    sliderTrack.style.transition = "transform 0.4s ease";

    updateDots();
}

// Recalculate the slide position when the window is resized
window.addEventListener("resize", () => {
    moveToPosition();
});

// Start with the first original slide
moveToPosition();
updateDots();