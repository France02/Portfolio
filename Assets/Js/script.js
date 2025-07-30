document.addEventListener('DOMContentLoaded', () => {

    /* ============================== */
    /* Preloader                      */
    /* ============================== */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    /* ============================== */
    /* Theme Switcher                 */
    /* ============================== */
    const themeToggle = document.getElementById('theme-toggle');
    // Imposta il tema di default su 'dark' se non ce n'è uno salvato
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    const switchTheme = () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', switchTheme);
    }

    /* ============================== */
    /* Header Scroll Effect           */
    /* ============================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ============================== */
    /* Mobile Navigation              */
    /* ============================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.navbar__link, .footer__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    /* ============================== */
    /* Typewriter Effect              */
    /* ============================== */
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ["Full Stack Developer", "Problem Solver", "Creatore di Esperienze Digitali"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const currentChar = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);

            typewriterElement.textContent = currentChar;
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

            let typeSpeed = isDeleting ? 75 : 150;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    /* ============================== */
    /* Contact Form (EmailJS)         */
    /* ============================== */
    const contactForm = document.getElementById('contact-form');
    const messageResponse = document.getElementById('message-response');
    
    // Inizializza EmailJS con la tua Public Key
    (function(){
       emailjs.init("rlDCAvzJroPCeMvv1"); // SOSTITUISCI CON LA TUA PUBLIC KEY
    })();

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Invio in corso...';

            const serviceID = 'service_c346b4k'; // SOSTITUISCI CON IL TUO SERVICE ID
            const templateID = 'template_gewcvtg'; // SOSTITUISCI CON IL TUO TEMPLATE ID

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    showMessage('success', 'Messaggio inviato! Grazie per avermi contattato, ti risponderò al più presto.');
                    contactForm.reset();
                }, (err) => {
                    showMessage('error', `Si è verificato un errore. Riprova più tardi.`);
                    console.error('EmailJS Error:', JSON.stringify(err));
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Invia Messaggio';
                });
        });
    }

    function showMessage(type, message) {
        if (messageResponse) {
            messageResponse.className = `feedback-message ${type}`;
            messageResponse.textContent = message;
            setTimeout(() => {
                messageResponse.className = 'feedback-message';
                messageResponse.textContent = '';
            }, 7000);
        }
    }

    /* ============================== */
    /* Update Footer Year             */
    /* ============================== */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ============================== */
    /* ScrollReveal Animations        */
    /* ============================== */
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1500, // Durata ridotta per un effetto più rapido
        delay: 200,
        // reset: true // Attiva se vuoi che le animazioni si ripetano
    });

    // Animazioni in sequenza
    sr.reveal('.hero__title');
    sr.reveal('.hero__description', { delay: 400 });
    sr.reveal('.hero__actions', { delay: 600 });
    
    sr.reveal('.section-title');
    sr.reveal('.about__text', { origin: 'left' });
    sr.reveal('.about__image-container', { origin: 'right', delay: 400 });
    
    sr.reveal('.skills__content', { origin: 'left' });
    sr.reveal('.education__content', { origin: 'right', delay: 200 });

    sr.reveal('.work__grid .project-card', { interval: 150 });
    sr.reveal('.contact__container', { delay: 200 });
    sr.reveal('.footer__main', { delay: 200 });
    sr.reveal('.footer__bottom', { delay: 400 });
});
