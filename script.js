// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('aiKitForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            
            // Validate inputs
            if (!name) {
                e.preventDefault();
                alert('Please enter your name');
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return;
            }
            
            // Set the reply-to field to the user's email
            document.getElementById('_replyto').value = email;
            
            // Update subject line with the person's name
            const subjectField = document.querySelector('input[name="_subject"]');
            if (subjectField) {
                subjectField.value = `New AI Kit Request from ${name}`;
            }
            
            // Form will submit to Formspree and send email directly to powerofai4smallbiz@gmail.com
        });
    }
    
    // Smooth scrolling for CTA buttons
    const ctaButtons = document.querySelectorAll('a[href="#form"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('form');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Hero section should be visible immediately
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .feature-item {
        transition: all 0.3s ease;
    }
    
    .feature-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .testimonial {
        transition: all 0.3s ease;
    }
    
    .testimonial:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    }
`;
document.head.appendChild(style);
