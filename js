// Check if user is logged in
function checkLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        showMainContent(user);
    } else {
        showLoginForm();
    }
}

// Show login form
function showLoginForm() {
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
}

// Show main content
function showMainContent(user) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-phone').textContent = user.phone;
}

// Toggle between login and register forms
document.getElementById('showRegister').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.register-form').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.register-form').style.display = 'none';
    document.querySelector('.login-form').style.display = 'block';
});

// Register form submission
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;

    // Generate random account (for demo purposes)
    const user = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        id: Date.now() // Simple ID
    };

    localStorage.setItem('user', JSON.stringify(user));
    alert('Registrasi berhasil! Selamat datang ' + name);
    showMainContent(user);
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email && user.password === password) {
        showMainContent(user);
    } else {
        alert('Email atau password salah!');
    }
});

// Logout
document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    checkLogin();
});

// Navigation
const menuLinks = document.querySelectorAll('nav .menu a');
const pages = document.querySelectorAll('.page');

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    });
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.qty += item.qty;
    } else {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Ditambahkan ke keranjang!');
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <span>${item.title} (x${item.qty})</span>
            <span>Rp ${(item.price * item.qty).toLocaleString()}</span>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += item.price * item.qty;
    });
    document.getElementById('cartTotal').textContent = total.toLocaleString();
}

// Modal functionality
const modal = document.getElementById('checkoutModal');
const btn = document.getElementById('checkoutBtn');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
    updateCartDisplay();
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Checkout form
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('checkoutName').value;
    const address = document.getElementById('checkoutAddress').value;

    if (cart.length === 0) {
        alert('Keranjang kosong!');
        return;
    }

    alert(`Pesanan berhasil! Terima kasih ${name}. Pesanan akan dikirim ke ${address}.`);
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    modal.style.display = 'none';
});

// Initialize
checkLogin();
