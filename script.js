    
        // Sample Book Data
        const books = [
            {
                id: 1,
                title: "Cosmos",
                author: "Carl Sagan",
                cover: "https://m.media-amazon.com/images/I/91B1a+nvBFL._SY425_.jpg",
                desc: "The story of cosmic evolution, science, and civilization, tracing the origins of matter, life, and consciousness.",
                category: "cosmology",
                rating: "★★★★★"
            },
            {
                id: 2,
                title: "Astrophysics for People in a Hurry",
                author: "Neil deGrasse Tyson",
                cover: "https://m.media-amazon.com/images/I/71pX8TIWpEL._SY425_.jpg",
                desc: "The essential universe, from our most celebrated and beloved astrophysicist.",
                category: "astrophysics",
                rating: "★★★★☆"
            },
            {
                id: 3,
                title: "A Brief History of Time",
                author: "Stephen Hawking",
                cover: "https://m.media-amazon.com/images/I/71+8M9HMWTL._SY425_.jpg",
                desc: "From the Big Bang to black holes, this book explores the nature of time and the universe.",
                category: "cosmology",
                rating: "★★★★★"
            },
            {
                id: 4,
                title: "The Martian",
                author: "Andy Weir",
                cover: "https://m.media-amazon.com/images/I/91aB+3f0GwL._SY425_.jpg",
                desc: "An astronaut becomes stranded on Mars and must find a way to survive with limited supplies.",
                category: "fiction",
                rating: "★★★★☆"
            },
            {
                id: 5,
                title: "Pale Blue Dot",
                author: "Carl Sagan",
                cover: "https://m.media-amazon.com/images/I/81+Q+QYqqWL._SY425_.jpg",
                desc: "A vision of the human future in space and our place in the universe.",
                category: "cosmology",
                rating: "★★★★★"
            },
            {
                id: 6,
                title: "Hidden Figures",
                author: "Margot Lee Shetterly",
                cover: "https://m.media-amazon.com/images/I/91g2gWQKo+L._SY425_.jpg",
                desc: "The true story of the Black women mathematicians who helped NASA win the space race.",
                category: "biography",
                rating: "★★★★★"
            }
        ];

        // Load books into the DOM
        const booksContainer = document.getElementById('booksContainer');
        const filterButtons = document.querySelectorAll('.filter-btn');
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        function renderBooks(filter = 'all') {
            booksContainer.innerHTML = '';
            const filteredBooks = filter === 'all' ? books : books.filter(book => book.category === filter);
            
            filteredBooks.forEach(book => {
                const isInWishlist = wishlist.includes(book.id);
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.dataset.category = book.category;
                bookCard.innerHTML = `
                    <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" data-id="${book.id}">
                        <i class="fas fa-star"></i>
                    </button>
                    <img src="${book.cover}" alt="${book.title}" class="book-cover">
                    <div class="book-info">
                        <h3 class="book-title">${book.title}</h3>
                        <span class="book-author">${book.author}</span>
                        <p class="book-desc">${book.desc}</p>
                        <div class="book-meta">
                            <span class="book-rating">${book.rating}</span>
                            <span>${book.category}</span>
                        </div>
                    </div>
                `;
                booksContainer.appendChild(bookCard);
            });

            // Add event listeners to new wishlist buttons
            document.querySelectorAll('.wishlist-btn').forEach(btn => {
                btn.addEventListener('click', toggleWishlist);
            });
        }

        // Filter books
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderBooks(button.dataset.filter);
            });
        });

        // Toggle wishlist
        function toggleWishlist(e) {
            const bookId = parseInt(e.currentTarget.dataset.id);
            const index = wishlist.indexOf(bookId);
            
            if (index === -1) {
                wishlist.push(bookId);
                e.currentTarget.classList.add('active');
            } else {
                wishlist.splice(index, 1);
                e.currentTarget.classList.remove('active');
            }
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }

        // Initial render
        renderBooks();
 
