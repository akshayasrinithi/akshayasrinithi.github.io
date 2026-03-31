particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    size: { value: 2.6 },
    move: { speed: 0.8 },
    opacity: { value: 0.35 },
    color: { value: "#67e8f9" },
    line_linked: {
      enable: true,
      opacity: 0.12,
      color: "#38bdf8"
    }
  }
});

const cards = document.querySelectorAll(".flash-card");
let current = 0;

function setActiveCard(index) {
  current = index;
  cards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === current);
  });
}

function moveFocus(step) {
  const nextIndex = (current + step + cards.length) % cards.length;
  setActiveCard(nextIndex);
  cards[nextIndex].focus();
}

cards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    setActiveCard(index);
  });

  card.addEventListener("focus", () => {
    setActiveCard(index);
  });

  card.addEventListener("mousemove", (event) => {
    const bounds = card.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * 100;
    const rotateY = ((pointerX - 50) / 50) * 5;
    const rotateX = ((50 - pointerY) / 50) * 5;

    card.style.setProperty("--pointer-x", `${pointerX}%`);
    card.style.setProperty("--pointer-y", `${pointerY}%`);
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    moveFocus(1);
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    moveFocus(-1);
  }
});

setActiveCard(0);
