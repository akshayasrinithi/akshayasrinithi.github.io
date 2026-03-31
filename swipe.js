const portfolioSections = [
  {
    chip: "About",
    label: "Profile",
    title: "About",
    summary: "A short introduction to my background, interests, and engineering approach.",
    detail: "A minimal portfolio deck built for quick exploration.",
    action: { label: "Enter About", href: "about.html" }
  },
  {
    chip: "Projects",
    label: "Showcase",
    title: "Projects",
    summary: "A collection of product-minded AI, software, and electronics work.",
    detail: "This card leads into a dedicated project showcase page.",
    action: { label: "Explore Projects", href: "projects.html" }
  },
  {
    chip: "Education",
    label: "Learning",
    title: "Education",
    summary: "A quick snapshot of academic foundations, technical study, and growth.",
    detail: "Placeholder content for now, ready to expand later.",
    action: { label: "View Education", href: "education.html" }
  },
  {
    chip: "Timeline",
    label: "Journey",
    title: "Timeline",
    summary: "A simple timeline card for milestones, progress, and key moments.",
    detail: "This is set up as a clean placeholder destination.",
    action: { label: "View Timeline", href: "timeline.html" }
  },
  {
    chip: "Goals",
    label: "Direction",
    title: "Goals",
    summary: "A future-facing card for ambitions, focus areas, and next steps.",
    detail: "Built to stay concise now and scale later.",
    action: { label: "Explore Goals", href: "goals.html" }
  },
  {
    chip: "Connect",
    label: "Reach Out",
    title: "Connect",
    summary: "A placeholder card for links, contact methods, and collaboration details.",
    detail: "We can customize this section later with real channels.",
    action: { label: "Open Connect", href: "connect.html" }
  },
  {
    chip: "Message",
    label: "Notes",
    title: "Message",
    summary: "A lightweight placeholder for messages, guest notes, or a future contact form.",
    detail: "This keeps the loop complete while staying easy to expand.",
    action: { label: "Open Message", href: "message.html" }
  }
];

const stack = document.getElementById("card-stack");
const template = document.getElementById("portfolio-card-template");
const particleCanvas = document.getElementById("particle-canvas");
const introShell = document.querySelector(".intro-shell");
const deckShell = document.querySelector(".deck-shell");
const deckTimeline = document.getElementById("deck-timeline");
const visibleCards = 3;
const swipeThreshold = 110;

let deck = [...portfolioSections];
let dragState = null;
let activeCard = null;
let activeIndex = 0;

function resizeCanvas() {
  if (!particleCanvas) {
    return;
  }

  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}

function updateScrollDepth() {
  const scrollY = window.scrollY || 0;

  if (particleCanvas) {
    particleCanvas.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
  }

  if (introShell) {
    const introOffset = Math.min(scrollY * 0.06, 18);
    const introOpacity = Math.max(0.72, 1 - scrollY / 1200);
    introShell.style.transform = `translate3d(0, ${introOffset}px, 0)`;
    introShell.style.opacity = String(introOpacity);
  }

  if (deckShell) {
    const deckOffset = Math.min(scrollY * 0.03, 14);
    deckShell.style.setProperty("--deck-scroll-offset", `${deckOffset}px`);
    deckShell.style.opacity = String(Math.max(0.82, 1 - scrollY / 1800));
  }
}

function startParticles() {
  if (!particleCanvas) {
    return;
  }

  const context = particleCanvas.getContext("2d");
  const particles = Array.from({ length: 56 }, () => ({
    x: Math.random() * particleCanvas.width,
    y: Math.random() * particleCanvas.height,
    radius: 1 + Math.random() * 2.4,
    alpha: 0.16 + Math.random() * 0.24,
    dx: -0.25 + Math.random() * 0.5,
    dy: -0.22 + Math.random() * 0.44
  }));

  function draw() {
    context.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach((particle) => {
      particle.x += particle.dx;
      particle.y += particle.dy;

      if (particle.x < -20) particle.x = particleCanvas.width + 20;
      if (particle.x > particleCanvas.width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = particleCanvas.height + 20;
      if (particle.y > particleCanvas.height + 20) particle.y = -20;

      const gradient = context.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 8
      );

      gradient.addColorStop(0, `rgba(103, 232, 249, ${particle.alpha})`);
      gradient.addColorStop(1, "rgba(103, 232, 249, 0)");

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius * 8, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = `rgba(207, 250, 254, ${particle.alpha + 0.08})`;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    requestAnimationFrame(draw);
  }

  resizeCanvas();
  draw();
  window.addEventListener("resize", resizeCanvas);
}

function createActionButton(action) {
  const link = document.createElement("a");
  link.className = "action-button primary placeholder";
  link.textContent = action.label;
  link.href = action.href;
  return link;
}

function renderTimeline() {
  if (!deckTimeline) {
    return;
  }

  deckTimeline.innerHTML = "";

  portfolioSections.forEach((section, index) => {
    const item = document.createElement("div");
    item.className = `timeline-step${index === activeIndex ? " is-active" : ""}`;

    const dot = document.createElement("span");
    dot.className = "timeline-dot";

    const label = document.createElement("span");
    label.className = "timeline-label";
    label.textContent = section.title;

    item.appendChild(dot);
    item.appendChild(label);
    deckTimeline.appendChild(item);
  });
}

function renderDeck() {
  stack.innerHTML = "";

  deck.slice(0, visibleCards).forEach((section, index) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".swipe-card");
    const chip = fragment.querySelector(".card-chip");
    const count = fragment.querySelector(".card-count");
    const label = fragment.querySelector(".visual-label");
    const title = fragment.querySelector(".card-title");
    const summary = fragment.querySelector(".card-summary");
    const detail = fragment.querySelector(".card-detail");
    const tagContainer = fragment.querySelector(".card-tags");
    const actionContainer = fragment.querySelector(".card-actions");

    const upcomingSection = deck[(index + 1) % deck.length];

    chip.textContent = index === 0 ? `Next: ${upcomingSection.title}` : section.chip;
    count.textContent = "Swipe";
    label.textContent = section.label;
    title.textContent = section.title;
    summary.textContent = section.summary;
    detail.textContent = section.detail;
    actionContainer.appendChild(createActionButton(section.action));

    const depthOffset = index * 18;
    const depthXOffset = index * 18;
    const scale = 1 - index * 0.045;
    const opacity = 1 - index * 0.08;

    card.style.zIndex = String(visibleCards - index);
    card.style.opacity = String(opacity);
    card.style.transform = `translate3d(${depthXOffset}px, ${depthOffset}px, ${-index * 26}px) scale(${scale})`;
    card.dataset.index = String(index);

    if (index === 0) {
      card.classList.add("is-top");
    } else {
      card.classList.add("is-layered");
    }

    tagContainer.remove();
    stack.appendChild(card);
  });

  activeCard = stack.querySelector(".swipe-card.is-top");

  if (activeCard) {
    bindCardDrag(activeCard);
  }

  renderTimeline();
}

function rotateDeck() {
  const shifted = deck.shift();

  if (shifted) {
    deck.push(shifted);
  }

  activeIndex = (activeIndex + 1) % portfolioSections.length;

  renderDeck();

  const nextTopCard = stack.querySelector(".swipe-card.is-top");
  if (nextTopCard) {
    nextTopCard.animate(
      [
        { transform: "translateY(18px) scale(0.96)" },
        { transform: "translateY(0) scale(1)" }
      ],
      { duration: 240, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
  }
}

function resetCardPosition(card) {
  card.style.transition = "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)";
  card.style.transform = "translate3d(0, 0, 0) rotate(0deg) rotateX(0deg) rotateY(0deg)";

  window.setTimeout(() => {
    card.style.transition = "";
    renderDeck();
  }, 280);
}

function commitSwipe(card, deltaX) {
  const direction = deltaX > 0 ? 1 : -1;
  const flyOutX = window.innerWidth * direction;
  const rotation = direction * 16;

  card.style.transition = "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)";
  card.style.transform = `translate3d(${flyOutX}px, 24px, 0) rotate(${rotation}deg) rotateY(${direction * 10}deg)`;

  window.setTimeout(() => {
    rotateDeck();
  }, 320);
}

function onPointerMove(event) {
  if (!dragState || !activeCard) {
    return;
  }

  const point = "touches" in event ? event.touches[0] : event;
  const deltaX = point.clientX - dragState.startX;
  const deltaY = point.clientY - dragState.startY;
  const rotation = deltaX * 0.06;
  const rotateY = deltaX * 0.025;
  const rotateX = deltaY * -0.015;
  const depthShift = Math.min(Math.abs(deltaX) * 0.04, 18);
  const secondaryCard = stack.querySelector('.swipe-card[data-index="1"]');

  activeCard.classList.add("is-dragging");
  activeCard.style.transform = `perspective(1400px) translate3d(${deltaX}px, ${deltaY * 0.06}px, ${depthShift}px) rotate(${rotation}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  if (secondaryCard) {
    const progress = Math.min(Math.abs(deltaX) / swipeThreshold, 1);
    secondaryCard.style.opacity = String(0.92 + progress * 0.08);
    secondaryCard.style.transform = `translate3d(${12 - progress * 12}px, ${18 - progress * 6}px, -10px) scale(${0.955 + progress * 0.045})`;
  }

  const tertiaryCard = stack.querySelector('.swipe-card[data-index="2"]');
  if (tertiaryCard) {
    const progress = Math.min(Math.abs(deltaX) / swipeThreshold, 1);
    tertiaryCard.style.transform = `translate3d(${28 - progress * 10}px, ${36 - progress * 8}px, -42px) scale(${0.91 + progress * 0.025})`;
  }

  dragState.currentX = deltaX;
}

function onPointerUp() {
  if (!dragState || !activeCard) {
    return;
  }

  const deltaX = dragState.currentX;
  activeCard.classList.remove("is-dragging");

  if (Math.abs(deltaX) > swipeThreshold) {
    commitSwipe(activeCard, deltaX);
  } else {
    resetCardPosition(activeCard);
  }

  dragState = null;
  detachPointerListeners();
}

function detachPointerListeners() {
  document.removeEventListener("mousemove", onPointerMove);
  document.removeEventListener("mouseup", onPointerUp);
  document.removeEventListener("touchmove", onPointerMove);
  document.removeEventListener("touchend", onPointerUp);
}

function startDrag(event, card) {
  if (event.target.closest(".action-button")) {
    return;
  }

  const point = "touches" in event ? event.touches[0] : event;
  dragState = {
    startX: point.clientX,
    startY: point.clientY,
    currentX: 0
  };

  activeCard = card;
  document.addEventListener("mousemove", onPointerMove);
  document.addEventListener("mouseup", onPointerUp);
  document.addEventListener("touchmove", onPointerMove, { passive: true });
  document.addEventListener("touchend", onPointerUp);
}

function bindCardDrag(card) {
  card.addEventListener("mousedown", (event) => startDrag(event, card));
  card.addEventListener("touchstart", (event) => startDrag(event, card), { passive: true });
}

startParticles();
updateScrollDepth();
window.addEventListener("scroll", updateScrollDepth, { passive: true });
renderDeck();
