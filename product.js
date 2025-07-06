document.addEventListener('DOMContentLoaded', function () {
  const productContainer = document.querySelector('.products-container');

  // Load products from localStorage
  const products = JSON.parse(localStorage.getItem('products')) || [];

  // Clear existing content
  productContainer.innerHTML = '';

  // Render each product
  products.forEach(product => {
    const box = document.createElement('div');
    box.classList.add('box');
    
    box.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="content">
        <span>Tk. ${product.price}</span>
        <a href="#">Add to cart</a>
      </div>
    `;


    productContainer.appendChild(box);
  });
});
