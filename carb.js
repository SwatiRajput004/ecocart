const cart = [
  { name: "Plastic Water Bottle", quantity: 2, carbon: 0.5 },
  { name: "Organic Apple (Local)", quantity: 5, carbon: 0.1 },
  { name: "Imported Avocado", quantity: 3, carbon: 0.8 },
  { name: "T-shirt (Cotton)", quantity: 1, carbon: 2.5 }
];

// Function to render cart and calculate total carbon impact
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('total-impact');
  let totalCarbon = 0;

  cart.forEach(item => {
    const itemImpact = item.quantity * item.carbon;
    totalCarbon += itemImpact;

    const card = document.createElement('div');
    card.className = 'col';
    card.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">
            Quantity: ${item.quantity} <br>
            Per Item CO₂: ${item.carbon} kg <br>
            ➤ Total: ${itemImpact.toFixed(2)} kg CO₂
          </p>
        </div>
      </div>
    `;
    cartContainer.appendChild(card);
  });

  totalElement.textContent = totalCarbon.toFixed(2);
}

// Call function on page load
renderCart();