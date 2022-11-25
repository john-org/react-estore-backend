function getProducts() {
  document.querySelector(".products").innerHTML = ``;
  fetch(`api/products`)
    .then((response) => response.json())
    .then((data) => data.sort((a, b) => +b.price - +a.price))
    .then((products) => renderProducts(products));
}

function addProduct(event) {
  event.preventDefault();
  const { title, image, price, description } = event.target;
  const product = {
    title: title.value,
    image: image.value,
    price: price.value,
    description: description.value,
  };
  fetch("api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then(getProducts);
}

function renderProducts(products) {
  products.forEach((product) => {
    // destructure
    const { _id, title, image, price, description } = product;
    productEl = document.createElement("div");
    productEl.innerHTML = `
    <img src="img/${image}" />
    <h3><a href="detail.html?product=${_id}">${title}</a></h3>
    <p>${description}</p>
    <p>${price}</p>
    <button class="delete" data-id=${_id} href="#">Delete</button>
  `;
    return document.querySelector(".products").append(productEl);
  });
}

function deleteProduct(event) {
  fetch(`api/products/${event.target.dataset.id}`, {
    method: "DELETE",
  }).then(getProducts());
}

// new
function seed() {
  fetch("api/import").then(getProducts);
}

function handleClicks(event) {
  if (event.target.matches("[data-id]")) {
    deleteProduct(event);
  } else if (event.target.matches("#seed")) {
    seed();
  }
}

document.addEventListener("click", handleClicks);

const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", addProduct);

getProducts();
