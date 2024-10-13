// Skills Chart using Chart.js
const ctx = document.getElementById('skillsChart').getContext('2d');
const skillsChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Python', 'JavaScript', 'AWS', 'AI', 'IoT'],
        datasets: [{
            label: 'Skill Level',
            data: [85, 90, 75, 95, 80],
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            borderColor: 'rgba(0, 255, 0, 1)'
        }]
    }
});
