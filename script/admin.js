// admin js
// creating a variable for the array to be saved into local storage
let products = []

// using a constructor function to create new objects
function Product(name, make, description, price, img) {
    this.name = name,
    this.make = make,
    this.description = description,
    this.price = price,
    this.img = img
}


// creating a button to add products into the products array
let btnAddItem = document.querySelector('[data-add-prod]')
btnAddItem.addEventListener('click', )