let cart = JSON.parse(localStorage.getItem('cart'))

let cartItems = Object.groupBy(cart, item=> item.name)

let cartDisplay = document.querySelector("[data-cart-list]");

let noItems = document.querySelector('[data-nothing]')

let cartTotal = document.querySelector("[data-total]");

let totalPrice = 0

function displaycart(){
    cartDisplay.innerHTML = ''
    if(cartItems){
        for(let i in cartItems){
          let itemPrices = cartItems[i][0].price * cartItems[i].length
            cartDisplay.innerHTML += `
              <tr class="prod-row">
                <td class="w-25" id="tableSpacing"><img src="${cartItems[i][0].img}" data-cart-img></td>
                <td id="tableSpacing">${cartItems[i][0].name}</td>
                <td id="tableSpacing">${cartItems[i][0].description}</td>
                <td id="tableSpacing">${cartItems[i].length}</td>
                <td id="tableSpacing">R${itemPrices}</td>
              </tr>
            `
            totalPrice += +cartItems[i][0].price * cartItems[i].length;
          }
          cartTotal.value = totalPrice
    }else{
    noItems.innerHTML = `<div class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>`
    }
}
displaycart()


let clearBtn = document.querySelector('[data-clear]')

clearBtn.addEventListener('click', function () {
  localStorage.removeItem('cart')
  displaycart()
})