// --- Частицы с градиентом ---
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gradientColors = ['#4b0082','#8a2be2','#6a0dad','#000000','#9400d3'];
const particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = (Math.random() - 0.5) * 1.2;
        this.color = gradientColors[Math.floor(Math.random() * gradientColors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() { 
    particlesArray.length = 0;
    for(let i=0;i<120;i++) particlesArray.push(new Particle()); 
}
function animateParticles() { 
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    particlesArray.forEach(p=>{p.update();p.draw();});
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// --- Анимация при скролле ---
const sections = document.querySelectorAll('section, .hero h1, .hero p, .btn, .server-ip');
function checkVisibility() {
    sections.forEach(section=>{
        const rect = section.getBoundingClientRect();
        if(rect.top < window.innerHeight - 100) section.classList.add('visible');
    });
}
window.addEventListener('load', ()=>{ sections.forEach(el=>el.classList.add('visible')); checkVisibility(); });
window.addEventListener('scroll', checkVisibility);

// --- Плавное движение и пульсация ---
const heroElements = document.querySelectorAll('.hero h1, .hero p, .btn, .server-ip');
let floatAngle = 0;
function floatHero() {
    floatAngle += 0.02;
    heroElements.forEach((el,i)=>{
        const floatY = Math.sin(floatAngle+i)*5;
        const pulse = 1 + Math.sin(floatAngle*1.5+i)*0.03;
        el.style.transform = `translateY(${floatY}px) scale(${pulse})`;
    });
    requestAnimationFrame(floatHero);
}
floatHero();
