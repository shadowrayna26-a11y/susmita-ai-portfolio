/* ============ SHARED JS — NAV, CHATBOT, MODAL, CANVAS ============ */

// Year
document.addEventListener('DOMContentLoaded', () => {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
}

// Case Study Modal
function openCaseStudy(title, desc) {
    const t = document.getElementById('modal-title');
    const d = document.getElementById('modal-desc');
    const m = document.getElementById('case-study-modal');
    if (t && d && m) {
        t.textContent = title;
        d.textContent = desc;
        m.classList.remove('hidden');
    }
}
function closeCaseStudy() {
    const m = document.getElementById('case-study-modal');
    if (m) m.classList.add('hidden');
}

// Contact Form
function handleFormSubmit(e) {
    e.preventDefault();
    const feedback = document.getElementById('form-feedback');
    if (feedback) {
        feedback.classList.remove('hidden');
        e.target.reset();
        setTimeout(() => feedback.classList.add('hidden'), 5000);
    }
}

// Chatbot
const knowledgeBase = {
    "who is susmita": "Susmita Kirttonia is an AI Engineer dedicated to exploring artificial intelligence, intelligent applications, and future system architectures through continuous learning and empirical experimentation.",
    "skills": "Susmita focuses on Artificial Intelligence, Intelligent Applications, AI Tools & Technologies, Empirical Prototyping, Algorithmic Logic, and Structured Problem Solving.",
    "tools": "Susmita utilizes ChatGPT (OpenAI), Microsoft Copilot, Grok AI, Meta AI, and Prompt Engineering strategies to develop and test intelligent workflows.",
    "education": "Susmita holds a Master's in Music (M.A., 2021-22) and B.A. Honours in Music (2017-18), alongside strong SSC/HSC qualifications and specialized coursework in digital software.",
    "projects": "Susmita works on research prototypes including the Neural Prompt Synthesizer and self-contained AI Portfolio Assistants."
};

function toggleChatbot() {
    const modal = document.getElementById('chatbot-modal');
    if (modal) modal.classList.toggle('hidden');
}
function askQuestion(q) {
    const input = document.getElementById('chat-input');
    if (input) { input.value = q; handleChatSubmit(new Event('submit')); }
}
function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    if (!input || !messages) return;
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'bg-fuchsia-900/40 p-2.5 rounded-2xl border border-fuchsia-500/20 text-gray-200 text-right ml-6';
    userMsg.textContent = input.value;
    messages.appendChild(userMsg);
    input.value = '';

    setTimeout(() => {
        let answer = "I don't have verified information about that yet. Please feel free to reach out directly through the contact terminal!";
        if (query.includes('who') || query.includes('susmita')) answer = knowledgeBase["who is susmita"];
        else if (query.includes('skill') || query.includes('expertise')) answer = knowledgeBase["skills"];
        else if (query.includes('tool')) answer = knowledgeBase["tools"];
        else if (query.includes('education') || query.includes('degree')) answer = knowledgeBase["education"];
        else if (query.includes('project')) answer = knowledgeBase["projects"];

        const botMsg = document.createElement('div');
        botMsg.className = 'bg-purple-950/60 p-2.5 rounded-2xl border border-purple-500/20 text-gray-200 mr-6';
        botMsg.textContent = answer;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
    }, 400);
}

// Neural Canvas
(function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, mouseX = 0, mouseY = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 70);
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width, y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? '#d946ef' : '#3b82f6'
        });
    }

    let step = 0;
    function draw() {
        ctx.clearRect(0, 0, width, height);
        step += 0.008;

        const waveLayers = [
            { color: 'rgba(217, 70, 239, 0.25)', amplitude: 45, frequency: 0.006, speed: step, yOffset: height * 0.5 },
            { color: 'rgba(168, 85, 247, 0.18)', amplitude: 60, frequency: 0.004, speed: step * 0.8, yOffset: height * 0.55 },
            { color: 'rgba(59, 130, 246, 0.15)', amplitude: 35, frequency: 0.008, speed: step * 1.2, yOffset: height * 0.45 }
        ];

        waveLayers.forEach(wave => {
            ctx.beginPath();
            ctx.strokeStyle = wave.color;
            ctx.lineWidth = 2.5;
            for (let x = 0; x < width; x += 10) {
                const dx = x - mouseX;
                const dy = wave.yOffset - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const mouseInfluence = dist < 200 ? (200 - dist) * 0.15 : 0;
                const y = wave.yOffset + Math.sin(x * wave.frequency + wave.speed) * wave.amplitude + Math.cos(x * 0.002 + wave.speed) * 20 - mouseInfluence;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
        });

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x, dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(217, 70, 239, ${0.12 * (1 - dist / 110)})`;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    window.addEventListener('load', draw);
})();
