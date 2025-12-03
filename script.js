// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Newsletter Form =====
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(newsletterForm);
    const firstName = newsletterForm.querySelector('input[type="text"]').value;
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Simulate form submission
    const submitBtn = newsletterForm.querySelector('button');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = '✓ Subscribed!';
        newsletterForm.reset();
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
    
    // In production, you would send this to your email service
    console.log('Newsletter signup:', { firstName, email });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .chapter-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Counter Animation for Stats =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const text = statNumber.textContent;
            
            // Extract number from text
            const match = text.match(/[\d,]+/);
            if (match) {
                const number = parseInt(match[0].replace(/,/g, ''));
                const prefix = text.substring(0, text.indexOf(match[0]));
                const suffix = text.substring(text.indexOf(match[0]) + match[0].length);
                
                animateCounter({
                    set textContent(val) {
                        statNumber.textContent = prefix + val + suffix;
                    }
                }, number, 1500);
            }
            
            statsObserver.unobserve(statNumber);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number, .credential-number, .stat-value').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== Book 3D Tilt Effect =====
const bookCover = document.querySelector('.book-cover');

if (bookCover) {
    bookCover.addEventListener('mousemove', (e) => {
        const rect = bookCover.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = -(x - centerX) / 20 - 25;
        
        bookCover.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    bookCover.addEventListener('mouseleave', () => {
        bookCover.style.transform = 'rotateY(-25deg)';
    });
}

// ===== Pricing Card Hover Effect =====
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        document.querySelectorAll('.pricing-card').forEach(c => {
            if (c !== card && !c.classList.contains('popular')) {
                c.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ===== Testimonial Auto-Scroll (Optional) =====
// Uncomment below if you want testimonials to auto-scroll on mobile

/*
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showNextTestimonial() {
    if (window.innerWidth <= 768) {
        testimonials.forEach((t, i) => {
            t.style.display = i === testimonialIndex ? 'block' : 'none';
        });
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    } else {
        testimonials.forEach(t => t.style.display = 'block');
    }
}

setInterval(showNextTestimonial, 5000);
window.addEventListener('resize', () => {
    testimonials.forEach(t => t.style.display = 'block');
});
*/

// ===== Copy Discount Code (if applicable) =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Discount code copied!');
    });
}

// ===== Loading State =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Console Easter Egg =====
console.log('%c📚 Thanks for checking out the code!', 'font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ for book lovers everywhere.', 'font-size: 14px;');
