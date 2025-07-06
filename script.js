let products = JSON.parse(localStorage.getItem('products')) || [];

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';

  products.forEach((product, index) => {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.innerHTML = `
      <div class="index">
        <img src="${product.image}" alt="${product.name}" width="100">
        <strong>${product.name}</strong>
      </div> 
      Tk. ${product.price}
      <div class="btn-pdt">
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function editProduct(index) {
  const product = products[index];
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-id').value = index;
  imagePreview.src = product.image; // set preview image
}

function deleteProduct(index) {
  products.splice(index, 1);
  saveProducts();
  renderProducts();
}

// 🟩 Image Preview Setup
const imageInput = document.getElementById('product-image');
const imagePreview = document.getElementById('image-preview');
const placeholderImage = 'images/Upload.jpg'; // ✅ Update this path to your actual placeholder

imagePreview.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      imagePreview.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

// 🟩 Form Submit
document.getElementById('product-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('product-name').value.trim();
  const price = document.getElementById('product-price').value.trim();
  const id = document.getElementById('product-id').value;
  const file = imageInput.files[0];

  // Function to finalize and reset
  function finishUpdate() {
    saveProducts();
    renderProducts();
    document.getElementById('product-form').reset();
    imageInput.value = '';
    imagePreview.src = placeholderImage;
    document.getElementById('product-id').value = '';
  }

  // 🟡 EDIT PRODUCT
  if (id !== '') {
    const existingProduct = products[id];

    // If new image selected
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        products[id] = {
          name: name || existingProduct.name,
          price: price || existingProduct.price,
          image: reader.result
        };
        finishUpdate();
      };
      reader.readAsDataURL(file);
    } else {
      // Keep old image
      products[id] = {
        name: name || existingProduct.name,
        price: price || existingProduct.price,
        image: existingProduct.image
      };
      finishUpdate();
    }

  } else {
    // 🟢 CREATE NEW PRODUCT
    if (!file) return alert("Please select an image.");

    const reader = new FileReader();
    reader.onload = function () {
      const newProduct = {
        name,
        price,
        image: reader.result
      };
      products.push(newProduct);
      finishUpdate();
    };
    reader.readAsDataURL(file);
  }
});

renderProducts();