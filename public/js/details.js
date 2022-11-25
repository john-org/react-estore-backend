function showDetail() {
  document.querySelector(".product").innerHTML = ``;
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product");

  fetch(`api/products/${productId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((product) => renderProduct(product));
}

function renderProduct(product) {
  const { image, title, description } = product;

  productEl = document.createElement("div");
  productEl.innerHTML = `
    <img src="img/${image}" />
    <h3>${title}</h3>
    <p>${description}</p>
    <a href="/">Back</a>
    `;

  editForm.title.value = title;
  editForm.image.value = image;
  editForm.description.value = description;

  document.querySelector(".product").append(productEl);
}

const updateProduct = (event) => {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product");
  const { title, image, description } = event.target;
  const updatedProduct = {
    _id: productId,
    title: title.value,
    image: image.value,
    description: description.value,
  };
  fetch(`api/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(showDetail);
};

const editForm = document.querySelector("#editForm");
editForm.addEventListener("submit", updateProduct);

showDetail();
