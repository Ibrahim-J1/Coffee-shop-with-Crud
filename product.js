document.addEventListener('DOMContentLoaded', function () {
  const productContainer = document.querySelector('.products-container');

  // Load products from localStorage
  const products = JSON.parse(localStorage.getItem('products')) || [];

  // Clear existing content
  productContainer.innerHTML = '';

  // Add products to the array
  products.push({
    image: 'images/mohaccino.jpg',
    name: 'Mohaccino',
    price: 'Tk. 244',
  });

  products.push({
    image: 'images/cafe glace.webp',
    name: 'Cafe Glace',
    price: 'Tk. 424',
  });

  products.push({
    image: 'images/americano-removebg-preview.png',
    name: 'Americano',
    price: 'Tk. 299',
  });

  products.push({
    image: 'images/flat white.jpg',
    name: 'Flat white',
    price: 'Tk. 356',
  });

  products.push({
    image: 'images/moucha_.jpg',
    name: 'Moucha',
    price: 'Tk. 494',
  });

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
