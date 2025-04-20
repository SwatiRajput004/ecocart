

import { getDatabase } from "firebase/database";

const database = getDatabase();


import { initializeApp } from "firebase/app";




const firebaseConfig = {
  apiKey: "AIzaSyA1Pc3jGJzm5zRaEj2Uuwdc1GyBJIqMno4",
  authDomain: "eco-cart-2ea77.firebaseapp.com",
  databaseURL: "https://eco-cart-2ea77-default-rtdb.firebaseio.com",
  projectId: "eco-cart-2ea77",
  storageBucket: "eco-cart-2ea77.firebasestorage.app",
  messagingSenderId: "1056864069685",
  appId: "1:1056864069685:web:ecd2ce2ec277105a5d697c",
  measurementId: "G-81DSHG2E5X"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);









const sampleProducts = {
  product1: {
      name: "Eco-Friendly Water Bottle",
      brand: "GreenLife",
      price: 24.99,
      ecoScore: 9,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600",
      sustainabilityFeatures: [
          "100% Recycled Materials",
          "Plastic-Free",
          "Carbon Neutral"
      ]
  },
  product2: {
      name: "Bamboo Cutlery Set",
      brand: "EcoEats",
      price: 19.99,
      ecoScore: 8,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FBamboo-Bae-Cutlery-Friendly-Handcrafted%2Fdp%2FB099NFQ4L7&psig=AOvVaw2z8964oRUV6-bsZsJuPs5s&ust=1744948856577000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDhgqSX3owDFQAAAAAdAAAAABAQ",
      sustainabilityFeatures: [
          "Biodegradable",
          "Sustainably Harvested",
          "Zero Waste"
      ]
  },
  product3: {
      name: "Organic Cotton Tote",
      brand: "PureCarry",
      price: 29.99,
      ecoScore: 7,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.etsy.com%2Fin-en%2Flisting%2F853026085%2Ffern-organic-cotton-tote-bag-reusable&psig=AOvVaw0US2avgsrvcHKH2XHELBVH&ust=1744948933973000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjErMmX3owDFQAAAAAdAAAAABAE",
      sustainabilityFeatures: [
          "Organic Materials",
          "Fair Trade",
          "Reusable"
      ]
  },
  product4: {
      name: "Solar Power Bank",
      brand: "EcoCharge",
      price: 49.99,
      ecoScore: 8,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstockcake.com%2Fi%2Fsolar-power-bank_1354901_617234&psig=AOvVaw2vLDTQ8qi__xX6lnsmFpQf&ust=1744948989591000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJiYo-SX3owDFQAAAAAdAAAAABAE",
      sustainabilityFeatures: [
          "Solar Powered",
          "Recycled Electronics",
          "Long Lifespan"
      ]
  },
  product5: {
      name: "Natural Cleaning Kit",
      brand: "CleanGreen",
      price: 34.99,
      ecoScore: 9,
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=600",
      sustainabilityFeatures: [
          "Non-Toxic",
          "Biodegradable",
          "Refillable"
      ]
  },
  product6: {
      name: "Recycled Paper Notebook",
      brand: "EcoWrite",
      price: 14.99,
      ecoScore: 6,
      image: "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?auto=format&fit=crop&q=80&w=600",
      sustainabilityFeatures: [
          "100% Recycled",
          "Tree-Free",
          "Plastic-Free Packaging"
      ]
  }
};

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

    function renderProducts(filter = "") {
      const productList = document.getElementById("productList");
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      );
      productList.innerHTML = filtered.map(createProductCard).join("");
    }

    document.getElementById("searchInput").addEventListener("input", function(e) {
      renderProducts(e.target.value);
    });

    // Initial render
    renderProducts();