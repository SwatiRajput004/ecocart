const products = [
      {
        name: "Organic Cotton T-Shirt",
        materials: "Organic Cotton",
        brand: "EcoWear",
        materialsScore: 9,
        ethicsScore: 8,
        alt: "Recycled Cotton Tee",
        altBrand: "GreenStyle"
      },
      {
        name: "Plastic Water Bottle",
        materials: "Plastic",
        brand: "CheapBrand",
        materialsScore: 2,
        ethicsScore: 3,
        alt: "Stainless Steel Bottle",
        altBrand: "HydroLife"
      },
      {
        name: "Bamboo Toothbrush",
        materials: "Bamboo",
        brand: "EcoBrush",
        materialsScore: 8,
        ethicsScore: 9,
        alt: "Recycled Plastic Brush",
        altBrand: "GreenBrush"
      },
      {
        name: "Synthetic Shoes",
        materials: "Synthetic Leather",
        brand: "FastStep",
        materialsScore: 4,
        ethicsScore: 3,
        alt: "Vegan Eco Shoes",
        altBrand: "StepGreen"
      },
      {
        name: "Cotton braided",
        materials: "cotton",
        brand: "Generic",
        materialsScore: 8,
        ethicsScore: 8,
        alt: "Vegan Eco slipper",
        altBrand: "StepGreen"
      },
      {
      name: "Dress",
        materials: " Organic cotton",
        brand: "Proearth by Azorte",
        materialsScore: 4,
        ethicsScore: 6,
        alt: "Vegan Eco Dress",
        altBrand: "StepGreen"
      }
    ]

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