
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
        
        // FAQ Data
        const faqData = [
            {
                id: 1,
                question: "How long does shipping take?",
                answer: "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery. International shipping times vary by location.",
                icon: "fas fa-shipping-fast",
                link: "#shipping"
            },
            {
                id: 2,
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for all items in original condition with tags attached. Returns are free for U.S. customers.",
                icon: "fas fa-undo",
                link: "#returns"
            },
            {
                id: 3,
                question: "How do I track my order?",
                answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account on our website.",
                icon: "fas fa-box-open",
                link: "#tracking"
            },
            {
                id: 4,
                question: "Do you ship internationally?",
                answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. Duties and taxes may apply.",
                icon: "fas fa-globe",
                link: "#international"
            },
            {
                id: 5,
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay for secure checkout.",
                icon: "fas fa-credit-card",
                link: "#payments"
            },
            {
                id: 6,
                question: "How do I change or cancel my order?",
                answer: "Orders can be changed or cancelled within 1 hour of placement. Contact our support team immediately for assistance with order modifications.",
                icon: "fas fa-edit",
                link: "#modify"
            }
        ];

        // Chat messages data (simulated customer support responses)
        const chatResponses = [
            "Hi! I'm Sarah from Southern Venue customer support. How can I help you today? 😊",
            "Our support hours are Monday-Friday, 9AM-6PM EST. You can also email us at support@southernvenue.com.",
            "For order inquiries, please have your order number ready. For returns, visit our Returns page for instructions.",
            "Shipping typically takes 5-7 business days for standard delivery. Express shipping (2-3 days) is available at checkout.",
            "We offer a 30-day return policy. Items must be in original condition with tags attached.",
            "Yes, we ship internationally to over 50 countries. Shipping costs vary by destination.",
            "You can track your order using the tracking number sent to your email, or by logging into your account.",
            "Is there anything else I can help you with today?"
        ];

        // DOM Elements
        // const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        // const closeMobileMenu = document.getElementById('closeMobileMenu');
        // const mobileMenu = document.getElementById('mobileMenu');
        const contactForm = document.getElementById('contactForm');
        // const newsletterForm = document.getElementById('newsletterForm');
        const ctaChatButton = document.getElementById('ctaChatButton');
        const backToTop = document.getElementById('backToTop');
        const faqGrid = document.getElementById('faqGrid');
        const chatToggle = document.getElementById('chatToggle');
        const chatWidget = document.getElementById('chatWidget');
        const chatOverlay = document.getElementById('chatOverlay');
        const closeChat = document.getElementById('closeChat');
        const chatBody = document.getElementById('chatBody');
        const chatInput = document.getElementById('chatInput');
        const sendMessage = document.getElementById('sendMessage');
        const chatNotification = document.getElementById('chatNotification');

        // Chat state
        let chatMessages = [];
        let chatActive = false;
        let unreadMessages = 1; // Start with 1 unread message (welcome message)

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
        
        // Render FAQ Items
        function renderFAQs() {
            faqGrid.innerHTML = '';
            
            faqData.forEach(faq => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item';
                
                faqItem.innerHTML = `
                    <div class="faq-icon">
                        <i class="${faq.icon}"></i>
                    </div>
                    <h3 class="faq-question">${faq.question}</h3>
                    <p class="faq-answer">${faq.answer}</p>
                    <a href="${faq.link}" class="faq-link">
                        Learn More <i class="fas fa-arrow-right"></i>
                    </a>
                `;
                
                faqGrid.appendChild(faqItem);
            });
            
            // Add event listeners to FAQ links
            document.querySelectorAll('.faq-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = this.getAttribute('href');
                    alert(`In a real application, this would navigate to the ${target} section or open a detailed page.`);
                });
            });
        }
        
        // Contact Form Submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && subject && message) {
                // Show success message
                const submitButton = this.querySelector('.form-submit');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.style.backgroundColor = '#4CAF50';
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    this.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.style.backgroundColor = '';
                    
                    // Show thank you message
                    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you at ${email} within 24 hours.`);
                }, 2000);
            }
        });
        
        // Newsletter Form Submission
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
        
        // Chat Functions
        function openChat() {
            chatWidget.classList.add('active');
            chatOverlay.classList.add('active');
            chatToggle.classList.add('active');
            chatActive = true;
            
            // Mark messages as read when chat opens
            unreadMessages = 0;
            updateNotification();
            
            // Auto-scroll to bottom of chat
            setTimeout(() => {
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 100);
        }
        
        function closeChatWidget() {
            chatWidget.classList.remove('active');
            chatOverlay.classList.remove('active');
            chatToggle.classList.remove('active');
            chatActive = false;
        }
        
        function addMessage(text, isIncoming = true) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${isIncoming ? 'message-incoming' : 'message-outgoing'}`;
            
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            messageDiv.innerHTML = `
                <div>${text}</div>
                <div class="message-time">${time}</div>
            `;
            
            chatBody.appendChild(messageDiv);
            
            // Auto-scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Add to chat messages array
            chatMessages.push({
                text,
                time,
                incoming: isIncoming
            });
        }
        
        function sendChatMessage() {
            const message = chatInput.value.trim();
            
            if (message) {
                // Add user message
                addMessage(message, false);
                
                // Clear input
                chatInput.value = '';
                
                // Simulate typing delay
                setTimeout(() => {
                    // Get a random response from chatResponses
                    const randomResponse = chatResponses[Math.floor(Math.random() * chatResponses.length)];
                    addMessage(randomResponse, true);
                }, 1000 + Math.random() * 1000);
            }
        }
        
        function updateNotification() {
            if (unreadMessages > 0 && !chatActive) {
                chatNotification.textContent = unreadMessages;
                chatNotification.style.display = 'flex';
            } else {
                chatNotification.style.display = 'none';
            }
        }
        
        // Chat Event Listeners
        chatToggle.addEventListener('click', () => {
            if (chatActive) {
                closeChatWidget();
            } else {
                openChat();
            }
        });
        
        ctaChatButton.addEventListener('click', (e) => {
            e.preventDefault();
            openChat();
        });
        
        closeChat.addEventListener('click', closeChatWidget);
        chatOverlay.addEventListener('click', closeChatWidget);
        
        sendMessage.addEventListener('click', sendChatMessage);
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
        
        // Initialize chat with welcome message
        function initChat() {
            // Add welcome message
            setTimeout(() => {
                addMessage("Hi there! 👋 Welcome to Southern Venue customer support. How can I help you today?", true);
                
                // Add unread notification
                unreadMessages = 1;
                updateNotification();
            }, 2000);
        }
        
        // Social Media Links - Add hover effect for all social links
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                const platform = this.classList.contains('fa-instagram') ? 'Instagram' :
                               this.classList.contains('fa-facebook-f') ? 'Facebook' :
                               this.classList.contains('fa-pinterest-p') ? 'Pinterest' :
                               this.classList.contains('fa-tiktok') ? 'TikTok' : 'Twitter';
                
                // Add a tooltip effect
                this.setAttribute('title', `Follow us on ${platform}`);
            });
        });
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            renderFAQs();
            initChat();
        });
  