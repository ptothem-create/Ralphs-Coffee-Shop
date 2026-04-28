
// Wait for page to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart system loaded');
    
    // Update cart count on every page
    updateCartCount();
    
    // Setup all add to cart buttons
    setupAddToCartButtons();
    
    // If we're on cart page, render the cart
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
});

// cart local storage

// Get cart from localStorage
function getCart() {
    try {
        const cart = localStorage.getItem('coffeeCart');
        if (cart) {
            return JSON.parse(cart);
        }
    } catch(e) {
        console.log('Error loading cart:', e);
    }
    return [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('coffeeCart', JSON.stringify(cart));
    updateCartCount();
}

// cart count badge

function updateCartCount() {
    const cart = getCart();
    let totalItems = 0;
    
    for (let i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }
    
    const cartSpans = document.querySelectorAll('#cartCount');
    for (let i = 0; i < cartSpans.length; i++) {
        const span = cartSpans[i];
        if (totalItems > 0) {
            span.textContent = totalItems;
            span.style.display = 'inline-block';
        } else {
            span.textContent = '';
            span.style.display = 'none';
        }
    }
}

// add to cart function

function addItemToCart(name, price, image) {
    console.log('Adding to cart:', name, price, image);
    
    let cart = getCart();
    let found = false;
    
    // Check if item already exists
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity += 1;
            found = true;
            break;
        }
    }
    
    // If not found, add new item
    if (!found) {
        cart.push({
            id: Date.now() + Math.random(),
            name: name,
            price: parseFloat(price),
            image: image,
            quantity: 1
        });
    }
    
    saveCart(cart);
    showNotification('✓ Added to Cart!');
}

// remove from cart function

function removeCartItem(id) {
    let cart = getCart();
    let newCart = [];
    
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== id) {
            newCart.push(cart[i]);
        }
    }
    
    saveCart(newCart);
    
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
}

// update quantity

function updateCartQuantity(id, newQuantity) {
    if (newQuantity < 1) {
        removeCartItem(id);
        return;
    }
    
    let cart = getCart();
    
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = newQuantity;
            break;
        }
    }
    
    saveCart(cart);
    
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
}

// notification badge

function showNotification(message) {
    // Remove any existing notification
    const oldNotif = document.querySelector('.cart-notification');
    if (oldNotif) {
        oldNotif.remove();
    }
    
    // Create new notification
    const notif = document.createElement('div');
    notif.className = 'cart-notification';
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #2e7d32;
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 16px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(function() {
        notif.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(function() {
            if (notif.parentNode) {
                notif.remove();
            }
        }, 300);
    }, 2000);
}

// Add animation styles if not exists
if (!document.querySelector('#cart-animations')) {
    const style = document.createElement('style');
    style.id = 'cart-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// setup add to cart buttons
function setupAddToCartButtons() {
    // Find all Add to Cart buttons
    const buttons = document.querySelectorAll('.addCart');
    console.log('Found add to cart buttons:', buttons.length);
    
    for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];
        
        // Remove old listener to avoid duplicates
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Add new click listener
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add to cart clicked');
            
            // Try to get product info
            let name = '';
            let price = '';
            let image = '';
            
            // Method 1: Get from data attributes
            if (this.dataset.name) {
                name = this.dataset.name;
                price = this.dataset.price;
                image = this.dataset.image;
            }
            
            // Method 2: Get from parent card
            if (!name) {
                // Find the closest product card
                let card = this.closest('.clsEsp, .Italiano, .supLat, .vanLat, .ecold, .Tro, .sign, .amr, .proEspMac1, .proEspMac2, .preburr1, .preburr2, .french1, .french2, .pour1, .pour2, .deal-card, .card');
                
                if (!card) {
                    card = this.parentElement;
                    while (card && !card.classList.contains('clsEsp') && !card.classList.contains('deal-card')) {
                        card = card.parentElement;
                    }
                }
                
                if (card) {
                    // Get title
                    const titleEl = card.querySelector('h3, .Tit, .clsTit, .itaTit, .supTit, .vanTit, .ecoldTit, .troTit, .signTit, .amrTit, h2');
                    if (titleEl) {
                        name = titleEl.innerText.trim();
                        // Remove line breaks from title
                        name = name.replace(/\n/g, ' ').replace(/<br>/g, ' ');
                    }
                    
                    // Get price
                    const priceEl = card.querySelector('.Price, .new');
                    if (priceEl) {
                        let priceText = priceEl.innerText;
                        price = priceText.replace('$', '').trim();
                    }
                    
                    // Get image
                    const imgEl = card.querySelector('img');
                    if (imgEl && imgEl.src) {
                        image = imgEl.src;
                    }
                }
            }
            
            // Method 3: Manual mapping for specific products
            if (!name || !price) {
                const buttonText = this.innerText;
                const parentHTML = this.parentElement ? this.parentElement.innerHTML : '';
                
                // Coffee Selection page products
                if (parentHTML.includes('Classical Espresso') || buttonText.includes('Classical')) {
                    name = 'Classical Espresso';
                    price = '24.99';
                    image = 'ClassicalEspresso.jpg';
                } else if (parentHTML.includes('Espresso Italiano')) {
                    name = 'Espresso Italiano';
                    price = '26.99';
                    image = 'EspressoItaliano.jpg';
                } else if (parentHTML.includes('Supreme Latte Blend')) {
                    name = 'Supreme Latte Blend';
                    price = '19.99';
                    image = 'SupremeLatte.jpg';
                } else if (parentHTML.includes('Vanilla Latte Blend')) {
                    name = 'Vanilla Latte Blend';
                    price = '21.99';
                    image = 'VanillaLatte.jpg';
                } else if (parentHTML.includes('Elite Cold Brew')) {
                    name = 'Elite Cold Brew';
                    price = '22.99';
                    image = 'EliteCold.jpg';
                } else if (parentHTML.includes('Tropical Cold Brew')) {
                    name = 'Tropical Cold Brew';
                    price = '23.99';
                    image = 'TropicalCold.jpg';
                } else if (parentHTML.includes('Signature Premium Blend')) {
                    name = 'Signature Premium Blend';
                    price = '32.99';
                    image = 'SignaturePreBlend.jpg';
                } else if (parentHTML.includes('Americano')) {
                    name = 'Americano';
                    price = '28.99';
                    image = 'Americano.jpg';
                }
                // Brewing Equipment page products
                else if (parentHTML.includes('Professional Espresso')) {
                    name = 'Professional Espresso Machine';
                    price = '1299.99';
                    image = 'proEspMac.jpg';
                } else if (parentHTML.includes('Home Espresso Maker')) {
                    name = 'Home Espresso Maker';
                    price = '599.99';
                    image = 'proEspMac.jpg';
                } else if (parentHTML.includes('Premium Burr Grinder')) {
                    name = 'Premium Burr Grinder';
                    price = '349.99';
                    image = 'PreburrGrin.jpg';
                } else if (parentHTML.includes('Manual Coffee Grinder')) {
                    name = 'Manual Coffee Grinder';
                    price = '89.99';
                    image = 'PreburrGrin.jpg';
                } else if (parentHTML.includes('Luxury French Press')) {
                    name = 'Luxury French Press';
                    price = '799.99';
                    image = 'press.jpg';
                } else if (parentHTML.includes('Classic French Press')) {
                    name = 'Classic French Press';
                    price = '599.99';
                    image = 'claPre.jpg';
                } else if (parentHTML.includes('Pour Over Kit')) {
                    name = 'Pour Over Kit';
                    price = '129.99';
                    image = 'pour.jpg';
                } else if (parentHTML.includes('Ceramic Pour Over')) {
                    name = 'Ceramic Pour Over Dripper';
                    price = '59.99';
                    image = 'pour.jpg';
                }
                // Offer page products
                else if (parentHTML.includes('Spring Coffee Bundle')) {
                    name = 'Spring Coffee Bundle';
                    price = '49.99';
                    image = 'https://images.unsplash.com/photo-1638126687923-31912a6ee0ff?w=400';
                } else if (parentHTML.includes('Barista Starter Kit')) {
                    name = 'Barista Starter Kit';
                    price = '199.99';
                    image = 'https://images.unsplash.com/photo-1634709170162-23a76022e9c9?w=400';
                } else if (parentHTML.includes('Monthly Coffee Sampler')) {
                    name = 'Monthly Coffee Sampler';
                    price = '59.99';
                    image = 'https://images.unsplash.com/photo-1646325742177-21f298f470c6?w=400';
                }
            }
            
            // Default image if none found
            if (!image) {
                image = 'https://via.placeholder.com/80x80?text=Coffee';
            }
            
            // Add to cart if we have name and price
            if (name && price) {
                addItemToCart(name, price, image);
            } else {
                console.warn('Could not identify product:', this);
                alert('Please add data attributes to this product button.');
            }
        });
    }
}

// render card page

function renderCartPage() {
    const cart = getCart();
    const container = document.querySelector('.cart-container');
    
    if (!container) {
        console.log('Cart container not found');
        return;
    }
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart" style="text-align: center; padding: 60px 20px;">
                <i class="bi bi-cart-x" style="font-size: 80px; color: #ccc;"></i>
                <h2 style="color: #4a1a1a; margin: 20px 0 10px;">Your cart is empty</h2>
                <p style="color: #888; margin-bottom: 30px;">Discover our premium coffee collection.</p>
                <a href="Selection.html" style="display: inline-block; background: #8b0000; color: white; padding: 12px 30px; border-radius: 30px; text-decoration: none;">Explore Collection</a>
            </div>
        `;
        return;
    }
    
    // Calculate totals
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].quantity;
    }
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    // Build cart items HTML
    let itemsHtml = '';
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        itemsHtml += `
            <div class="cart-item" style="display: flex; align-items: center; gap: 20px; background: white; padding: 20px; border-radius: 15px; margin-bottom: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); flex-wrap: wrap;">
                <div style="width: 80px; height: 80px; flex-shrink: 0;">
                    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" onerror="this.src='https://via.placeholder.com/80x80?text=Coffee'">
                </div>
                <div style="flex: 2; min-width: 150px;">
                    <h3 style="color: #4a1a1a; margin: 0 0 5px;">${item.name}</h3>
                    <p style="color: #8b0000; font-weight: bold; margin: 0;">$${item.price.toFixed(2)}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <button class="qty-minus" data-id="${item.id}" style="background: #f0f0f0; border: none; width: 32px; height: 32px; border-radius: 8px; font-size: 18px; cursor: pointer;">-</button>
                    <span style="font-size: 18px; min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button class="qty-plus" data-id="${item.id}" style="background: #f0f0f0; border: none; width: 32px; height: 32px; border-radius: 8px; font-size: 18px; cursor: pointer;">+</button>
                </div>
                <div style="min-width: 80px; text-align: center; font-weight: bold; color: #4a1a1a;">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <div>
                    <button class="remove-item" data-id="${item.id}" style="background: transparent; border: none; font-size: 22px; cursor: pointer; color: #999;">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 40px;">
            <div style="flex: 2; min-width: 280px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #e0e0e0;">
                    <h2 style="color: #4a1a1a; margin: 0;">Shopping Cart</h2>
                    <p style="color: #888;">${cart.length} item${cart.length !== 1 ? 's' : ''}</p>
                </div>
                <div class="cart-items-list">
                    ${itemsHtml}
                </div>
            </div>
            <div style="flex: 1; min-width: 250px; background: white; border-radius: 20px; padding: 25px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); height: fit-content;">
                <h3 style="color: #4a1a1a; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #e0e0e0;">Order Summary</h3>
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span>Tax (10%)</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 2px solid #e0e0e0; font-weight: bold; font-size: 20px;">
                    <span>Total</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <button id="checkoutBtn" style="width: 100%; background: #8b0000; color: white; border: none; padding: 15px; border-radius: 12px; font-size: 16px; font-weight: bold; cursor: pointer; margin-top: 25px;">Proceed to Checkout</button>
                <a href="Selection.html" style="display: block; text-align: center; margin-top: 15px; color: #8b0000; text-decoration: none;">Continue Shopping</a>
            </div>
        </div>
    `;
    
    // Add event listeners for buttons
    const minusBtns = document.querySelectorAll('.qty-minus');
    for (let i = 0; i < minusBtns.length; i++) {
        minusBtns[i].addEventListener('click', function() {
            const id = parseFloat(this.dataset.id);
            const item = getCart().find(i => i.id === id);
            if (item) {
                updateCartQuantity(id, item.quantity - 1);
            }
        });
    }
    
    const plusBtns = document.querySelectorAll('.qty-plus');
    for (let i = 0; i < plusBtns.length; i++) {
        plusBtns[i].addEventListener('click', function() {
            const id = parseFloat(this.dataset.id);
            const item = getCart().find(i => i.id === id);
            if (item) {
                updateCartQuantity(id, item.quantity + 1);
            }
        });
    }
    
    const removeBtns = document.querySelectorAll('.remove-item');
    for (let i = 0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener('click', function() {
            const id = parseFloat(this.dataset.id);
            removeCartItem(id);
        });
    }
    
    const checkoutBtn = document.querySelector('#checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Thank you for your purchase! ');
        });
    }
}