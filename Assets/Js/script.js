// ANIMAZIONE "TYPWRITER" ROTANTE
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
            setTimeout(type, Math.random() * 150 + 50); // Velocità casuale per effetto naturale
        } else {
            isTyping = false;
            setTimeout(erase, 2000); // Attende 2 secondi prima di cancellare
        }
    }

    function erase() {
        if (titleElement.textContent.length > 0) {
            titleElement.textContent = titleElement.textContent.slice(0, -1);
            setTimeout(erase, 80); // Velocità di cancellazione più rapida
        } else {
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            isTyping = true;
            typeTitle(); // Ripete con il titolo successivo
        }
    }

    if (!isTyping) type(); // Evita sovrapposizioni
}

typeTitle(); // Avvia l'animazione

// GESTIONE FORM CONTATTO
const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("message");

const sendEmail = (e) => {
    e.preventDefault();
    contactMessage.textContent = ""; // Pulisce messaggi precedenti
    contactForm.querySelector('button').disabled = true; // Disabilita il bottone durante il submit

    emailjs.sendForm(
        "service_c346b4k", // ID del servizio EmailJS
        "template_gewcvtg", // ID del template
        contactForm, // Form HTML
        "rlDCAvzJroPCeMvv1" // Tuo ID utente EmailJS
    )
    .then(() => {
        contactMessage.textContent = "Messaggio inviato con successo ✅";
        setTimeout(() => {
            contactMessage.textContent = "";
        }, 5000);
        contactForm.reset();
        contactForm.querySelector('button').disabled = false;
    })
    .catch((error) => { // Gestione errori con dettagli
        contactMessage.textContent = `Errore: ${error.text}`;
        contactForm.querySelector('button').disabled = false;
    });
};

contactForm.addEventListener("submit", sendEmail);

// ANIMAZIONI AL SCORRIMENTO
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
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'center'
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

// ANIMAZIONI INTERSEZIONE (RIFATTORIZZATO)
function setupIntersectionObserver(target, options = defaultConfig) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Arresta l'osservazione dopo l'animazione
            }
        });
    }, { threshold: 0.3 });

    observer.observe(target);
}

// Applica l'animazione di ingresso alla sezione "About Me"
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about_me');
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(30px)';
    setupIntersectionObserver(aboutSection, { origin: 'bottom', distance: '50px' });

    // Animazione per le Skills
    const skills = document.querySelector('.skills');
    skills.style.opacity = '0';
    skills.style.transform = 'translateX(-50px)';
    setupIntersectionObserver(skills, { origin: 'right', distance: '50px' });
});

// ANIMAZIONE APERTURA SEZIONE HOME
document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.querySelector('#home');
    homeSection.style.opacity = '0';
    homeSection.style.transform = 'translateY(100px)';
    
    setTimeout(() => {
        homeSection.style.opacity = '1';
        homeSection.style.transform = 'translateY(0)';
    }, 500); // Animazione di avvio automatica
});

// Gestione Form Contatto
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Validazione base
    if (!name || !email || !message) {
        showMessage('error', 'Per favore, completa tutti i campi obbligatori.');
        return;
    }

    // Invia dati via EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_USER_ID')
        .then(() => {
            showMessage('success', 'Messaggio inviato con successo!');
            form.reset();
        })
        .catch(() => {
            showMessage('error', 'Errore nell\'invio. Riprova più tardi.');
        });
});

function showMessage(type, text) {
    const messageDiv = document.getElementById('message-response');
    messageDiv.textContent = text;
    messageDiv.className = `feedback-message ${type}`;
    setTimeout(() => {
        messageDiv.className = 'feedback-message';
        messageDiv.textContent = '';
    }, 5000);
}