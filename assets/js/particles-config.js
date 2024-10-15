particlesJS("particles-js", {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#36C5F0", "#2EB67D", "#ECB22E", "#E01E5B"], // Customizable colors
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#fff",
        },
      },
      opacity: {
        value: 1,
      },
      size: {
        value: 6,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#808080",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 4,
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
      },
    },
    retina_detect: true,
  });
  