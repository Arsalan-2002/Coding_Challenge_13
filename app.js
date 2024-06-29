//U32196076

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const errorContainer = document.getElementById('error-container');
    const loadingContainer = document.getElementById('loading-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    let products = [];
    let currentIndex = 0;

    const fetchProducts = async () => {
        showLoading();
        try {
            const response = await fetch('https://course-api.com/react-store-products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            products = await response.json();
            if (products.length > 0) {
                displayProduct(currentIndex);
            } else {
                displayError('No products available.');
            }
        } catch (error) {
            displayError(error.message);
        } finally {
            hideLoading();
        }
    };

    const displayProduct = (index) => {
        productContainer.innerHTML = ''; // Clear any existing content
        const product = products[index];
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <div class="price">$${product.price}</div>
        `;

        productContainer.appendChild(productElement);
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

    const showPreviousProduct = () => {
        if (products.length > 0) {
            currentIndex = (currentIndex === 0) ? products.length - 1 : currentIndex - 1;
            displayProduct(currentIndex);
        }
    };

    const showNextProduct = () => {
        if (products.length > 0) {
            currentIndex = (currentIndex === products.length - 1) ? 0 : currentIndex + 1;
            displayProduct(currentIndex);
        }
    };

    prevButton.addEventListener('click', showPreviousProduct);
    nextButton.addEventListener('click', showNextProduct);

    fetchProducts();
});
