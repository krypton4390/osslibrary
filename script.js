document.addEventListener('DOMContentLoaded', () => {
    // --- Safety check: ensure data is loaded ---
    if (!window.pustakalayaData) {
        console.error('OSS Pustakalaya: Data failed to load.');
        return;
    }

    const books = window.pustakalayaData.books;
    const bookGrid = document.getElementById('bookGrid');
    const searchInput = document.getElementById('bookSearch');
    const modalOverlay = document.getElementById('modalOverlay');
    const openLoginBtn = document.getElementById('openLogin');
    const closeLoginBtn = document.getElementById('closeLogin');
    const navbar = document.querySelector('nav');

    // --- Render Books ---
    renderBooks(books);
    handleNavbarScroll(navbar);
    initEventListeners(books, bookGrid, searchInput, modalOverlay, openLoginBtn, closeLoginBtn);
});

/**
 * Renders book cards into the grid.
 */
function renderBooks(booksToRender) {
    const bookGrid = document.getElementById('bookGrid');
    if (!booksToRender || booksToRender.length === 0) {
        bookGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-secondary);">
                <h3>No books found matching your search.</h3>
                <p>Try different keywords or categories.</p>
            </div>
        `;
        return;
    }

    bookGrid.innerHTML = booksToRender.map((book, index) => `
        <div class="book-card" style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s backwards;">
            <div class="book-cover-container">
                <img src="${book.cover}" alt="${book.title}" class="book-cover" loading="lazy">
            </div>
            <div class="book-info">
                <span class="book-category">${book.category}</span>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 1rem; line-height: 1.4;">
                    ${book.description}
                </p>
                <div style="margin-top: auto; padding-top: 1.5rem;">
                    <button class="btn-login" style="width: 100%; background: transparent; border: 1px solid var(--primary-color); color: var(--primary-color); padding: 0.5rem;">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Navbar shrinks on scroll.
 */
function handleNavbarScroll(navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.height = '70px';
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.height = '80px';
            navbar.style.boxShadow = 'none';
        }
    });
}

/**
 * Wires up all interactive event listeners.
 */
function initEventListeners(books, bookGrid, searchInput, modalOverlay, openLoginBtn, closeLoginBtn) {
    // Real-time search
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = books.filter(b =>
            b.title.toLowerCase().includes(term) ||
            b.author.toLowerCase().includes(term) ||
            b.category.toLowerCase().includes(term)
        );
        renderBooks(filtered);
    });

    // Open modal
    openLoginBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal via Cancel button
    closeLoginBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal via clicking backdrop
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal via ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Login form submission → redirect to dashboard
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const role = document.getElementById('role').value;

        if (!role) {
            alert('Please select a portal to login.');
            return;
        }
        if (!username) {
            alert('Please enter your username.');
            return;
        }

        localStorage.setItem('userSession', JSON.stringify({
            username: username,
            role: role,
            loginTime: new Date().toISOString()
        }));

        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Signing in...';
        submitBtn.disabled = true;

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 800);
    });
}
