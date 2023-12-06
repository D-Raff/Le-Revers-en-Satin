// checkout js
let cart = JSON.parse(localStorage.getItem("cart"));

let cartDisplay = document.querySelector('[data-cart-list]')

function display() {
  let cartProducts = cart.map(function (item, index) {
    return `
      <tr>
      <td><img style="height: 300px;" src = "${item.url}"></td>
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
