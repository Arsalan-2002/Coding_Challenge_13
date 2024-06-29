document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const errorContainer = document.getElementById('error-container');
    const loadingContainer = document.getElementById('loading-container');

    const fetchProducts = async () => {
        showLoading();
        try {
            const response = await fetch('https://course-api.com/react-store-products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            displayError(error.message);
        } finally {
            hideLoading();
        }
    };

    const displayProducts = (products) => {
        productContainer.innerHTML = ''; // Clear any existing content
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <div class="price">$${product.price}</div>
            `;

            productContainer.appendChild(productElement);
        });
    };

    const displayError = (errorMessage) => {
        errorContainer.innerHTML = `<p>Error: ${errorMessage}</p>`;
    };

    const showLoading = () => {
        loadingContainer.style.display = 'block';
    };

    const hideLoading = () => {
        loadingContainer.style.display = 'none';
    };

    fetchProducts();
});
