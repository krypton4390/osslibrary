const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Literature",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
        description: "A classic novel of the Jazz Age."
    },
    {
        id: 2,
        title: "Astrophysics for People in a Hurry",
        author: "Neil deGrasse Tyson",
        category: "Science",
        cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400",
        description: "The nature of space and time."
    },
    {
        id: 3,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
        description: "Tiny changes, remarkable results."
    },
    {
        id: 4,
        title: "Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        cover: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=400",
        description: "From big bang to black holes."
    },
    {
        id: 5,
        title: "The Art of War",
        author: "Sun Tzu",
        category: "History",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
        description: "Ancient Chinese military strategy."
    },
    {
        id: 6,
        title: "Physics of the Future",
        author: "Michio Kaku",
        category: "Science",
        cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400",
        description: "How science will shape human destiny."
    },
    {
        id: 7,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Literature",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
        description: "A story of race and justice in the American South."
    },
    {
        id: 8,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
        description: "Fable about following your dreams."
    }
];

const roles = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student'
};

const dashboardContent = {
    [roles.ADMIN]: {
        title: 'Admin Dashboard',
        menu: ['System Stats', 'User Management', 'Book Inventory', 'Settings'],
        stats: [
            { label: 'Total Books', value: '1,240' },
            { label: 'Active Users', value: '450' },
            { label: 'Issued Today', value: '12' }
        ]
    },
    [roles.TEACHER]: {
        title: 'Teacher Portal',
        menu: ['My Classes', 'Student Progress', 'Reading Lists', 'Resource Requests'],
        stats: [
            { label: 'My Students', value: '85' },
            { label: 'Due Books', value: '5' },
            { label: 'New Requests', value: '2' }
        ]
    },
    [roles.STUDENT]: {
        title: 'Student/Parent Dashboard',
        menu: ['My Bookshelf', 'Reading History', 'Recommendations', 'Reserve Books'],
        stats: [
            { label: 'Borrowed', value: '3' },
            { label: 'Past Due', value: '0' },
            { label: 'History', value: '15' }
        ]
    }
};

// Expose to global scope for non-module scripts
window.pustakalayaData = {
    books,
    roles,
    dashboardContent
};
