// store js
// creating an empty array for the cart
let cart = [];

// creating a variable for the product table to add items to
let productTable = document.querySelector("[data-products]");

let products = JSON.parse(localStorage.getItem('products')) ? JSON.parse(localStorage.getItem('products')) :
localStorage.setItem('products', JSON.stringify(
    [
    {
        "name": "Classic Black Tuxedo",
        "make": "The Satin Lapel",
        "amount": 5000,
        "img": "https://i.postimg.cc/FsWs2rGK/Screenshot_2023-12-02_215612.jpg",
    },
    {
        "name": "Satin Lapeled Navy tuxedo",
        "make": "The Satin Lapel",
        "amount": 6000,
        "img": "https://i.postimg.cc/X7m6fpQ9/Screenshot_2023-12-02_220048.jpg",
    },
    {
        "name": "Satin Lapeled Grey Tuxedo",
        "make": "The Satin Lapel",
        "amount": 5000,
        "img": "https://i.postimg.cc/FzKXZSMV/Screenshot_2023-12-02_220013.jpg",
    },
    {
        "name": "Satin Lapel Silver Tuxedo",
        "make": "The Satin Lapel",
        "amount": 7000,
        "img": "https://i.postimg.cc/yxnY6sHv/Screenshot_2023-12-02_215521.jpg",
    },
    {
        "name": " Classic Brown Leather Chlesea Boot",
        "make": "The Satin Lapel",
        "amount": 1500,
        "img": "https://i.postimg.cc/SSB9vrRP/Screenshot-2023-12-02-213835.jpg",
    },
    
]
));


function showProducts() {
    productTable.innerHTML = ""
    if (products) {
        // loop through the product in array
        products.forEach(product => {
            // Add product HTML to the productTable
            productTable.innerHTML += `
            <div class=" my-3 mx-3 prod-card">
            <img src="${product.img}" class=" card-img-top">
                <div class="card-body">
                <h5 class="card-text text-center">${product.name}<h5>
                    <p class="card-title text-center">${product.make}</p>
                    <p class="card-text text-center">R${product.amount}.00</p>
                    <button value type="button" class="cartBtn">Add to cart</button>
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

let searchProducts = document.querySelector('[data-search]')

searchProducts.addEventListener('keyup',  function(){
    try {
        let searchItem = products.filter(prod => {
            return prod.make.toLowerCase().includes(searchProducts.value.toLowerCase());
        });

        if (searchItem.length > 0) {
            productTable.innerHTML = "";
            searchItem.forEach(item => {
                productTable.innerHTML += `
                    <div class="card prod-card">
                        <img src="${item.img}" class="card-img-top" style="height: 300px; object-fit: cover;"></img>
                        <div class="card-body">
                            <h5 class="card-title text-center">${item.make}</h5>
                            <p class="card-text text-center">${item.name}</p>
                            <p class="card-text text-center">R${item.amount}.00</p>
                            <a href="#" class="btn btn-dark d-flex justify-content-center">Add to Cart</a>
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