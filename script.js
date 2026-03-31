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

// PANEL LOGIC
const cards = document.querySelectorAll(".card");
const panel = document.getElementById("panel");
const title = document.getElementById("panel-title");
const body = document.getElementById("panel-body");
const closeBtn = document.getElementById("closeBtn");

// Content for each card
const content = {
    "About": "I am an AI + Electronics Engineer focused on building intelligent circuit systems combining machine learning and hardware design.",
    
    "Projects": "SpecForge AI: AI-powered analog circuit design system.\n\nFace Recognition Attendance System.\n\nMore coming soon...",
    
    "Education": "B.E Electronics and Communication Engineering\nAnna University",
    
    "Timeline": "2021 - Started Engineering\n2023 - Built AI Projects\n2025 - Final Year + SpecForge AI",
    
    "Goals": "Work in NVIDIA / Texas Instruments\nFocus on AI + Chip Design\nPursue research in advanced electronics",
    
    "Connect": "LinkedIn: (add your link)\nGitHub: (add your link)",
    
    "Message": "You can reach out to me via email or LinkedIn."
};

// Open panel
cards.forEach(card => {
    card.addEventListener("click", () => {
        const text = card.querySelector("h3").innerText;

        title.innerText = text;
        body.innerText = content[text];

        panel.classList.add("show");
    });
});

// Close panel
closeBtn.addEventListener("click", () => {
    panel.classList.remove("show");
    
});