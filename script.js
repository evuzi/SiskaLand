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

// Анимация лёгкого параллакса для цифры "2"
const heroNumber = document.querySelector('.hero-background-number');
const heroSection = document.querySelector('.hero');

if (heroNumber && heroSection) {
  heroSection.addEventListener('mousemove', e => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const moveX = (x - rect.width / 2) / 30;
    heroNumber.style.transform = `translate(calc(-50% + ${moveX}px), 0)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    heroNumber.style.transform = 'translate(-50%, 0)';
  });
}

