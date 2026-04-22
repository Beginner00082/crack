const matrix = document.getElementById('matrix');
const alert = document.getElementById('alert');
const troll = document.getElementById('troll');
const loadingBar = document.querySelector('.loading-bar');
const percent = document.getElementById('percent');
const beep = document.getElementById('beep');

// Matrix rain effect
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/アイウエオカキクケコサシスセソタチツテト';
const columns = Math.floor(window.innerWidth / 14);

function createMatrixLine() {
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.left = Math.random() * 100 + '%';
    line.style.top = '-20px';
    line.style.color = '#00ff00';
    line.style.textShadow = '0 0 5px #00ff00';
    line.textContent = chars[Math.floor(Math.random() * chars.length)];
    line.style.animation = `fall ${3 + Math.random() * 2}s linear`;
    matrix.appendChild(line);
    
    setTimeout(() => line.remove(), 5000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to { transform: translateY(${window.innerHeight + 20}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

setInterval(createMatrixLine, 50);

// Avvia beep audio
beep.volume = 0.1;
beep.play().catch(() => {}); // Alcuni browser bloccano autoplay

// Loading bar + timer
let progress = 0;
const interval = setInterval(() => {
    progress += 1;
    loadingBar.style.width = progress + '%';
    percent.textContent = progress + '%';
    
    if (progress >= 100) {
        clearInterval(interval);
    }
}, 100); // 100ms x 100 = 10 secondi

// Dopo 10 secondi mostra troll
setTimeout(() => {
    alert.style.display = 'none';
    troll.style.display = 'block';
    beep.pause();
    
    // Cambia sfondo matrix in verde
    matrix.style.opacity = '0.3';
}, 10000);
