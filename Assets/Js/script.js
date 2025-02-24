const text = "FRONT-END DEVELOPER";
const typewriter = document.getElementById("typewriter");
let i = 0;

function typeEffect() {
    if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 100); 
    } else {
        setTimeout(() => {
            i = 0;
            typewriter.textContent = ""; 
            typeEffect(); 
        }, 4000); 
    }
}

typeEffect();

const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("message")

const sendEmail = (e) =>{
    e.preventDefault()

    emailjs.sendForm("service_c346b4k", "template_gewcvtg", "#contact-form", "rlDCAvzJroPCeMvv1")

    .then(() =>{
         contactMessage.textContent = "Massage sent successfully ✅";

         setTimeout(() =>{
            contactMessage.textContent = "";
         }, 5000)

         contactForm.reset()
    }), () =>{
        contactMessage.textContent = "Message not sent (service Error) ❌"
    }
}
contactForm.addEventListener("submit", sendEmail)

// SCROLL ANIMATION
const defaultConfig = {
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 300,
    reset: true
};

const sr = ScrollReveal(defaultConfig);

sr.reveal("#home, .contact_form");
sr.reveal(".about_me", { origin: "left"});
sr.reveal(".project-card", { interval: 100});

// SMOOTH
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// SCROLL BUTTONS HOME

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
