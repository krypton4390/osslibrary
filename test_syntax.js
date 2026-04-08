    const supabaseUrl = 'https://vmyzdpgcrzagyaowimng.supabase.co';
    const supabaseKey = 'sb_publishable_eBwucaUCu0Y29GvhRQfKoA_ZhqWxplS';
    let sbClient = null;
    try { 
        if (window.supabase) sbClient = window.supabase.createClient(supabaseUrl, supabaseKey); 
    } catch (e) { console.error('Supabase init skipped', e); }

    // ==================== DATA ====================
    let books = [
        { id:1, title:"The Great Gatsby", author:"F. Scott Fitzgerald", category:"Literature", cover:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400", description:"A classic novel of the Jazz Age." },
        { id:2, title:"Astrophysics for People in a Hurry", author:"Neil deGrasse Tyson", category:"Science", cover:"https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400", description:"The nature of space and time." },
        { id:3, title:"Atomic Habits", author:"James Clear", category:"Self-Help", cover:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400", description:"Tiny changes, remarkable results." },
        { id:4, title:"Brief History of Time", author:"Stephen Hawking", category:"Science", cover:"https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=400", description:"From big bang to black holes." },
        { id:5, title:"The Art of War", author:"Sun Tzu", category:"History", cover:"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400", description:"Ancient Chinese military strategy." },
        { id:6, title:"Physics of the Future", author:"Michio Kaku", category:"Science", cover:"https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400", description:"How science will shape human destiny." },
        { id:7, title:"To Kill a Mockingbird", author:"Harper Lee", category:"Literature", cover:"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400", description:"A story of race and justice in the American South." },
        { id:8, title:"The Alchemist", author:"Paulo Coelho", category:"Fiction", cover:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400", description:"Fable about following your dreams." }
    ];

    const dashboardContent = {
        admin:   { title:'Admin Dashboard',         menu:['System Stats','User Management','Book Inventory','Settings'],                       stats:[{label:'Total Books',value:'1,240'},{label:'Active Users',value:'450'},{label:'Issued Today',value:'12'}] },
        teacher: { title:'Teacher Portal',           menu:['My Classes','Student Progress','Reading Lists','Resource Requests'],                stats:[{label:'My Students',value:'85'},{label:'Due Books',value:'5'},{label:'New Requests',value:'2'}] },
        student: { title:'Student/Parent Dashboard', menu:['My Bookshelf','Reading History','Recommendations','Reserve Books'],                stats:[{label:'Borrowed',value:'3'},{label:'Past Due',value:'0'},{label:'History',value:'15'}] }
    };

    // Expose for dashboard.html
    window.pustakalayaData = { books, dashboardContent };

    // ==================== UI LOGIC ====================
    function renderBooks(list) {
        const grid = document.getElementById('bookGrid');
        if (!list || list.length === 0) {
            grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-secondary)"><h3>No books found.</h3><p>Try different keywords.</p></div>';
            return;
        }
        grid.innerHTML = list.map((b, i) => `
            <div class="book-card" style="animation:fadeInUp 0.5s ease-out ${i*0.1}s backwards">
                <div class="book-cover-container"><img src="${b.cover}" alt="${b.title}" class="book-cover" loading="lazy"></div>
                <div class="book-info">
                    <span class="book-category">${b.category}</span>
                    <h3 class="book-title">${b.title}</h3>
                    <p class="book-author">by ${b.author}</p>
                    <p style="font-size:.85rem;color:var(--text-secondary);margin-top:1rem;line-height:1.4">${b.description}</p>
                    <div style="margin-top:auto;padding-top:1.5rem">
                        <button class="btn-login" style="width:100%;padding:.5rem" onclick="requireLogin()">📖 Read Now</button>
                    </div>
                </div>
            </div>`).join('');
    }

    function requireLogin() {
        document.getElementById('modalOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    document.addEventListener('DOMContentLoaded', function() {
        try {
            // 1. Immediately render fallback books so the user sees something fast!
            renderBooks(books);
            
            // 2. Fetch live books from Supabase seamlessly in the background
            try {
                if (sbClient) {
                    sbClient.from('books').select('*').then(function(result) {
                        const data = result.data;
                        const error = result.error;
                        if (!error && data && data.length > 0) {
                            books = data;
                            window.pustakalayaData.books = books;
                            renderBooks(books); // Re-render with live data!
                        }
                    }).catch(function(err) {
                        console.error("Supabase fetch error:", err);
                    });
                }
            } catch(e) { console.error("Supabase sync sync error", e); }
        } catch (fatalErr) {
            console.error(fatalErr); 
            document.body.insertAdjacentHTML('afterbegin', '<div style="background:red;color:white;padding:10px;z-index:99999;position:fixed;top:0;left:0;">JS ERROR: ' + fatalErr.message + '</div>');
        }

        // Navbar scroll effect
        const navbar = document.querySelector('nav');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15,23,42,0.95)';
                navbar.style.height = '70px';
                navbar.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.2)';
            } else {
                navbar.style.background = 'rgba(15,23,42,0.8)';
                navbar.style.height = '80px';
                navbar.style.boxShadow = 'none';
            }
        });

        // Search
        document.getElementById('bookSearch').addEventListener('input', function(e) {
            const term = e.target.value.toLowerCase();
            renderBooks(books.filter(b =>
                b.title.toLowerCase().includes(term) ||
                b.author.toLowerCase().includes(term) ||
                b.category.toLowerCase().includes(term)
            ));
        });

        // Modal helpers
        var overlay = document.getElementById('modalOverlay');
        var loginError = document.getElementById('loginError');

        function openModal() {
            // Clear all fields every time modal opens
            document.getElementById('role').value = '';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            loginError.style.display = 'none';
            document.getElementById('signInBtn').textContent = 'Sign In';
            document.getElementById('signInBtn').disabled = false;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeModal() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        function showLoginError(msg) {
            loginError.textContent = msg;
            loginError.style.display = 'block';
        }

        document.getElementById('openLogin').addEventListener('click', openModal);
        document.getElementById('closeLogin').addEventListener('click', closeModal);
        overlay.addEventListener('click', function(e) { if (e.target === overlay) closeModal(); });
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal(); });

        // Clear error when user changes any field
        ['role','username','password'].forEach(function(id) {
            document.getElementById(id).addEventListener('input', function() { loginError.style.display = 'none'; });
            document.getElementById(id).addEventListener('change', function() { loginError.style.display = 'none'; });
        });

        // Credentials
        var CREDENTIALS = {
            admin:   { username: 'admin',   password: 'admin123' },
            teacher: { username: 'teacher', password: 'teach123' },
            student: { username: 'student', password: 'student123' }
        };

        document.getElementById('signInBtn').addEventListener('click', function(e) {
            e.preventDefault();
            var username = document.getElementById('username').value.trim();
            var password = document.getElementById('password').value.trim();
            var role     = document.getElementById('role').value;

            loginError.style.display = 'none';

            if (!role)     { showLoginError('⚠️ Please select a portal first.'); return; }
            if (!username) { showLoginError('⚠️ Please enter your username.');    return; }
            if (!password) { showLoginError('⚠️ Please enter your password.');    return; }

            var creds = CREDENTIALS[role];
            if (!creds || username !== creds.username || password !== creds.password) {
                showLoginError('❌ Incorrect username or password. Please try again.');
                document.getElementById('password').value = '';
                document.getElementById('password').focus();
                return;
            }

            localStorage.setItem('userSession', JSON.stringify({ username: username, role: role, loginTime: new Date().toISOString() }));
            var btn = document.getElementById('signInBtn');
            btn.textContent = '✓ Signing in…';
            btn.disabled = true;
            setTimeout(function() { window.location.href = 'dashboard.html'; }, 700);
        });
    });
    