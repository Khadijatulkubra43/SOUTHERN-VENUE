
        // User authentication state
        let isLoggedIn = false;
        let currentUser = null;
        let cartItems = [];
        
        // Cart functionality
        function updateCartDisplay() {
            const cartCount = document.getElementById('cartCount');
            const cartTotal = document.getElementById('cartTotal');
            const cartItemsContainer = document.getElementById('cartItems');
            
            // Update cart count
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart total
            const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
            
            // Update cart items
            if (cartItems.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="cart-empty">
                        <div class="cart-empty-icon">
                            <i class="fas fa-shopping-bag"></i>
                        </div>
                        <h3>Your bag is empty</h3>
                        <p>Add some stylish dresses to get started!</p>
                    </div>
                `;
            } else {
                cartItemsContainer.innerHTML = cartItems.map((item, index) => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-info">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn minus" data-index="${index}">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn plus" data-index="${index}">+</button>
                                <button class="remove-item" data-index="${index}"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                // Add event listeners to cart buttons
                document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        if (cartItems[index].quantity > 1) {
                            cartItems[index].quantity--;
                            updateCartDisplay();
                        }
                    });
                });
                
                document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        cartItems[index].quantity++;
                        updateCartDisplay();
                    });
                });
                
                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        cartItems.splice(index, 1);
                        updateCartDisplay();
                    });
                });
            }
        }
        
        // User authentication
        function updateUserDisplay() {
            const userLoggedIn = document.getElementById('userLoggedIn');
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const userName = document.getElementById('userName');
            const userEmail = document.getElementById('userEmail');
            const userAvatar = document.getElementById('userAvatar');
            const authTitle = document.getElementById('authTitle');
            
            if (isLoggedIn && currentUser) {
                // Show logged in view
                userLoggedIn.classList.remove('hidden');
                loginForm.classList.add('hidden');
                registerForm.classList.add('hidden');
                
                // Update user info
                userName.textContent = currentUser.name;
                userEmail.textContent = currentUser.email;
                userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
                authTitle.textContent = `Welcome, ${currentUser.name.split(' ')[0]}`;
            } else {
                // Show login form
                userLoggedIn.classList.add('hidden');
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
                authTitle.textContent = 'Welcome Back';
            }
        }
        
        // DOM Elements
        const searchIcon = document.getElementById('searchIcon');
        const mobileSearchIcon = document.getElementById('mobileSearchIcon');
        const searchOverlay = document.getElementById('searchOverlay');
        const closeSearch = document.getElementById('closeSearch');
        
        const cartIcon = document.getElementById('cartIcon');
        const mobileCartIcon = document.getElementById('mobileCartIcon');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        const closeCart = document.getElementById('closeCart');
        
        const userIcon = document.getElementById('userIcon');
        const mobileUserIcon = document.getElementById('mobileUserIcon');
        const authModal = document.getElementById('authModal');
        const closeAuth = document.getElementById('closeAuth');
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const logoutBtn = document.getElementById('logoutBtn');
        
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const testimonialTrack = document.getElementById('testimonialTrack');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        // const newsletterForm = document.getElementById('newsletterForm');
        
        // Search functionality
        function openSearch() {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.getElementById('searchInput').focus();
        }
        
        function closeSearchOverlay() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        searchIcon.addEventListener('click', openSearch);
        mobileSearchIcon.addEventListener('click', openSearch);
        closeSearch.addEventListener('click', closeSearchOverlay);
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === this) closeSearchOverlay();
        });
        
        // Cart functionality
        function openCart() {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeCartSidebar() {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        cartIcon.addEventListener('click', openCart);
        mobileCartIcon.addEventListener('click', openCart);
        closeCart.addEventListener('click', closeCartSidebar);
        cartOverlay.addEventListener('click', closeCartSidebar);
        
        // User authentication
        function openAuthModal() {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeAuthModal() {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        userIcon.addEventListener('click', openAuthModal);
        mobileUserIcon.addEventListener('click', openAuthModal);
        closeAuth.addEventListener('click', closeAuthModal);
        authModal.addEventListener('click', function(e) {
            if (e.target === this) closeAuthModal();
        });
        
        // Login/Register tabs
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        });
        
        registerTab.addEventListener('click', () => {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
        
        // Login form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (email && password) {
                // Simulate login
                isLoggedIn = true;
                currentUser = {
                    name: "Sarah Johnson",
                    email: email
                };
                
                updateUserDisplay();
                closeAuthModal();
                
                // Show success message
                alert(`Welcome back, ${currentUser.name}!`);
                
                // Reset form
                this.reset();
            }
        });
        
        // Register form submission
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            if (name && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                    alert("Passwords don't match!");
                    return;
                }
                
                // Simulate registration
                isLoggedIn = true;
                currentUser = {
                    name: name,
                    email: email
                };
                
                updateUserDisplay();
                closeAuthModal();
                
                // Show success message
                alert(`Welcome to Southern Venue, ${currentUser.name}! Your account has been created.`);
                
                // Reset form
                this.reset();
            }
        });
        
        // Logout
        logoutBtn.addEventListener('click', () => {
            isLoggedIn = false;
            currentUser = null;
            updateUserDisplay();
            closeAuthModal();
            alert("You have been logged out successfully.");
        });
        
        // Sample product data
        const products = [
            {
                id: 1,
                name: "Scarlet Summer Dress",
                category: "summer",
                price: 49.99,
                originalPrice: 69.99,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSm86Z9QUa9S_oPZoFZOq-JNtYPmwOIT2zkGenau7CRFw7oMLeNFN_TYvo7O0SkS55-Ow&usqp=CAU",
                badge: "sale",
                colors: ["#E63946", "#1A1A1A", "#D4AF37"]
            },
            {
                id: 2,
                name: "Floral Evening Dress",
                category: "evening",
                price: 59.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=746&q=80",
                badge: "new",
                colors: ["#FF6B6B", "#4ECDC4", "#FFE66D"]
            },
            {
                id: 3,
                name: "Party Night Dress",
                category: "party",
                price: 64.99,
                originalPrice: null,
                image: "https://i.pinimg.com/736x/7c/28/02/7c2802273b597ec561cdff689a09594c.jpg",
                badge: "bestseller",
                colors: ["#1A1A1A", "#FFFFFF", "#8A2BE2"]
            },
            {
                id: 4,
                name: "Casual Day Dress",
                category: "casual",
                price: 44.99,
                originalPrice: 54.99,
                image: "https://img01.ztat.net/article/spp-media-p1/c93b2ce773f14f8283249d6e48ad20de/b50ef26e429748a2b028b27485e70332.jpg?imwidth=500",
                badge: "sale",
                colors: ["#A8E6CF", "#FFAAA5", "#FFD3B6"]
            },
            {
                id: 5,
                name: "Elegant Maxi Dress",
                category: "evening",
                price: 79.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                badge: "new",
                colors: ["#264653", "#2A9D8F", "#E9C46A"]
            },
            {
                id: 6,
                name: "Summer Floral Dress",
                category: "summer",
                price: 54.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
                badge: "bestseller",
                colors: ["#FF6B6B", "#4ECDC4", "#FFE66D"]
            },
            {
                id: 7,
                name: "Office Chic Dress",
                category: "casual",
                price: 59.99,
                originalPrice: 69.99,
                image: "https://s.alicdn.com/@sc04/kf/H5bdb39254133486f9c86c7d8f3c18f775/ZYHT-61092-2025-Autumn-Winter-New-Design-Women-s-Elegant-3D-Flowers-One-Piece-Formal-Business-Pencil-Office-Ladies-Dresses.jpg",
                badge: "sale",
                colors: ["#1A1A1A", "#FFFFFF", "#555555"]
            },
            {
                id: 8,
                name: "Cocktail Party Dress",
                category: "party",
                price: 69.99,
                originalPrice: null,
                image: "https://dressrent.in/cdn/shop/products/Untitled.pngbhhn_-_Copy_330x.png?v=1535202839",
                badge: "new",
                colors: ["#8A2BE2", "#FF1493", "#00CED1"]
            },
            {
                id: 9,
                name: "Beach Cover Up Dress",
                category: "summer",
                price: 39.99,
                originalPrice: 49.99,
                image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                badge: "sale",
                colors: ["#FFB347", "#FFCC99", "#66CCCC"]
            },
            {
                id: 10,
                name: "Formal Gala Dress",
                category: "evening",
                price: 89.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
                badge: "new",
                colors: ["#1A1A1A", "#800000", "#2F4F4F"]
            },
            {
                id: 11,
                name: "Weekend Casual Dress",
                category: "casual",
                price: 49.99,
                originalPrice: null,
                image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
                badge: "bestseller",
                colors: ["#98D8C8", "#F7D6BF", "#F2B5D4"]
            },
            {
                id: 12,
                name: "Summer Picnic Dress",
                category: "summer",
                price: 44.99,
                originalPrice: 54.99,
                image: "https://i.redd.it/ynfklb2ygq351.jpg",
                badge: "sale",
                colors: ["#FF6B6B", "#4ECDC4", "#FFE66D"]
            }
        ];

        // Cart state
        // let cartItems = [];
        // let currentPage = 1;
        // const productsPerPage = 8;
        // let displayedProducts = products.slice(0, productsPerPage);

        // DOM Elements
        // const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        // const closeMobileMenu = document.getElementById('closeMobileMenu');
        // const mobileMenu = document.getElementById('mobileMenu');
        const filterToggle = document.getElementById('filterToggle');
        const productFilters = document.getElementById('productFilters');
        const categoryFilter = document.getElementById('categoryFilter');
        const sizeFilter = document.getElementById('sizeFilter');
        const priceFilter = document.getElementById('priceFilter');
        const sortSelect = document.getElementById('sortSelect');
        const productsGrid = document.getElementById('productsGrid');
        const productsCount = document.getElementById('productsCount');
        const activeFilters = document.getElementById('activeFilters');
        const pagination = document.getElementById('pagination');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        // const cartIcon = document.getElementById('cartIcon');
        const cartCount = document.getElementById('cartCount');
        // const cartSidebar = document.getElementById('cartSidebar');
        // const cartOverlay = document.getElementById('cartOverlay');
        // const closeCart = document.getElementById('closeCart');
        const cartTotal = document.getElementById('cartTotal');
        const cartItemsContainer = document.getElementById('cartItems');
        const backToTop = document.getElementById('backToTop');
        const newsletterForm = document.getElementById('newsletterForm');

        // Mobile Menu Toggle
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close mobile menu when clicking links
        document.querySelectorAll('.mobile-menu-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Filter Toggle for Mobile
        filterToggle.addEventListener('click', () => {
            productFilters.classList.toggle('active');
            filterToggle.classList.toggle('active');
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Back to top button
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Render products
        function renderProducts(productsToRender) {
            productsGrid.innerHTML = '';
            
            if (productsToRender.length === 0) {
                productsGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--medium-gray);">
                        <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; color: #ddd;"></i>
                        <h3>No products found</h3>
                        <p>Try adjusting your filters to find what you're looking for.</p>
                    </div>
                `;
                return;
            }
            
            productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                let badgeClass = '';
                switch(product.badge) {
                    case 'new': badgeClass = 'badge-new'; break;
                    case 'sale': badgeClass = 'badge-sale'; break;
                    case 'bestseller': badgeClass = 'badge-bestseller'; break;
                }
                
                const priceHtml = product.originalPrice 
                    ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>
                       <span class="price-main">$${product.price.toFixed(2)}</span>`
                    : `<span class="price-main">$${product.price.toFixed(2)}</span>`;
                
                const colorsHtml = product.colors.map(color => 
                    `<div class="color-option" style="background-color: ${color};" title="Color option"></div>`
                ).join('');
                
                productCard.innerHTML = `
                    <div class="product-badge ${badgeClass}">${product.badge.toUpperCase()}</div>
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        <div class="product-overlay">
                            <button class="quick-view-btn" data-id="${product.id}">
                                <i class="fas fa-eye"></i> Quick View
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                        <div class="product-price">
                            <div>${priceHtml}</div>
                            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                                <i class="fas fa-shopping-bag"></i>
                            </button>
                        </div>
                        <div class="product-colors">
                            ${colorsHtml}
                        </div>
                    </div>
                `;
                
                productsGrid.appendChild(productCard);
            });
            
            // Update products count
            productsCount.innerHTML = `<span>Showing ${productsToRender.length} of ${products.length} products</span>`;
            
            // Update active filters
            updateActiveFilters();
            
            // Add event listeners to newly created buttons
            addProductEventListeners();
        }
        
        // Update active filters display
        function updateActiveFilters() {
            const filters = [];
            
            if (categoryFilter.value !== 'all') {
                filters.push(`Category: ${categoryFilter.options[categoryFilter.selectedIndex].text}`);
            }
            
            if (sizeFilter.value !== 'all') {
                filters.push(`Size: ${sizeFilter.value.toUpperCase()}`);
            }
            
            if (priceFilter.value !== 'all') {
                filters.push(`Price: ${priceFilter.options[priceFilter.selectedIndex].text}`);
            }
            
            if (filters.length > 0) {
                activeFilters.innerHTML = `<span style="font-size: 12px; color: var(--primary-red);">Active: ${filters.join(', ')}</span>`;
            } else {
                activeFilters.innerHTML = '';
            }
        }
        
        // Add event listeners to product buttons
        function addProductEventListeners() {
            // Add to cart buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const name = this.getAttribute('data-name');
                    const price = parseFloat(this.getAttribute('data-price'));
                    const image = this.getAttribute('data-image');
                    
                    // Check if item already exists in cart
                    const existingItem = cartItems.find(item => item.id === parseInt(id));
                    
                    if (existingItem) {
                        existingItem.quantity++;
                    } else {
                        cartItems.push({
                            id: parseInt(id),
                            name,
                            price,
                            image,
                            quantity: 1
                        });
                    }
                    
                    // Update cart display
                    updateCartDisplay();
                    
                    // Button animation
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    this.style.backgroundColor = '#4CAF50';
                    
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-shopping-bag"></i>';
                        this.style.backgroundColor = '';
                    }, 1000);
                });
            });
            
            // Quick view buttons
            document.querySelectorAll('.quick-view-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const product = products.find(p => p.id === parseInt(id));
                    
                    if (product) {
                        alert(`Quick view for: ${product.name}\nPrice: $${product.price.toFixed(2)}\n\nIn a real application, this would open a modal with more details.`);
                    }
                });
            });
            
            // Color options
            document.querySelectorAll('.color-option').forEach(colorOption => {
                colorOption.addEventListener('click', function() {
                    // Remove active class from all color options in this product
                    const productCard = this.closest('.product-card');
                    productCard.querySelectorAll('.color-option').forEach(option => {
                        option.classList.remove('active');
                    });
                    
                    // Add active class to clicked color
                    this.classList.add('active');
                });
            });
        }
        
        // Update cart display
        function updateCartDisplay() {
            // Update cart count
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart total
            const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
            
            // Update cart items in sidebar
            if (cartItems.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="cart-empty">
                        <div class="cart-empty-icon">
                            <i class="fas fa-shopping-bag"></i>
                        </div>
                        <h3>Your bag is empty</h3>
                        <p>Add some stylish dresses to get started!</p>
                    </div>
                `;
            } else {
                cartItemsContainer.innerHTML = cartItems.map(item => `
                    <div class="cart-item" style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
                        <div style="width: 70px; height: 90px; border-radius: 8px; overflow: hidden; margin-right: 15px;">
                            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="flex: 1;">
                            <h4 style="font-size: 15px; margin-bottom: 5px;">${item.name}</h4>
                            <div style="color: var(--primary-red); font-weight: 600; margin-bottom: 10px;">$${item.price.toFixed(2)}</div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <button style="width: 24px; height: 24px; background-color: var(--light-gray); border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">-</button>
                                <span>${item.quantity}</span>
                                <button style="width: 24px; height: 24px; background-color: var(--light-gray); border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">+</button>
                                <button style="background: none; border: none; color: #999; margin-left: 10px; cursor: pointer;">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }
        
        // Filter and sort products
        function filterAndSortProducts() {
            let filteredProducts = [...products];
            
            // Apply category filter
            const categoryValue = categoryFilter.value;
            if (categoryValue !== 'all') {
                filteredProducts = filteredProducts.filter(product => product.category === categoryValue);
            }
            
            // Apply price filter
            const priceValue = priceFilter.value;
            if (priceValue !== 'all') {
                switch(priceValue) {
                    case 'under-50':
                        filteredProducts = filteredProducts.filter(product => product.price < 50);
                        break;
                    case '50-100':
                        filteredProducts = filteredProducts.filter(product => product.price >= 50 && product.price <= 100);
                        break;
                    case '100-150':
                        filteredProducts = filteredProducts.filter(product => product.price >= 100 && product.price <= 150);
                        break;
                    case 'over-150':
                        filteredProducts = filteredProducts.filter(product => product.price > 150);
                        break;
                }
            }
            
            // Apply sorting
            const sortValue = sortSelect.value;
            switch(sortValue) {
                case 'newest':
                    // Sort by ID (assuming higher IDs are newer)
                    filteredProducts.sort((a, b) => b.id - a.id);
                    break;
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'popular':
                    // Sort by badge (bestseller first, then new, then sale, then others)
                    const badgeOrder = { 'bestseller': 1, 'new': 2, 'sale': 3, 'none': 4 };
                    filteredProducts.sort((a, b) => (badgeOrder[a.badge] || 4) - (badgeOrder[b.badge] || 4));
                    break;
                case 'featured':
                default:
                    // Default order (as in products array)
                    break;
            }
            
            // Update displayed products
            displayedProducts = filteredProducts.slice(0, productsPerPage * currentPage);
            
            // Render filtered products
            renderProducts(displayedProducts);
            
            // Show/hide load more button
            if (filteredProducts.length > displayedProducts.length) {
                loadMoreContainer.style.display = 'block';
                pagination.style.display = 'none';
            } else {
                loadMoreContainer.style.display = 'none';
                pagination.style.display = 'flex';
            }
        }
        
        // Load more products
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            filterAndSortProducts();
            
            // Smooth scroll to top of new products
            productsGrid.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        
        // Pagination
        document.querySelectorAll('.page-number').forEach(page => {
            page.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all pages
                document.querySelectorAll('.page-number').forEach(p => {
                    p.classList.remove('active');
                });
                
                // Add active class to clicked page
                this.classList.add('active');
                
                // Update current page
                currentPage = parseInt(this.textContent);
                
                // Re-render products
                filterAndSortProducts();
                
                // Scroll to top of products
                window.scrollTo({
                    top: document.querySelector('.shop-main').offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
        
        document.querySelector('.page-prev').addEventListener('click', function(e) {
            e.preventDefault();
            const activePage = document.querySelector('.page-number.active');
            const currentPageNum = parseInt(activePage.textContent);
            
            if (currentPageNum > 1) {
                const prevPage = document.querySelector(`.page-number:nth-child(${currentPageNum})`);
                if (prevPage) {
                    activePage.classList.remove('active');
                    prevPage.classList.add('active');
                    currentPage = currentPageNum - 1;
                    filterAndSortProducts();
                }
            }
        });
        
        document.querySelector('.page-next').addEventListener('click', function(e) {
            e.preventDefault();
            const activePage = document.querySelector('.page-number.active');
            const currentPageNum = parseInt(activePage.textContent);
            
            if (currentPageNum < 4) {
                const nextPage = document.querySelector(`.page-number:nth-child(${currentPageNum + 2})`);
                if (nextPage) {
                    activePage.classList.remove('active');
                    nextPage.classList.add('active');
                    currentPage = currentPageNum + 1;
                    filterAndSortProducts();
                }
            }
        });
        
        // Cart functionality
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        cartOverlay.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Filter and sort event listeners
        categoryFilter.addEventListener('change', filterAndSortProducts);
        sizeFilter.addEventListener('change', filterAndSortProducts);
        priceFilter.addEventListener('change', filterAndSortProducts);
        sortSelect.addEventListener('change', filterAndSortProducts);
        
        // Newsletter form
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                this.innerHTML = '<div style="color: var(--dark-gray); font-size: 16px; padding: 15px; background: rgba(0,0,0,0.05); border-radius: 10px;"><i class="fas fa-check-circle" style="color: #4CAF50; margin-right: 10px;"></i> Thank you for subscribing!</div>';
                
                setTimeout(() => {
                    this.innerHTML = `
                        <input type="email" placeholder="Enter your email address" required>
                        <button type="submit">Subscribe</button>
                    `;
                }, 3000);
            }
        });
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            // Initial render
            renderProducts(displayedProducts);
            updateCartDisplay();
            
            // Hide pagination initially (using load more)
            pagination.style.display = 'none';
        });
   