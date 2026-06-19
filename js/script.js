// ==========================================
// SCROLL REVEAL (Animações ao rolar)
// ==========================================
function revelarAoRolar() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;
        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('ativo');
        }
    });
}

window.addEventListener('scroll', revelarAoRolar);
window.addEventListener('load', revelarAoRolar);

// ==========================================
// NAVBAR SHRINK (Encolhe ao rolar)
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
// 1. ROLAGEM SUAVE (Menu e Botões)
// ==========================================
const menuLinks = document.querySelectorAll('.nav-links a, .logo-link, a.btn[href^="#"]');

menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});



// ==========================================
// MENU HAMBURGUER (MOBILE DRAWER)
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

// Fecha o drawer ao clicar em qualquer link dentro dele
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        fecharMenu();
    });
});

// Fecha ao clicar fora do drawer (no fundo escuro)
document.addEventListener('click', function(e) {
    if (!navLinksContainer.classList.contains('ativo')) return;
    if (!navLinksContainer.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
        fecharMenu();
    }
});

// ==========================================
// ACTIVE SECTION TRACKING (Scroll)
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
// ACTIVE NAV INDICATOR (sliding pill)
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
// 3. MÁSCARA DO TELEFONE (Formatação automática)
// ==========================================
document.getElementById('telefone').addEventListener('input', function (e) {
    // Remove tudo que não é número
    let numero = e.target.value.replace(/\D/g, '');
    
    // Aplica a formatação de acordo com a quantidade de números digitados
    let formatado = numero.replace(/^(\d{2})(\d)/g, '($1) $2');
    formatado = formatado.replace(/(\d)(\d{4})$/, '$1-$2');
    
    // Devolve o valor formatado para o campo
    e.target.value = formatado;
});

// ==========================================
// 4. WHATSAPP FORMULÁRIO CONTATO
// ==========================================
document.getElementById("form-contato").addEventListener("submit", function(e) {
    // Impede a página de recarregar
    e.preventDefault();

    // Pega os valores digitados
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value; 
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;

    const numeroZap = "5519989632127"; // Seu número configurado

    // Monta o texto para o WhatsApp
    const texto = 
`Olá! Me chamo ${nome}.

*=== DETALHES DO CONTATO ===*
E-mail: ${email}
Telefone: ${telefone}
Assunto: ${assunto}

*=== MENSAGEM ===*
${mensagem}`;

    // Converte o texto para formato de link
    const msgFormatada = encodeURIComponent(texto);

    // Cria o link e abre uma nova aba no navegador
    const url = `https://wa.me/${numeroZap}?text=${msgFormatada}`;
    window.open(url, "_blank");
});






// ==========================================
// PARTÍCULAS DE FUNDO
// ==========================================
function criarParticulas() {
    const container = document.querySelector('.site-particles');
    if (!container) return;
    const qtd = window.innerWidth < 768 ? 25 : 45;
    for (let i = 0; i < qtd; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = 2 + Math.random() * 5;
        p.style.left = Math.random() * 100 + '%';
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.animationDuration = (6 + Math.random() * 10) + 's';
        p.style.animationDelay = (Math.random() * 3) + 's';
        p.style.opacity = 0.3 + Math.random() * 0.5;
        container.appendChild(p);
    }
}

// ==========================================
// EQUALIZER BARS
// ==========================================
function criarEqualizer() {
    const container = document.querySelector('.hero-equalizer');
    if (!container) return;
    const qtd = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < qtd; i++) {
        const bar = document.createElement('div');
        bar.className = 'eq-bar';
        bar.style.animationDuration = (0.8 + Math.random() * 1.5) + 's';
        bar.style.animationDelay = (Math.random() * 3) + 's';
        container.appendChild(bar);
    }
}

criarParticulas();
criarEqualizer();