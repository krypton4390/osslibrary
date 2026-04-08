
document.addEventListener('DOMContentLoaded', () => {
    // Safety check
    if (!window.pustakalayaData) {
        window.location.href = 'index.html';
        return;
    }
    const dashboardContent = window.pustakalayaData.dashboardContent;

    // 1. Session Validation
    const sessionData = localStorage.getItem('userSession');
    if (!sessionData) {
        window.location.href = 'index.html';
        return;
    }

    const { username, role } = JSON.parse(sessionData);
    const content = dashboardContent[role];

    if (!content) {
        alert('Invalid role session. Please login again.');
        window.location.href = 'index.html';
        return;
    }

    // 2. Update UI with User Info
    updateUserInfo(username, role, content);
    
    // 3. Render Sidebar Menu
    renderSidebar(content.menu);

    // 4. Render Stats
    renderStats(content.stats);

    // 5. Render Placeholder Content
    renderContentArea(role, content.title);

    // 6. Setup Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('userSession');
        window.location.href = 'index.html';
    });
});

/**
 * Updates the header and badges with user information.
 */
function updateUserInfo(username, role, content) {
    document.getElementById('welcomeTitle').textContent = `Welcome, ${username}!`;
    document.getElementById('userNameBadge').textContent = username;
    document.getElementById('userInitial').textContent = username.charAt(0).toUpperCase();
    
    const roleBadge = document.getElementById('roleBadge');
    roleBadge.textContent = role.toUpperCase();
    
    document.getElementById('dashboardSubtitle').textContent = `Accessing the ${content.title}`;
}

/**
 * Renders the sidebar menu items based on the role.
 */
function renderSidebar(menuItems) {
    const sidebarMenu = document.getElementById('sidebarMenu');
    sidebarMenu.innerHTML = menuItems.map((item, index) => `
        <div class="menu-item ${index === 0 ? 'active' : ''}">
            <span>${getMenuIcon(item)}</span> ${item}
        </div>
    `).join('');
}

/**
 * Returns a semi-relevant icon for menu items.
 */
function getMenuIcon(itemName) {
    const icons = {
        'Stats': '📊',
        'Management': '👥',
        'Inventory': '📚',
        'Settings': '⚙️',
        'Classes': '🏫',
        'Progress': '📈',
        'Lists': '📝',
        'Requests': '📩',
        'Bookshelf': '📖',
        'History': '🕒',
        'Recommendations': '🌟',
        'Reserve': '🔖'
    };
    
    for (const [key, icon] of Object.entries(icons)) {
        if (itemName.includes(key)) return icon;
    }
    return '🔹';
}

/**
 * Renders the stat cards.
 */
function renderStats(stats) {
    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = stats.map((stat, index) => `
        <div class="stat-card" style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s backwards;">
            <div class="stat-label">${stat.label}</div>
            <div class="stat-value">${stat.value}</div>
        </div>
    `).join('');
}

/**
 * Renders the main content area based on the role.
 */
function renderContentArea(role, title) {
    document.getElementById('contentTitle').textContent = `Recent Activity - ${title}`;
    const contentView = document.getElementById('contentView');
    
    let html = '';
    if (role === 'admin') {
        html = `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <p>System is running smoothly. No critical alerts.</p>
                <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px;">
                    <h4 style="color: var(--text-main); margin-bottom: 0.5rem;">Database Sync</h4>
                    <p style="font-size: 0.9rem;">Last synchronized: 2 hours ago</p>
                </div>
            </div>
        `;
    } else if (role === 'teacher') {
        html = `
            <p>You have 3 new book requests from Grade 10 students.</p>
            <button class="btn-login" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.8rem;">Review Requests</button>
        `;
    } else {
        html = `
            <p>You have 2 books due in the next 3 days.</p>
            <ul style="margin-top: 1rem; list-style: disc; padding-left: 1.5rem;">
                <li>The Great Gatsby - Due 09 April</li>
                <li>Atomic Habits - Due 11 April</li>
            </ul>
        `;
    }
    contentView.innerHTML = html;
}
