// Admin Dashboard JavaScript

// Sample subscriber data
let subscribers = [
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        dateSubscribed: '2025-08-03T10:30:00Z',
        source: 'main-site',
        status: 'active'
    },
    {
        id: 2,
        name: 'Mike Chen',
        email: 'mike.chen@business.com',
        dateSubscribed: '2025-08-03T09:15:00Z',
        source: 'main-site',
        status: 'active'
    },
    {
        id: 3,
        name: 'Lisa Rodriguez',
        email: 'lisa.r@gmail.com',
        dateSubscribed: '2025-08-03T08:45:00Z',
        source: 'main-site',
        status: 'active'
    },
    {
        id: 4,
        name: 'James Wilson',
        email: 'j.wilson@company.com',
        dateSubscribed: '2025-08-02T16:20:00Z',
        source: 'social-media',
        status: 'active'
    },
    {
        id: 5,
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        dateSubscribed: '2025-08-02T14:10:00Z',
        source: 'referral',
        status: 'unsubscribed'
    },
    {
        id: 6,
        name: 'David Brown',
        email: 'david.b@business.net',
        dateSubscribed: '2025-08-02T11:30:00Z',
        source: 'main-site',
        status: 'active'
    },
    {
        id: 7,
        name: 'Jennifer Lee',
        email: 'jennifer.lee@gmail.com',
        dateSubscribed: '2025-08-01T15:45:00Z',
        source: 'main-site',
        status: 'active'
    },
    {
        id: 8,
        name: 'Robert Taylor',
        email: 'rob.taylor@company.org',
        dateSubscribed: '2025-08-01T13:20:00Z',
        source: 'social-media',
        status: 'active'
    }
];

// Current page and filters
let currentPage = 1;
const itemsPerPage = 5;
let filteredSubscribers = [...subscribers];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    updateStats();
    populateSubscribersTable();
    initializeEventListeners();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.admin-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href.includes('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                // Update active nav
                navLinks.forEach(nl => nl.classList.remove('active'));
                this.classList.add('active');
                
                // Show target section
                sections.forEach(section => section.classList.remove('active'));
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            }
        });
    });
}

// Update dashboard stats
function updateStats() {
    const totalSubs = subscribers.length;
    const activeSubs = subscribers.filter(s => s.status === 'active').length;
    const todaySubs = subscribers.filter(s => {
        const today = new Date().toDateString();
        const subDate = new Date(s.dateSubscribed).toDateString();
        return today === subDate;
    }).length;
    
    document.getElementById('totalSubscribers').textContent = totalSubs.toLocaleString();
    document.getElementById('newToday').textContent = todaySubs;
    
    // Simulate conversion rate and open rate
    document.getElementById('conversionRate').textContent = '8.4%';
    document.getElementById('openRate').textContent = '34.7%';
}

// Populate subscribers table
function populateSubscribersTable() {
    const tbody = document.getElementById('subscribersTableBody');
    if (!tbody) return;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageSubscribers = filteredSubscribers.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    pageSubscribers.forEach(subscriber => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <input type="checkbox" value="${subscriber.id}">
            </td>
            <td>${subscriber.name}</td>
            <td>${subscriber.email}</td>
            <td>${formatDate(subscriber.dateSubscribed)}</td>
            <td>
                <span class="source-badge source-${subscriber.source}">
                    ${formatSource(subscriber.source)}
                </span>
            </td>
            <td>
                <span class="status-badge status-${subscriber.status}">
                    ${subscriber.status.charAt(0).toUpperCase() + subscriber.status.slice(1)}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="editSubscriber(${subscriber.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteSubscriber(${subscriber.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    updatePagination();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Format source
function formatSource(source) {
    const sources = {
        'main-site': 'Main Site',
        'social-media': 'Social Media',
        'referral': 'Referral',
        'manual': 'Manual'
    };
    return sources[source] || source;
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
    const pageInfo = document.querySelector('.page-info');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchSubscribers');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterSubscribers();
        });
    }
    
    // Filter dropdowns
    const sourceFilter = document.getElementById('filterSource');
    const dateFilter = document.getElementById('filterDate');
    
    if (sourceFilter) {
        sourceFilter.addEventListener('change', filterSubscribers);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', filterSubscribers);
    }
    
    // Pagination
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                populateSubscribersTable();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                populateSubscribersTable();
            }
        });
    }
    
    // Select all checkbox
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
            checkboxes.forEach(cb => cb.checked = this.checked);
        });
    }
    
    // Add subscriber form
    const addSubscriberForm = document.getElementById('addSubscriberForm');
    if (addSubscriberForm) {
        addSubscriberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitNewSubscriber();
        });
    }
    
    // Modal close functionality
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // Settings forms
    const settingsForms = document.querySelectorAll('.settings-form');
    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings(this);
        });
    });
}

// Filter subscribers
function filterSubscribers() {
    const searchTerm = document.getElementById('searchSubscribers')?.value.toLowerCase() || '';
    const sourceFilter = document.getElementById('filterSource')?.value || '';
    const dateFilter = document.getElementById('filterDate')?.value || '';
    
    filteredSubscribers = subscribers.filter(subscriber => {
        const matchesSearch = subscriber.name.toLowerCase().includes(searchTerm) || 
                            subscriber.email.toLowerCase().includes(searchTerm);
        const matchesSource = !sourceFilter || subscriber.source === sourceFilter;
        const matchesDate = !dateFilter || checkDateFilter(subscriber.dateSubscribed, dateFilter);
        
        return matchesSearch && matchesSource && matchesDate;
    });
    
    currentPage = 1;
    populateSubscribersTable();
}

// Check date filter
function checkDateFilter(dateString, filter) {
    const date = new Date(dateString);
    const now = new Date();
    
    switch (filter) {
        case 'today':
            return date.toDateString() === now.toDateString();
        case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return date >= weekAgo;
        case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return date >= monthAgo;
        default:
            return true;
    }
}

// Add subscriber functionality
function addSubscriber() {
    const modal = document.getElementById('addSubscriberModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('addSubscriberModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function submitNewSubscriber() {
    const name = document.getElementById('subscriberName').value;
    const email = document.getElementById('subscriberEmail').value;
    const source = document.getElementById('subscriberSource').value;
    
    if (name && email) {
        const newSubscriber = {
            id: Math.max(...subscribers.map(s => s.id)) + 1,
            name: name,
            email: email,
            dateSubscribed: new Date().toISOString(),
            source: source,
            status: 'active'
        };
        
        subscribers.unshift(newSubscriber);
        filterSubscribers();
        updateStats();
        closeModal();
        
        // Reset form
        document.getElementById('addSubscriberForm').reset();
        
        showNotification('Subscriber added successfully!', 'success');
    }
}

// Edit subscriber
function editSubscriber(id) {
    const subscriber = subscribers.find(s => s.id === id);
    if (subscriber) {
        // For demo purposes, just show an alert
        // In a real implementation, you'd open an edit modal
        alert(`Edit functionality for ${subscriber.name} would be implemented here.`);
    }
}

// Delete subscriber
function deleteSubscriber(id) {
    if (confirm('Are you sure you want to delete this subscriber?')) {
        subscribers = subscribers.filter(s => s.id !== id);
        filterSubscribers();
        updateStats();
        showNotification('Subscriber deleted successfully!', 'success');
    }
}

// Export functionality
function exportSubscribers() {
    const csvContent = generateCSV(filteredSubscribers);
    downloadCSV(csvContent, 'subscribers.csv');
    showNotification('Subscribers exported successfully!', 'success');
}

function exportAllData() {
    const csvContent = generateCSV(subscribers);
    downloadCSV(csvContent, 'all_subscribers.csv');
    showNotification('All data exported successfully!', 'success');
}

function generateCSV(data) {
    const headers = ['Name', 'Email', 'Date Subscribed', 'Source', 'Status'];
    const csvRows = [headers.join(',')];
    
    data.forEach(subscriber => {
        const row = [
            subscriber.name,
            subscriber.email,
            formatDate(subscriber.dateSubscribed),
            formatSource(subscriber.source),
            subscriber.status
        ];
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Data management
function clearOldData() {
    if (confirm('Are you sure you want to delete subscribers older than 90 days?')) {
        const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        const originalCount = subscribers.length;
        subscribers = subscribers.filter(s => new Date(s.dateSubscribed) > ninetyDaysAgo);
        const deletedCount = originalCount - subscribers.length;
        
        filterSubscribers();
        updateStats();
        showNotification(`${deletedCount} old subscribers removed.`, 'success');
    }
}

function resetAllData() {
    if (confirm('Are you sure you want to reset ALL data? This cannot be undone!')) {
        if (confirm('This will delete ALL subscribers permanently. Are you absolutely sure?')) {
            subscribers = [];
            filterSubscribers();
            updateStats();
            showNotification('All data has been reset.', 'warning');
        }
    }
}

// Settings
function saveSettings(form) {
    // In a real implementation, you would send this data to your backend
    const formData = new FormData(form);
    
    // Simulate saving
    setTimeout(() => {
        showNotification('Settings saved successfully!', 'success');
    }, 500);
}

// Notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 1001;
                animation: slideIn 0.3s ease;
            }
            .notification-success { background: #28a745; }
            .notification-warning { background: #ffc107; color: #212529; }
            .notification-info { background: #17a2b8; }
            .notification button {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: auto;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Initialize real-time updates (simulate)
setInterval(() => {
    // Simulate new subscribers occasionally
    if (Math.random() < 0.1) { // 10% chance every 10 seconds
        const newSubscriber = {
            id: Math.max(...subscribers.map(s => s.id)) + 1,
            name: `New Subscriber ${Math.floor(Math.random() * 1000)}`,
            email: `user${Math.floor(Math.random() * 1000)}@example.com`,
            dateSubscribed: new Date().toISOString(),
            source: 'main-site',
            status: 'active'
        };
        
        subscribers.unshift(newSubscriber);
        
        // Update if on dashboard or subscribers page
        const activeSection = document.querySelector('.admin-section.active');
        if (activeSection && (activeSection.id === 'dashboard' || activeSection.id === 'subscribers')) {
            updateStats();
            if (activeSection.id === 'subscribers') {
                filterSubscribers();
            }
        }
    }
}, 10000); // Check every 10 seconds
