// store js
// creating an empty array for the cart
let cart = [];

// creating a variable for the product table to add items to
let productTable = document.querySelector("[data-products]");

let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : localStorage.setItem(
      "products",
      JSON.stringify([
        {
          name: "Classic Black Tuxedo",
          make: "The Satin Lapel",
          price: 5000,
          img: "https://i.postimg.cc/FsWs2rGK/Screenshot_2023-12-02_215612.jpg",
        },
        {
          name: "Satin Lapeled Navy tuxedo",
          make: "The Satin Lapel",
          price: 6000,
          img: "https://i.postimg.cc/X7m6fpQ9/Screenshot_2023-12-02_220048.jpg",
        },
        {
          name: "Satin Lapeled Grey Tuxedo",
          make: "The Satin Lapel",
          price: 5000,
          img: "https://i.postimg.cc/FzKXZSMV/Screenshot_2023-12-02_220013.jpg",
        },
        {
          name: "Satin Lapel Silver Tuxedo",
          make: "The Satin Lapel",
          price: 7000,
          img: "https://i.postimg.cc/yxnY6sHv/Screenshot_2023-12-02_215521.jpg",
        },
        {
          name: " Classic Brown Leather Chlesea Boot",
          make: "The Satin Lapel",
          price: 1500,
          img: "https://i.postimg.cc/SSB9vrRP/Screenshot-2023-12-02-213835.jpg",
        },
      ])
    );

function showProducts() {
  productTable.innerHTML = "";
  if (products) {
    // loop through the product in array
    products.forEach((product,index) => {
      // Add product HTML to the productTable
      productTable.innerHTML += `
            <div class=" my-3 mx-3 prod-card">
            <img src="${product.img}" class=" card-img-top">
                <div class="card-body">
                <h5 class="card-text text-center">${product.name}<h5>
                    <p class="card-title text-center">${product.make}</p>
                    <p class="card-text text-center">R${product.price}.00</p>
                    <button value='${index}' type="button" class="cartBtn">Add to cart</button>
                </div>
            </div>
            `;
    });
  }
  // Display Spinner
  else {
    productTable.innerHTML = `<div class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>`;
  }
}

// Call the function to display products
showProducts();

let searchProducts = document.querySelector("[data-search]");

searchProducts.addEventListener("keyup", function () {
  try {
    let searchItem = products.filter(prod => {
      return prod.name
        .toLowerCase()
        .includes(searchProducts.value.toLowerCase());
    });

    if (searchItem.length > 0) {
      productTable.innerHTML = "";
      searchItem.forEach((item, index) => {
        productTable.innerHTML += `
        <div class=" my-3 mx-3 prod-card">
        <img src="${item.img}" class=" card-img-top">
            <div class="card-body">
            <h5 class="card-text text-center">${item.name}<h5>
                <p class="card-title text-center">${item.make}</p>
                <p class="card-text text-center">R${item.price}.00</p>
                <button value='${index}' type="button" class="cartBtn">Add to cart</button>
            </div>
        </div>
        `;
      });
    } else {
      productTable.innerHTML = `<h2 class="text-center">${searchProducts.value} was not found</h2>`;
    }
  } catch (e) {
    alert(e);
  }
});

let sortBtn = document.querySelector('[data-sort]');
sortBtn.addEventListener("click", ()=>{
    let sorted = products.sort((a, b) =>{
        // put the next item before the current (according to price)
        if(a.price < b.price ) return -1;
        // put the next item after the current (according to price)
        if(a.price > b.price ) return 1;
    });
    productTable.innerHTML = sorted.map(function(item,index){
        return`
        <div class=" my-3 mx-3 prod-card">
        <img src="${item.img}" class=" card-img-top">
            <div class="card-body">
            <h5 class="card-text text-center">${item.name}<h5>
                <p class="card-title text-center">${item.make}</p>
                <p class="card-text text-center">R${item.price}.00</p>
                <button value='${index}' type="button" class="cartBtn">Add to cart</button>
            </div>
        </div>
        `;
    }).join('');
});