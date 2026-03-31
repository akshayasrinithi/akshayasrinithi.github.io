// PARTICLES
particlesJS("particles-js", {
  particles: {
    number: { value: 70 },
    size: { value: 3 },
    move: { speed: 1 },
    line_linked: {
      enable: true,
      opacity: 0.2
    }
  }
});

// FLASH CARDS
const cards = document.querySelectorAll(".flash-card");

let current = 0;

function updateCards() {
    cards.forEach((card, index) => {
        card.classList.remove("active", "left", "right", "hidden");

        if (index === current) {
            card.classList.add("active");
        } 
        else if (index === current - 1) {
            card.classList.add("left");
        } 
        else if (index === current + 1) {
            card.classList.add("right");
        } 
        else {
            card.classList.add("hidden");
        }
    });
}

updateCards();

// CLICK TO SELECT
cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        current = index;
        updateCards();
    });
});

// KEYBOARD NAVIGATION
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && current < cards.length - 1) {
        current++;
        updateCards();
    }
    if (e.key === "ArrowLeft" && current > 0) {
        current--;
        updateCards();
    }
});