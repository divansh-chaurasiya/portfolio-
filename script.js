// -==========================================================================
// #PRELOADER
// -==========================================================================
const preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// -==========================================================================
// #MOBILE NAVIGATION
// -==========================================================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Toggle mobile menu
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));


// -==========================================================================
// #ACTIVE LINK ON SCROLL
// -==========================================================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});


// -==========================================================================
// #SCROLL ANIMATIONS
// -==========================================================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


// -==========================================================================
// #PROJECT FILTERING
// -==========================================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to the clicked button
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});


// -==========================================================================
// #BACK TO TOP BUTTON
// -==========================================================================
const backToTopBtn = document.getElementById('back-to-top-btn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// -==========================================================================
// #COOKIE BANNER
// -==========================================================================
const cookieBanner = document.getElementById('cookie-banner');
const cookieAcceptBtn = document.getElementById('cookie-accept-btn');

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('cookieAccepted')) {
        cookieBanner.classList.add('show');
    }
});

cookieAcceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    cookieBanner.classList.remove('show');
});


// -==========================================================================
// #TYPED.JS ANIMATION
// -==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const options = {
        strings: ['Computer Science Student', 'Web Developer', 'Tech Enthusiast'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
    };

    const typed = new Typed('#typed-text', options);
});


// -==========================================================================
// #CONTACT FORM VALIDATION
// -==========================================================================
const form = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name === '' || email === '' || message === '') {
        displayMessage('Please fill in all fields.', 'error');
        return;
    }

    if (!validateEmail(email)) {
        displayMessage('Please enter a valid email.', 'error');
        return;
    }

    // If validation passes, you can send the form data
    // For this example, we'll just show a success message
    displayMessage('Thank you for your message!', 'success');
    form.reset();
});

// Function to display form messages
function displayMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 3000);
}

// Function to validate email format
function validateEmail(email) {
    const re = /^(([^<>()[\\]\\.,;:\s@\"]+(\.[^<>()[\\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
