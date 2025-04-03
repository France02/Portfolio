document.addEventListener('DOMContentLoaded', () => {
    typeTitle(); // Avvia l'animazione al caricamento
});

// Funzione Typewriter
const titles = ["Frontend Developer", "UI/UX Designer", "Creative Problem Solver"];
let currentTitleIndex = 0;
const titleElement = document.querySelector('.title');
let isTyping = true;

function typeTitle() {
    const currentTitle = titles[currentTitleIndex];
    let i = 0;

    function type() {
        if (i < currentTitle.length) {
            titleElement.textContent += currentTitle.charAt(i);
            i++;
            setTimeout(type, Math.random() * 150 + 50);
        } else {
            isTyping = false;
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (titleElement.textContent.length > 0) {
            titleElement.textContent = titleElement.textContent.slice(0, -1);
            setTimeout(erase, 80);
        } else {
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            isTyping = true;
            typeTitle();
        }
    }

    if (!isTyping) type();
}

// GESTIONE FORM CONTATTO
const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("message-response"); // Corretto selettore

const sendEmail = (e) => {
    e.preventDefault();
    contactMessage.textContent = "";
    contactForm.querySelector('button').disabled = true;

    emailjs.sendForm(
        "service_c346b4k", // ID del servizio EmailJS
        "template_gewcvtg", // ID del template
        contactForm, // Form HTML
        "rlDCAvzJroPCeMvv1" // Tuo ID utente EmailJS
    )
    .then(() => {
        showMessage('success', 'Messaggio inviato con successo ✅');
        contactForm.reset();
        contactForm.querySelector('button').disabled = false;
    })
    .catch((error) => {
        showMessage('error', `Errore: ${error.text}`);
        contactForm.querySelector('button').disabled = false;
    });
};

contactForm.addEventListener("submit", sendEmail);

// ANIMAZIONI SCORRIMENTO
const defaultConfig = {
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 300,
    reset: true
};

const sr = ScrollReveal(defaultConfig);

sr.reveal("#home", defaultConfig);
sr.reveal(".contact_form", defaultConfig);
sr.reveal(".about_me", { origin: "left", distance: "80px" });
sr.reveal(".project-card", { interval: 100, origin: "bottom" });

// SCROLL SMOOTH
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
    });
});

// FUNZIONE PER SCORRERE ALLE SEZIONI
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }
}

// ANIMAZIONI INTERSEZIONE
function setupIntersectionObserver(target, options = defaultConfig) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Arresta l'osservazione
            }
        });
    }, { threshold: 0.3 });

    observer.observe(target);
}

// Animazioni per About Me e Skills
document.addEventListener('DOMContentLoaded', () => {
    // Section About Me
    const aboutSection = document.querySelector('.about_me');
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(30px)';
    setupIntersectionObserver(aboutSection, {
        origin: 'bottom',
        distance: '50px'
    });

    // Section Skills
    const skills = document.querySelector('.skills');
    skills.style.opacity = '0';
    skills.style.transform = 'translateX(-50px)';
    setupIntersectionObserver(skills, {
        origin: 'right',
        distance: '50px'
    });

    // Animazione avvio sezione Home
    const homeSection = document.querySelector('#home');
    homeSection.style.opacity = '0';
    homeSection.style.transform = 'translateY(100px)';
    
    setTimeout(() => {
        homeSection.style.opacity = '1';
        homeSection.style.transform = 'translateY(0)';
    }, 500);
});

// Funzione messaggi form
function showMessage(type, text) {
    const messageDiv = document.getElementById('message-response');
    messageDiv.textContent = text;
    messageDiv.className = `feedback-message ${type}`;
    setTimeout(() => {
        messageDiv.className = 'feedback-message';
        messageDiv.textContent = '';
    }, 5000);
}