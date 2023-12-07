// store js
// creating an empty array for the cart
let cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];

// creating a variable for the product table to add items to
let productTable = document.querySelector("[data-products]");

// let products = JSON.parse(localStorage.getItem("products"));
let products = JSON.parse(localStorage.getItem('products')) ? JSON.parse(localStorage.getItem('products')) :
localStorage.setItem('products', JSON.stringify(
    [
    {
        "name": "classic black tuxedo",
        "make": "The Satin Lapel",
        "description": "A full classic tuxedo, complete with shirt, bowtie, pants and shoe style of your choice",
        "price": 5000,
        "img": "https://i.postimg.cc/TfGL5hDn/Screenshot-2023-12-02-215612.jpg",
    },
    {
        "name": "satin lapeled navy tux",
        "make": "The Satin Lapel",
        "description": "A full navy tuxedo with custom satin lapels, complete with shirt, bowtie/tie, pants and shoe style of your choice",
        "price": 6000,
        "img": "https://i.postimg.cc/JM47WXXY/Screenshot-2023-12-02-220048.jpg",
    },
    {
        "name": "satin lapeled grey tux",
        "make": "The Satin Lapel",
        "description": "A full grey tuxedo with custom satin lapels, complete with shirt, bowtie/tie, pants and shoe style of your choice",
        "price": 5000,
        "img": "https://i.postimg.cc/fzcWMj5p/Screenshot-2023-12-02-220013.jpg",
    },
    {
        "name": "satin lapeled silver tux",
        "make": "The Satin Lapel",
        "description": "A full silver tuxedo with custom satin lapels, complete with shirt, bowtie, pants and shoe style of your choice",
        "price": 7000,
        "img": "https://i.postimg.cc/yxnY6sHv/Screenshot-2023-12-02-215521.jpg",
    },
    {
        "name": "Classic chelsea boot",
        "make": "The Satin Lapel",
        "description": "The classic chelsea boot, good fit with most outfits. Available in a color of your choosing, with suede material options",
        "price": 1500,
        "img": "https://i.postimg.cc/SSB9vrRP/Screenshot-2023-12-02-213835.jpg",
    },
    {
        "name": "leather oxford shoes",
        "make": "The Satin Lapel",
        "description": "The Oxford shoe, perfect for formal occasions and events. Available in black or brown leather",
        "price": 1200,
        "img": "https://i.postimg.cc/YMwgNbJG/Screenshot-2023-12-02-214225.jpg",
    },
    {
        "name": "Air-King",
        "make": "Rolex",
        "description": "A gentleman's classic. The beautiful black metal rendition of style and class",
        "price": 50000,
        "img": "https://i.postimg.cc/gzYQ6Vmf/domino-p2-WUEFGr-Ad-A-unsplash.jpg",
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
            <div class="card my-3 mx-3 prod-card">
            <img src="${product.img}" class=" card-img-top">
                <div class="card-body">
                <h5 class="card-text text-center">${product.name}<h5>
                    <p class="card-title text-center">${product.make}</p>
                    <p class="card-title text-center">${product.description}</p>
                    <p class="card-text text-center">R${product.price}.00</p>
                    </div>
                    
                    <div class="card-footer"><button data-toCart value='${index}' type="button" class="cartBtn">Add to cart</button></div>
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
        <div class="card my-3 mx-3 prod-card">
        <img src="${item.img}" class=" card-img-top">
            <div class="card-body">
            <h5 class="card-text text-center">${item.name}<h5>
                <p class="card-title text-center">${item.make}</p>
                <p class="card-title text-center">${item.description}</p>
                <p class="card-text text-center">R${item.price}.00</p>
                
            </div>
            <div class="card-footer"><button value='${index}' type="button" class="cartBtn">Add to cart</button></div>
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

