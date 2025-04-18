
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: productPrice });

  localStorage.setItem('cart', JSON.stringify(cart));

  
  updateCartCount();
  updateCartPage();
}

function updateCartCount() {
  const cartCount = cart.length;
  document.querySelector('nav a[href="cart.html"]').textContent = `Cart (${cartCount})`;
}

function updateCartPage() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = ''; 

  let total = 0;

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);

    total += item.price;
  });

  cartTotal.innerHTML = `<p>Total: $${total.toFixed(2)}</p><button>Checkout</button>`;
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount();
  updateCartPage();
}

if (document.getElementById('cart-items')) {
  updateCartPage();
}

document.addEventListener('DOMContentLoaded', updateCartCount);
