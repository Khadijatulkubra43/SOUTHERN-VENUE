
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
        
        // Mobile menu
        function openMobileMenu() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMobileMenuFunc() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
        
        // Close mobile menu when clicking links
        document.querySelectorAll('.mobile-menu-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenuFunc);
        });
        
        // Add to cart functionality
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const name = this.getAttribute('data-name');
                const price = parseFloat(this.getAttribute('data-price'));
                const image = this.getAttribute('data-image');
                
                // Check if item already exists in cart
                const existingItem = cartItems.find(item => item.id === id);
                
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cartItems.push({
                        id,
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
                
                // Open cart sidebar
                openCart();
            });
        });
        
        // Testimonial slider
        let currentSlide = 0;
        
        function goToSlide(index) {
            testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
            
            testimonialDots.forEach(dot => {
                dot.classList.remove('active');
            });
            testimonialDots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                goToSlide(index);
            });
        });
        
        // Auto slide testimonials
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialDots.length;
            goToSlide(currentSlide);
        }, 5000);
        
        // Newsletter form
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate subscription
                this.innerHTML = '<div style="color: white; font-size: 16px; padding: 15px; background: rgba(0,0,0,0.1); border-radius: 10px;"><i class="fas fa-check-circle" style="color: #4CAF50; margin-right: 10px;"></i> Thank you for subscribing!</div>';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.innerHTML = `
                        <input type="email" placeholder="Enter your email address" required>
                        <button type="submit" class="btn">Subscribe Now</button>
                    `;
                }, 3000);
            }
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Scroll reveal animation
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 100;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', reveal);
        reveal();
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    closeMobileMenuFunc();
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            updateCartDisplay();
            updateUserDisplay();
        });
     // Initialize counters to 0
        document.querySelectorAll('.stat-number').forEach(stat => {
            stat.innerText = '0';
        });

        // Reveal animation on scroll
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 100;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', reveal);
        window.addEventListener('load', reveal);
        
        // Animated counter for statistics
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            let animated = false;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animated) {
                        animated = true;
                        
                        counters.forEach(counter => {
                            const target = +counter.getAttribute('data-count');
                            const duration = 2000; // 2 seconds
                            const increment = target / (duration / 16); // 60fps
                            let current = 0;
                            
                            const updateCounter = () => {
                                current += increment;
                                if (current < target) {
                                    counter.innerText = Math.floor(current);
                                    setTimeout(updateCounter, 16);
                                } else {
                                    counter.innerText = target;
                                }
                            };
                            
                            updateCounter();
                        });
                        
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(document.querySelector('.hero-counter-section'));
        }
        
        // Initialize counters when page loads
        document.addEventListener('DOMContentLoaded', animateCounters);
        
        // Scroll to section function
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        
        // Image hover effect
        const stackImages = document.querySelectorAll('.stack-image');
        stackImages.forEach(image => {
            image.addEventListener('mouseenter', () => {
                stackImages.forEach(img => {
                    if (img !== image) {
                        img.style.filter = 'brightness(0.9) blur(1px)';
                        img.style.transform = 'scale(0.95)';
                    }
                });
            });
            
            image.addEventListener('mouseleave', () => {
                stackImages.forEach(img => {
                    img.style.filter = 'brightness(1) blur(0)';
                    img.style.transform = '';
                });
            });
        });
        
        // Responsive adjustments
        function handleResponsive() {
            const heroVisual = document.querySelector('.hero-visual');
            const windowWidth = window.innerWidth;
            
            if (windowWidth < 768) {
                // Reduce animation intensity on mobile
                stackImages.forEach(img => {
                    img.style.animationDuration = '8s';
                });
                
                // Adjust counter spacing
                const counterTitle = document.querySelector('.counter-title');
                if (counterTitle) {
                    counterTitle.style.marginBottom = '15px';
                }
            }
        }
        
        window.addEventListener('resize', handleResponsive);
        window.addEventListener('load', handleResponsive);