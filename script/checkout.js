let cart = JSON.parse(localStorage.getItem('cart'))

let cartItems = Object.groupBy(cart, item => item.name)

let cartDisplay = document.querySelector("[data-cart-list]");

let noItems = document.querySelector('[data-nothing]')

let cartTotal = document.querySelector("[data-total]");

let totalPrice = 0

function displaycart() {
  cartDisplay.innerHTML = ''
  if (cartItems) {
    for (let i in cartItems) {
      let itemPrices = cartItems[i][0].price * cartItems[i].length
      cartDisplay.innerHTML += `
              <tr class="prod-row">
                <td class="w-25"><img src="${cartItems[i][0].img}" data-cart-img></td>
                <td class="w-25">${cartItems[i][0].name}</td>
                <td class="w-25">${cartItems[i][0].description}</td>
                <td class="w-25">${cartItems[i].length}</td>
                <td class="w-25">R${itemPrices}</td>
              </tr>
            `
      totalPrice += +cartItems[i][0].price * cartItems[i].length;
    }
    cartTotal.value = `R${totalPrice}`
  } 
  else {
    noItems.innerHTML = `why wont this kak work`
  }
}
displaycart()


let clearBtn = document.querySelector('[data-clear]')

clearBtn.addEventListener('click', function () {
  localStorage.removeItem('cart')
  location.reload()
})