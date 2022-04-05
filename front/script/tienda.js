let shoppingCartItemQuantity = [];
let itemsProductos = [];
let itemsProductosJson;
let cantidadCarrito;
document.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target && event.target.className.includes("addToCart")) {
    addToCartClicked(event);
  }
});

const comprarButton = document.querySelector(".comprarButton");

comprarButton.addEventListener("click", comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  ".shoppingCartItemsContainer"
);

function addToCartClicked(event) {
  event.preventDefault();
  const button = event.target;
  const item = button.closest(".item");
  const itemTitle = item.querySelector(".item-title").textContent;
  const itemPrice = item.querySelector(".item-price").textContent;
  const itemImage = item.querySelector(".item-image").src;

  itemsProductos = { title: itemTitle, unit_price: itemPrice };
  itemsProductosJson = JSON.stringify(itemsProductos);

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);

  console.log(itemsProductosJson);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    "shoppingCartItemTitle"
  );

  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        ".shoppingCartItemQuantity"
      );

      cantidadCarrito = elementQuantity.value++;
      $(".toast").toast("show");
      updateShoppingCartTotal();

      return;
    }
  }

  const shoppingCartRow = document.createElement("div");
  const shoppingCartContent = `<div class="row shoppingCartItem">
  <div class="col-6">
      <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-4">
          <img src='${itemImage}' class="shopping-cart-image">
          <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0" data-bs-target='${itemTitle}' type="hidden">
          ${itemTitle}
          </h6>
      </div>
  </div>
  <div class="col-2">
      <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <p class="item-price mb-0 shoppingCartItemPrice" type="hidden">${itemPrice}</p>
      </div>
  </div>
  <div class="col-4">
      <div
          class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
          <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
              value="1">
          <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
    `;

  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector(".buttonDelete")
    .addEventListener("click", removeshoppingCartItem);

  shoppingCartRow
    .querySelector(".shoppingCartItemQuantity")
    .addEventListener("change", quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;

  const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

  const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      ".shoppingCartItemPrice"
    );

    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace("$", "")
    );

    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      ".shoppingCartItemQuantity"
    );

    shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);

    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });

  shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}

function removeshoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest(".shoppingCartItem").remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;

  input.value <= 0 ? (input.value = 1) : updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = "";
  updateShoppingCartTotal();
  fetch("https://localhost/mp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: itemsProductosJson,
  });
}
