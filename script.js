// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('aiKitForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            
            // Validate inputs
            if (!name) {
                alert('Please enter your name');
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success message
            showSuccessMessage(name);
            
            // Send email via mailto
            const subject = 'New AI Kit Request from ' + name;
            const body = 'Name: ' + name + '%0D%0AEmail: ' + email + '%0D%0A%0D%0APlease send the AI Starter Kit to this email address.';
            const mailtoLink = 'mailto:powerofai4smasllbiz@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Clear form
            form.reset();
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

function showSuccessMessage(name) {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #2ECC71, #27ae60);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
            animation: slideIn 0.5s ease;
        ">
            <h3>🎉 Success, ${name}!</h3>
            <p>Your AI Starter Kit is on its way to your inbox.<br>
            Check your email in the next few minutes!</p>
        </div>
    `;
    
    const form = document.getElementById('aiKitForm');
    form.parentNode.insertBefore(successMessage, form.nextSibling);
}

function hideSuccessMessage() {
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }
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
