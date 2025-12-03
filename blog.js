
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
        const newsletterForm = document.getElementById('newsletterForm');
        
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
        
        // Blog post data
        const blogPosts = [
            {
                id: 1,
                title: "How to Build a Capsule Wardrobe for Summer",
                excerpt: "Learn how to create a versatile capsule wardrobe with just 20 pieces that will take you through the entire summer season in style.",
                category: "Style Tips",
                date: "June 10, 2023",
                readTime: "4 min",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf5i63N_u8C5CMLspG4sgU7YkEhXkKoKWsSw&s",
                views: 1245,
                tags: ["summer", "capsule", "wardrobe", "minimalist"]
            },
            {
                id: 2,
                title: "Sustainable Fashion: Materials to Look For",
                excerpt: "A guide to eco-friendly fabrics and materials that are both stylish and better for our planet. Make conscious fashion choices.",
                category: "Sustainable Fashion",
                date: "June 5, 2023",
                readTime: "6 min",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsv-P_3Xh9qVP_rFuz56xPN58_cIuWdQn8yg&s",
                views: 2156,
                tags: ["sustainable", "eco-friendly", "fabrics", "materials"]
            },
            {
                id: 3,
                title: "Accessorizing Your Summer Dresses",
                excerpt: "From statement jewelry to the perfect bag, discover how to accessorize your summer dresses for any occasion.",
                category: "Accessories",
                date: "May 28, 2023",
                readTime: "3 min",
                image: "https://www.accessorize.com/dw/image/v2/BDLV_PRD/on/demandware.static/-/Sites-accessorize-master-catalog/default/dw2d4c9e77/images/large/21_46007750007_1.jpg?sw=470&sh=602&sm=cut",
                views: 1872,
                tags: ["accessories", "summer", "jewelry", "bags"]
            },
            {
                id: 4,
                title: "The Return of 90s Fashion: What's Worth Wearing",
                excerpt: "The 90s are back, but which trends are worth incorporating into your modern wardrobe? We break down the best retro looks.",
                category: "Trend Reports",
                date: "May 20, 2023",
                readTime: "5 min",
                image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                views: 2987,
                tags: ["trends", "90s", "retro", "vintage"]
            },
            {
                id: 5,
                title: "Dressing for Office Summers: Staying Cool & Professional",
                excerpt: "Beat the heat while maintaining your professional style. Our guide to office-appropriate summer fashion that keeps you comfortable.",
                category: "Style Tips",
                date: "May 15, 2023",
                readTime: "4 min",
                image: "https://i.pinimg.com/736x/7d/64/c8/7d64c85463531b32ec7fa4a0e798549f.jpg",
                views: 1567,
                tags: ["workwear", "office", "summer", "professional"]
            },
            {
                id: 6,
                title: "Color Psychology in Fashion: What Your Outfit Says",
                excerpt: "Discover how different colors affect perception and mood, and how to use color psychology to your advantage in fashion.",
                category: "Style Tips",
                date: "May 8, 2023",
                readTime: "7 min",
                image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                views: 2314,
                tags: ["colors", "psychology", "mood", "style"]
            },
            {
                id: 7,
                title: "The Ultimate Guide to Fall Fashion Colors",
                excerpt: "Discover which colors will dominate the fashion scene this fall and how to incorporate them into your wardrobe.",
                category: "Seasonal Fashion",
                date: "April 25, 2023",
                readTime: "5 min",
                image: "https://jolynneshane.com/wp-content/uploads/2024/08/Color-Trends-for-Fall-2024.png",
                views: 1890,
                tags: ["fall", "colors", "seasonal", "autumn"]
            },
            {
                id: 8,
                title: "Behind the Scenes: Designing Our Latest Collection",
                excerpt: "Get an exclusive look at how our design team creates each collection from concept to final product.",
                category: "Behind The Scenes",
                date: "April 15, 2023",
                readTime: "6 min",
                image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
                views: 1750,
                tags: ["behind the scenes", "design", "collection", "process"]
            }
        ];

        // DOM Elements
        // const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        // const closeMobileMenu = document.getElementById('closeMobileMenu');
        // const mobileMenu = document.getElementById('mobileMenu');
        const postsGrid = document.getElementById('postsGrid');
        const recentPostsList = document.getElementById('recentPostsList');
        const popularPostsList = document.getElementById('popularPostsList');
        // const newsletterForm = document.getElementById('newsletterForm');
        const backToTop = document.getElementById('backToTop');
        const searchForm = document.querySelector('.search-form');
        const categoryItems = document.querySelectorAll('.category-item');
        const categoryResults = document.getElementById('categoryResults');
        const resultsText = document.getElementById('resultsText');
        const clearFilters = document.getElementById('clearFilters');
        const tags = document.querySelectorAll('.tag');
        const footerCategoryLinks = document.querySelectorAll('.footer-links a[data-category]');

        // State
        let currentCategory = 'all';
        let currentTag = null;
        let currentSearch = '';

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
        
        // Render blog posts based on current filters
        function renderBlogPosts() {
            postsGrid.innerHTML = '';
            
            let filteredPosts = [...blogPosts];
            
            // Apply category filter
            if (currentCategory !== 'all') {
                filteredPosts = filteredPosts.filter(post => 
                    post.category === currentCategory
                );
            }
            
            // Apply tag filter
            if (currentTag) {
                filteredPosts = filteredPosts.filter(post => 
                    post.tags.includes(currentTag)
                );
            }
            
            // Apply search filter
            if (currentSearch) {
                const searchTerm = currentSearch.toLowerCase();
                filteredPosts = filteredPosts.filter(post => 
                    post.title.toLowerCase().includes(searchTerm) ||
                    post.excerpt.toLowerCase().includes(searchTerm) ||
                    post.category.toLowerCase().includes(searchTerm) ||
                    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
                );
            }
            
            // Show/hide results indicator
            if (currentCategory !== 'all' || currentTag || currentSearch) {
                categoryResults.classList.add('active');
                
                let filterText = '';
                if (currentCategory !== 'all') filterText += `Category: ${currentCategory}`;
                if (currentTag) filterText += `${filterText ? ', ' : ''}Tag: ${currentTag}`;
                if (currentSearch) filterText += `${filterText ? ', ' : ''}Search: "${currentSearch}"`;
                
                resultsText.textContent = `Showing ${filteredPosts.length} articles filtered by ${filterText}`;
            } else {
                categoryResults.classList.remove('active');
                resultsText.textContent = 'Showing all articles';
            }
            
            // Display filtered posts or no results message
            if (filteredPosts.length === 0) {
                postsGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--medium-gray);">
                        <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; color: #ddd;"></i>
                        <h3>No articles found</h3>
                        <p>Try adjusting your filters or search term to find what you're looking for.</p>
                        <button class="clear-filters" style="margin-top: 20px; background: none; border: 2px solid var(--primary-red); color: var(--primary-red); padding: 10px 20px; border-radius: 30px; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-times"></i> Clear All Filters
                        </button>
                    </div>
                `;
                
                // Add event listener to clear filters button in no results message
                const clearButton = postsGrid.querySelector('.clear-filters');
                if (clearButton) {
                    clearButton.addEventListener('click', clearAllFilters);
                }
                
                return;
            }
            
            // Render filtered posts
            filteredPosts.forEach(post => {
                const postCard = document.createElement('article');
                postCard.className = 'post-card';
                
                postCard.innerHTML = `
                    <div class="post-image">
                        <img src="${post.image}" alt="${post.title}" loading="lazy">
                        <div class="post-category">${post.category}</div>
                    </div>
                    <div class="post-content">
                        <div class="post-meta">
                            <span><i class="far fa-calendar"></i> ${post.date}</span>
                            <span><i class="far fa-clock"></i> ${post.readTime} read</span>
                        </div>
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-excerpt">${post.excerpt}</p>
                        <div class="post-tags" style="margin-top: 15px; display: flex; flex-wrap: wrap; gap: 8px;">
                            ${post.tags.map(tag => `<span style="background: var(--light-gray); color: var(--medium-gray); padding: 4px 10px; border-radius: 15px; font-size: 12px;">${tag}</span>`).join('')}
                        </div>
                        <a href="#" class="post-link" data-id="${post.id}">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                `;
                
                postsGrid.appendChild(postCard);
            });
            
            // Add event listeners to post links
            document.querySelectorAll('.post-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const postId = this.getAttribute('data-id');
                    alert(`In a real application, this would navigate to the full blog post with ID: ${postId}`);
                });
            });
        }
        
        // Category filter functionality - FIXED
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Reset other filters
                currentTag = null;
                currentSearch = '';
                
                // Update active category
                categoryItems.forEach(cat => cat.classList.remove('active'));
                this.classList.add('active');
                
                // Update current category
                currentCategory = category;
                
                // Render filtered posts
                renderBlogPosts();
                
                // Update tags to show active state
                updateTagActiveState();
                
                // Clear search input if exists
                const searchInput = document.querySelector('.search-input');
                if (searchInput) searchInput.value = '';
            });
        });
        
        // Tag filter functionality
        tags.forEach(tag => {
            tag.addEventListener('click', function() {
                const tagValue = this.getAttribute('data-tag');
                
                // If clicking the same tag, clear it
                if (currentTag === tagValue) {
                    currentTag = null;
                    this.classList.remove('active');
                } else {
                    // Set new tag filter
                    currentTag = tagValue;
                    
                    // Update active state on tags
                    tags.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Update categories to show "All Articles"
                    categoryItems.forEach(cat => {
                        cat.classList.remove('active');
                        if (cat.getAttribute('data-category') === 'all') {
                            cat.classList.add('active');
                        }
                    });
                    currentCategory = 'all';
                }
                
                // Render filtered posts
                renderBlogPosts();
                
                // Clear search input if exists
                const searchInput = document.querySelector('.search-input');
                if (searchInput) searchInput.value = '';
                currentSearch = '';
            });
        });
        
        // Update tag active state based on current tag
        function updateTagActiveState() {
            tags.forEach(tag => {
                if (tag.getAttribute('data-tag') === currentTag) {
                    tag.classList.add('active');
                } else {
                    tag.classList.remove('active');
                }
            });
        }
        
        // Clear all filters
        function clearAllFilters() {
            // Reset all filters
            currentCategory = 'all';
            currentTag = null;
            currentSearch = '';
            
            // Update UI
            categoryItems.forEach(cat => {
                cat.classList.remove('active');
                if (cat.getAttribute('data-category') === 'all') {
                    cat.classList.add('active');
                }
            });
            
            tags.forEach(tag => tag.classList.remove('active'));
            
            // Clear search input
            const searchInput = document.querySelector('.search-input');
            if (searchInput) searchInput.value = '';
            
            // Render all posts
            renderBlogPosts();
        }
        
        // Clear filters button
        clearFilters.addEventListener('click', clearAllFilters);
        
        // Search functionality
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.search-input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                currentSearch = searchTerm;
                
                // Reset other filters
                categoryItems.forEach(cat => {
                    cat.classList.remove('active');
                    if (cat.getAttribute('data-category') === 'all') {
                        cat.classList.add('active');
                    }
                });
                currentCategory = 'all';
                
                tags.forEach(tag => tag.classList.remove('active'));
                currentTag = null;
                
                // Render filtered posts
                renderBlogPosts();
            }
        });
        
        // Footer category links
        footerCategoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                
                // Update active category
                categoryItems.forEach(cat => {
                    cat.classList.remove('active');
                    if (cat.getAttribute('data-category') === category) {
                        cat.classList.add('active');
                    }
                });
                
                // Set current category and reset other filters
                currentCategory = category;
                currentTag = null;
                currentSearch = '';
                
                // Render filtered posts
                renderBlogPosts();
                
                // Scroll to blog content
                document.querySelector('.blog-content').scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // Render recent posts in sidebar
        function renderRecentPosts() {
            recentPostsList.innerHTML = '';
            
            // Get first 4 posts for recent
            const recentPosts = blogPosts.slice(0, 4);
            
            recentPosts.forEach(post => {
                const listItem = document.createElement('li');
                listItem.className = 'recent-post-item';
                
                listItem.innerHTML = `
                    <div class="recent-post-image">
                        <img src="${post.image}" alt="${post.title}">
                    </div>
                    <div class="recent-post-content">
                        <h4>${post.title}</h4>
                        <div class="recent-post-date">
                            <i class="far fa-calendar"></i> ${post.date}
                        </div>
                    </div>
                `;
                
                // Add click event to navigate to category
                listItem.addEventListener('click', () => {
                    // Update active category
                    categoryItems.forEach(cat => {
                        cat.classList.remove('active');
                        if (cat.getAttribute('data-category') === post.category) {
                            cat.classList.add('active');
                        }
                    });
                    
                    // Set current category and reset other filters
                    currentCategory = post.category;
                    currentTag = null;
                    currentSearch = '';
                    
                    // Render filtered posts
                    renderBlogPosts();
                });
                
                recentPostsList.appendChild(listItem);
            });
        }
        
        // Render popular posts in sidebar
        function renderPopularPosts() {
            popularPostsList.innerHTML = '';
            
            // Sort posts by views and get top 5
            const popularPosts = [...blogPosts]
                .sort((a, b) => b.views - a.views)
                .slice(0, 5);
            
            popularPosts.forEach((post, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'popular-post-item';
                
                listItem.innerHTML = `
                    <div class="popular-post-number">${index + 1}</div>
                    <div class="popular-post-content">
                        <h4>${post.title}</h4>
                        <div class="popular-post-views">
                            <i class="far fa-eye"></i> ${post.views.toLocaleString()} views
                        </div>
                    </div>
                `;
                
                // Add click event to navigate to category
                listItem.addEventListener('click', () => {
                    // Update active category
                    categoryItems.forEach(cat => {
                        cat.classList.remove('active');
                        if (cat.getAttribute('data-category') === post.category) {
                            cat.classList.add('active');
                        }
                    });
                    
                    // Set current category and reset other filters
                    currentCategory = post.category;
                    currentTag = null;
                    currentSearch = '';
                    
                    // Render filtered posts
                    renderBlogPosts();
                });
                
                popularPostsList.appendChild(listItem);
            });
        }
        
        // Newsletter form
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                this.innerHTML = '<div style="color: var(--dark-gray); font-size: 16px; padding: 15px; background: rgba(0,0,0,0.05); border-radius: 10px;"><i class="fas fa-check-circle" style="color: #4CAF50; margin-right: 10px;"></i> Thank you for subscribing to our newsletter!</div>';
                
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
            renderBlogPosts();
            renderRecentPosts();
            renderPopularPosts();
        });
