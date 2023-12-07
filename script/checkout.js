// checkout js
let cart = JSON.parse(localStorage.getItem("cart"));

let cartDisplay = document.querySelector('[data-cart-list]')

function display() {
  let cartProducts = cart.map(function (item, index) {
    return `
      <tr>
      <td><img data-cart-img style="height: 300px;" src = "${item.img}"></td>
      <td>${item.name}</td>
      <td>${item.make}</td>
      <td>${item.description}</td>
      <td>${item.price}</td>
      <td><button class = "edit" value = '${index}' data-edit>edit</button></td>
      <td><button class = "delete" value = '${index}' data-delete>delete</button></td>
      </tr>
      `;
  });
  let cartBtns = cart.map(function (item, index) {
    return `
      <tr>
      <td><img data-cart-img style="height: 300px;" src = "${item.img}"></td>
      <td>${item.name}</td>
      <td>${item.make}</td>
      <td>${item.description}</td>
      <td>${item.price}</td>
      <td><button class = "edit" value = '${index}' data-edit>edit</button></td>
      <td><button class = "delete" value = '${index}' data-delete>delete</button></td>
      </tr>
      `;
  });

  cartDisplay.innerHTML = cartProducts.join("");
}
// calling the display function to display all items
display();

function update() {
  // updating the local storage with the current items in the array
  localStorage.setItem("cart", JSON.stringify(cart));
  // then updating the current array with items added to the localstorage
  products = JSON.parse(localStorage.getItem("cart"));
}

function removeItem(position) {
  // removing the item from the array
  cart.splice(position, 1);
  console.log(cart);
  // updating the array in localstorage
  update(); // updating the array
  display(); //displaying all items
}

cartDisplay.addEventListener("click", function () {
  if (event.target.classList.contains("delete")) {
    // refer to the button again. the button now becomes the event.target
    // parse the button in the remove function
    removeItem(event.target.value, display());
    // get the value of the button
    //alert(event.target.value) // we will get an alert of the index of the button
  }
});
