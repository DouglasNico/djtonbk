// ==========================================
// SCROLL REVEAL
// ==========================================
function revelarAoRolar() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add('ativo');
        }
    });
}

window.addEventListener('scroll', revelarAoRolar);
window.addEventListener('load', revelarAoRolar);

// ==========================================
// NAVBAR SHRINK
// ==========================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// ROLAGEM SUAVE
// ==========================================
const menuLinks = document.querySelectorAll('.nav-links a, .logo-link, a.btn[href^="#"]');

menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const target = document.querySelector(targetId);
        if (target) {
            let scrollEl;
            if (targetId === '#sobre') {
                scrollEl = target.querySelector('.sobre-container, h2') || target;
            } else {
                scrollEl = target.querySelector('.container-titulo, h2') || target;
            }
            const revealed = target.querySelector('.reveal.ativo');
            const navH = document.querySelector('.navbar').offsetHeight;
            const extra = revealed ? 10 : 50;
            const top = scrollEl.getBoundingClientRect().top + window.scrollY - navH - extra;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ==========================================
// MENU HAMBURGUER
// ==========================================
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

function fecharMenu() {
    menuToggle.classList.remove('ativo');
    navLinksContainer.classList.remove('ativo');
    document.body.style.overflow = '';
}

function abrirMenu() {
    menuToggle.classList.add('ativo');
    navLinksContainer.classList.add('ativo');
    document.body.style.overflow = 'hidden';
}

menuToggle.addEventListener('click', function() {
    if (navLinksContainer.classList.contains('ativo')) {
        fecharMenu();
    } else {
        abrirMenu();
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => fecharMenu());
});

document.addEventListener('click', function(e) {
    if (!navLinksContainer.classList.contains('ativo')) return;
    if (!navLinksContainer.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
        fecharMenu();
    }
});

// ==========================================
// ACTIVE SECTION TRACKING
// ==========================================
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function atualizarActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
            current = section.getAttribute('id');
        }
    });
    navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) {
            a.classList.add('active');
        }
    });
    atualizarIndicador();
}

window.addEventListener('scroll', atualizarActiveLink);
window.addEventListener('load', atualizarActiveLink);

// ==========================================
// ACTIVE NAV INDICATOR
// ==========================================
const navIndicator = document.createElement('div');
navIndicator.className = 'nav-indicator';
navLinksContainer?.appendChild(navIndicator);

function atualizarIndicador() {
    const activeLink = document.querySelector('.nav-links a.active');
    if (!activeLink || window.innerWidth <= 768) {
        navIndicator.style.opacity = '0';
        return;
    }
    const navRect = navLinksContainer.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    navIndicator.style.left = (linkRect.left - navRect.left - 10) + 'px';
    navIndicator.style.top = (linkRect.top - navRect.top - 8) + 'px';
    navIndicator.style.width = (linkRect.width + 20) + 'px';
    navIndicator.style.height = (linkRect.height + 16) + 'px';
    navIndicator.style.opacity = '1';
}

window.addEventListener('resize', atualizarIndicador);

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
const scrollProgress = document.querySelector('.scroll-progress');
function atualizarScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = progress + '%';
}
window.addEventListener('scroll', atualizarScrollProgress);
window.addEventListener('resize', atualizarScrollProgress);
window.addEventListener('load', atualizarScrollProgress);

// ==========================================
// MASCARA TELEFONE
// ==========================================
document.getElementById('telefone').addEventListener('input', function (e) {
    let numero = e.target.value.replace(/\D/g, '');
    let formatado = numero.replace(/^(\d{2})(\d)/g, '($1) $2');
    formatado = formatado.replace(/(\d)(\d{4})$/, '$1-$2');
    e.target.value = formatado;
});

// ==========================================
// WHATSAPP FORMULARIO
// ==========================================
document.getElementById("form-contato").addEventListener("submit", function(e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;
    const numeroZap = "5519989632127";
    const texto = `Ola! Me chamo ${nome}.\n\n*=== DETALHES DO CONTATO ===*\nE-mail: ${email}\nTelefone: ${telefone}\nAssunto: ${assunto}\n\n*=== MENSAGEM ===*\n${mensagem}`;
    const msgFormatada = encodeURIComponent(texto);
    const url = `https://wa.me/${numeroZap}?text=${msgFormatada}`;
    window.open(url, "_blank");
});

// ==========================================
// CANVAS PARTICLES POR SECTION
// ==========================================
function initSectionParticles(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    class Dot {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.15;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00cec9';
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function init() {
        particles = [];
        const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
        for (let i = 0; i < count; i++) particles.push(new Dot());
    }

    function connect() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#00cec9';
                    ctx.globalAlpha = 0.08 * (1 - dist / 140);
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connect();
        requestAnimationFrame(animate);
    }

    resize();
    init();
    animate();
}

document.querySelectorAll('.section-canvas').forEach(canvas => {
    initSectionParticles(canvas);
});

// ==========================================
// COUNTER ANIMATION
// ==========================================
(function() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        function step() {
            current += increment;
            if (current < target) {
                el.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        }
        step();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
})();