document.addEventListener('DOMContentLoaded', () => {

    /* ============================== */
    /* Theme Switcher        */
    /* ============================== */
    const themeToggle = document.getElementById('theme-toggle');
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
    /* Header Scroll          */
    /* ============================== */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    /* ============================== */
    /* Mobile Navigation      */
    /* ============================== */
    const navToggle = document.querySelector('.navbar__toggle');
    const navMenu = document.querySelector('.navbar__menu');
    const navLinks = document.querySelectorAll('.navbar__link');

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
    /* Typewriter Effect         */
    /* ============================== */
    const subtitleElement = document.querySelector('.hero__subtitle');
    if (subtitleElement) {
        // This is a simplified version for demonstration.
        // A more complex typewriter could be implemented here.
        // For now, the blinking cursor gives a dynamic feel.
    }


    /* ============================== */
    /* Contact Form (EmailJS)    */
    /* ============================== */
    const contactForm = document.getElementById('contact-form');
    const messageResponse = document.getElementById('message-response');
    
    // Inizializza EmailJS con la tua Public Key
    (function(){
       emailjs.init("rlDCAvzJroPCeMvv1"); // Sostituisci con la tua Public Key
    })();

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Invio in corso...';

            // Parametri del servizio e template
            const serviceID = 'service_c346b4k'; // Sostituisci con il tuo Service ID
            const templateID = 'template_gewcvtg'; // Sostituisci con il tuo Template ID

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    showMessage('success', 'Messaggio inviato con successo! Ti risponderò al più presto.');
                    contactForm.reset();
                    // Resetta lo stato degli input/label
                    contactForm.querySelectorAll('input, textarea').forEach(input => {
                      // Non è necessario fare nulla, lo stile :valid si occuperà di tutto
                    });
                }, (err) => {
                    showMessage('error', `Si è verificato un errore. Riprova più tardi. Dettagli: ${JSON.stringify(err)}`);
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
            }, 6000);
        }
    }


    /* ============================== */
    /* Update Footer Year       */
    /* ============================== */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    /* ============================== */
    /* Intersection Observer for    */
    /* Scroll Animations         */
    /* ============================== */
    const animatedElements = document.querySelectorAll('.about, .work, .contact, .project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 1s ${entry.target.dataset.delay || '0s'} forwards ease-out`;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0'; // Hide element initially
        observer.observe(el);
    });

    // Add keyframes to a style tag in the head
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(styleSheet);

});
