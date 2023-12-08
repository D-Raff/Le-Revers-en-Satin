let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartItems = Object.groupBy(cart, (item) => item.name);

let cartDisplay = document.querySelector("[data-cart-list]");

let noItems = document.querySelector("[data-nothing]");

let cartTotal = document.querySelector("[data-total]");

let totalPrice = 0;

function displaycart() {
  cartDisplay.innerHTML = "";
  try {
    if (cartItems) {
      for (let i in cartItems) {
        let itemPrices = cartItems[i][0].price * cartItems[i].length;
        cartDisplay.innerHTML += `
              <tr class="prod-row">
                <td class="w-25"><img src="${cartItems[i][0].img}" data-cart-img></td>
                <td class="w-25">${cartItems[i][0].name}</td>
                <td class="w-25">${cartItems[i][0].description}</td>
                <td class="w-25">${cartItems[i].length}</td>
                <td class="w-25">R${itemPrices}</td>
              </tr>
            `;
        totalPrice += +cartItems[i][0].price * cartItems[i].length;
      }
      cartTotal.value = `R${totalPrice}`;
    }
    if (!cart.length) {
      document.querySelector(
        "[data-nothing]"
      ).innerHTML = `<div class="spinner-border text-success" role="status">
      <span class="visually-hidden"></span></div>
      </div>
      <div>Cart Is Empty</div>
      `;
      document.querySelector('[data-clear]').style.visibility="hidden"
      document.querySelector('[data-total]').style.visibility="hidden"
      document.querySelector('#total').style.visibility="hidden"
    }
  } catch (e) {
    alert(e);
  }
}
displaycart();

let clearBtn = document.querySelector("[data-clear]");

clearBtn.addEventListener("click", function () {
  localStorage.removeItem("cart");
  location.reload();
});
