document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://course-api.com/react-store-products');
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const displayProducts = (products) => {
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

    fetchProducts();
});
