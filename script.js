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
            
            // Store subscriber data locally
            storeSubscriber(name, email);
            
            // Show success message
            showSuccessMessage(name);
            
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

// Store subscriber data locally
function storeSubscriber(name, email) {
    // Get existing subscribers from localStorage
    let subscribers = [];
    const existingData = localStorage.getItem('aiKitSubscribers');
    if (existingData) {
        try {
            subscribers = JSON.parse(existingData);
        } catch (e) {
            console.error('Error parsing subscriber data:', e);
            subscribers = [];
        }
    }
    
    // Add new subscriber
    const newSubscriber = {
        name: name,
        email: email,
        date: new Date().toISOString(),
        timestamp: Date.now()
    };
    
    // Check if email already exists
    const existingIndex = subscribers.findIndex(sub => sub.email === email);
    if (existingIndex > -1) {
        // Update existing subscriber
        subscribers[existingIndex] = newSubscriber;
    } else {
        // Add new subscriber
        subscribers.push(newSubscriber);
    }
    
    // Save back to localStorage
    localStorage.setItem('aiKitSubscribers', JSON.stringify(subscribers));
    
    // Also send notification email data to console for debugging
    console.log('New AI Kit Subscriber:', newSubscriber);
    
    // Optional: Send to a webhook or service (you can add this later)
    // sendToWebhook(newSubscriber);
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
            padding: 25px;
            border-radius: 12px;
            margin: 20px 0;
            text-align: center;
            animation: slideIn 0.5s ease;
            box-shadow: 0 8px 30px rgba(46, 204, 113, 0.3);
        ">
            <h3 style="margin: 0 0 15px 0; font-size: 24px;">🎉 Welcome to the AI Revolution, ${name}!</h3>
            <p style="margin: 0 0 15px 0; font-size: 16px; opacity: 0.95;">
                You're all set! Your AI Starter Kit request has been received.<br>
                <strong>Check your email within the next few minutes</strong> for your complete toolkit.
            </p>
            <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; margin-top: 15px;">
                <p style="margin: 0; font-size: 14px;">
                    📧 Email sent to: <strong>${document.getElementById('email').value}</strong><br>
                    📅 ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
                </p>
            </div>
        </div>
    `;
    
    const form = document.getElementById('aiKitForm');
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        hideSuccessMessage();
    }, 10000);
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
