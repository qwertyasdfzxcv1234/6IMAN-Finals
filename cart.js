let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Toggle items in cart
function toggleCartItem(product) {
  const index = cart.findIndex(item => item.name === product.name);
  if (index === -1) {
    cart.push(product);
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// Update visual indicators
function updateCartUI() {
  document.querySelectorAll('.belt1, .belt2, .belt3, .image-4, .image-5, .image-6, .image-9, .image-2, .img, .women .image-2, .women .image-3, .women .image-4, .women .image-5, .women .image-6').forEach(element => {
    const isInCart = cart.some(item => item.name === element.dataset.name);
    
    // Apply "belt-added" class only to belt elements
    if (element.classList.contains('belt1') || element.classList.contains('belt2') || element.classList.contains('belt3')) {
      element.classList.toggle('belt-added', isInCart); // Blur effect for belts
    } else {
      element.classList.toggle('item-added', isInCart); // Existing class for others
    }
  });
}

// Click handlers
document.querySelectorAll('.belt1, .belt2, .belt3, .image-4, .image-5, .image-6, .image-9, .image-2, .img, .women .image-2, .women .image-3, .women .image-4, .women .image-5, .women .image-6').forEach(item => {
  item.addEventListener('click', () => {
    const product = {
      name: item.dataset.name,
      price: parseInt(item.dataset.price),
      image: item.src // Add image source
    };
    toggleCartItem(product);
  });
});
document.getElementById('purchase-btn').addEventListener('click', function() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const notes = document.getElementById('order-notes').value;
  
  const orderDetails = {
    items: cartItems,
    notes: notes,
    total: cartItems.reduce((sum, item) => sum + item.price, 0),
    date: new Date().toLocaleString()
  };
  
  // Copy to clipboard
  navigator.clipboard.writeText(JSON.stringify(orderDetails, null, 2))
    .then(() => alert('Thank you for purchasing!'))
    .catch(err => console.error('Failed to copy:', err));
});
// Initialize UI
updateCartUI();

// Cart page display
document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalDiv = document.getElementById('cart-total');

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is currently empty.</p>';
    cartTotalDiv.textContent = '';
    return;
  }

  cartItemsDiv.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    total += item.price;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>₱${item.price.toLocaleString()}.00</p>
      </div>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  cartTotalDiv.textContent = `Total: ₱${total.toLocaleString()}.00`;
});