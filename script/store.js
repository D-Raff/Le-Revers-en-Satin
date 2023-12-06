// store js
// creating an empty array for the cart
let cart = [];

// creating a variable for the product table to add items to
let productTable = document.querySelector("[data-products]");

// let products = JSON.parse(localStorage.getItem("products"));
let products = JSON.parse(localStorage.getItem('products')) ? JSON.parse(localStorage.getItem('products')) :
localStorage.setItem('products', JSON.stringify(
    [
    {
        "name": "classic black tuxedo",
        "make": "The Satin Lapel",
        "description": "",
        "price": 5000,
        "img": "https://i.postimg.cc/28QgBc5r/ed929619-a18f-484e-9543-6b401a5df5c5.jpg",
    },
    {
        "name": "satin lapeled navy tux",
        "make": "The Satin Lapel",
        "description": "",
        "price": 6000,
        "img": "https://i.postimg.cc/MKnv6BZ7/97222de9-ff18-487e-a3d4-6b67901dc366.jpg",
    },
    {
        "name": "satin lapeled grey tux",
        "make": "The Satin Lapel",
        "description": "",
        "price": 5000,
        "img": "https://i.postimg.cc/v830RJD1/bd5b3354-1884-4590-8e35-a38694c0802c.jpg",
    },
    {
        "name": "satin lapeled silver tux",
        "make": "The Satin Lapel",
        "description": "",
        "price": 7000,
        "img": "https://i.postimg.cc/gcXDxNDj/a6d62e2e-beef-45fb-a1cf-cd0f4a3913c3.jpg",
    },
    {
        "name": "Classic lather chelsea boot",
        "make": "The Satin Lapel",
        "description": "",
        "price": 1500,
        "img": "https://i.postimg.cc/7LWRZvwr/photo-1607006411601-775c8cc632dc-blend-000000-blend-alpha-10-blend-mode-normal-blend-w-1-crop-faces.jpg",
    },
    {
        "name": "leather oxford shoes",
        "make": "The Satin Lapel",
        "description": "",
        "price": 120,
        "img": "https://i.postimg.cc/CxRZBsXn/s-l1200.jpg",
    },
    {
        "name": "Air-King",
        "make": "Rolex",
        "description": "",
        "price": 80,
        "img": "https://i.postimg.cc/PT7KKXQh/7-cc45b47e-d917-45c5-8957-387f24ad8c3d-1080x.jpg",
    },
    
]
));

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
                    <button data-toCart value='${index}' type="button" class="cartBtn">Add to cart</button>
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

function addToCart(index) {
  cart.push(products[index])

  localStorage.setItem('cart', JSON.stringify(cart))
}
productTable.addEventListener('click', function(){
  if(event.target.hasAttribute('data-toCart')){
    addToCart(event.target.value)
  }
})


// search finctionality
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

// sorting functioniality
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

