import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from 'firebase/database'; // Make sure push is imported

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyA1Pc3jGJzm5zRaEj2Uuwdc1GyBJIqMno4",
  authDomain: "eco-cart-2ea77.firebaseapp.com",
  databaseURL: "https://eco-cart-2ea77-default-rtdb.firebaseio.com",
  projectId: "eco-cart-2ea77",
  storageBucket: "eco-cart-2ea77.firebasestorage.app",
  messagingSenderId: "1056864069685",
  appId: "1:1056864069685:web:ecd2ce2ec277105a5d697c",
  measurementId: "G-81DSHG2E5X"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Add sample products to Firebase
const sampleProducts = { /* ... your sample products object ... */ };

// UNCOMMENT ONE OF THE FOLLOWING TO WRITE DATA ONCE:

// Option 1: Overwrite the 'products' node
// set(productsRef, sampleProducts)
//   .then(() => console.log("Sample products written!"))
//   .catch(error => console.error("Error writing:", error));

// Option 2: Add each product as a new child (recommended for lists)
Object.values(sampleProducts).forEach(product => {
 push(productsRef, product)
    .then(() => console.log("Product added!"))
    .catch(error => console.error("Error adding:", error));
 });

// Get a reference to the 'products' node in your database
const productsRef = ref(db, 'products');

// Function to fetch products from Firebase and update the UI
function fetchProductsFromFirebase() {
  onValue(productsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Convert the Firebase data (which is an object) into an array
      const productsFromFirebase = Object.values(data);
      renderProducts(productsFromFirebase); // Call renderProducts with the fetched data
    } else {
      document.getElementById("productList").innerHTML = '<p>No products found.</p>';
    }
  });
}

// Initialize the data fetching
fetchProductsFromFirebase();

function calculateEcoRating(materialsScore, ethicsScore) {
  return Math.round((materialsScore + ethicsScore) / 2);
}

function createProductCard(product) {
  const rating = calculateEcoRating(product.materialsScore, product.ethicsScore);
  const badgeClass = rating >= 7 ? 'eco-badge' : 'badge bg-warning text-dark';

  return `
    <div class="col-md-6 col-lg-4">
      <div class="card product-card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text"><strong>Materials:</strong> ${product.materials}</p>
          <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
          <span class="${badgeClass}">Eco Rating: ${rating}/10</span>

          ${rating < 6 ? `
            <div class="alternative mt-3">
              <p class="mb-1 text-danger fw-semibold">Try a greener option:</p>
              <p class="mb-0"><strong>${product.alt}</strong> by <em>${product.altBrand}</em></p>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderProducts(productsToRender, filter = "") {
  const productList = document.getElementById("productList");
  const filtered = productsToRender.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );
  productList.innerHTML = filtered.map(createProductCard).join("");
}

document.getElementById("searchInput").addEventListener("input", function(e) {
  onValue(productsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const productsFromFirebase = Object.values(data);
      renderProducts(productsFromFirebase, e.target.value);
    }
  });
});

// The initial fetch is done in fetchProductsFromFirebase()