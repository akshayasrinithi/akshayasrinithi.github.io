// JavaScript for the Semi-Circle Navigation Hover Effect
document.querySelectorAll('.semi-circle').forEach(circle => {
    circle.addEventListener('mouseenter', () => {
        circle.style.width = '150px';
        circle.style.transition = 'width 0.3s ease';
    });

    circle.addEventListener('mouseleave', () => {
        circle.style.width = '100px';
    });
});
