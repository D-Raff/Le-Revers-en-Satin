// admin js
// creating a variable for the array to be saved into local storage
let products = [];

// using a constructor function to create new objects
function Product(name, make, description, price, img) {
  (this.name = name),
    (this.make = make),
    (this.description = description),
    (this.price = price),
    (this.img = img);
}

// creating a button to add products into the products array
let btnAddItem = document.querySelector("[data-save-prod]");
btnAddItem.addEventListener("click", () => {
  // creating variables for inputs
  let Name = document.querySelector("[data-name]");
  let Make = document.querySelector("[data-make]");
  let Description = document.querySelector("[data-description]");
  let Price = document.querySelector("[data-price]");
  let Img = document.querySelector("[data-img]");
  // setting input values to provide information for keys
  let newProduct = new Product(
    Name.value,
    Make.value,
    Description.value,
    Price.value,
    Img.value
  );
//   adding the product into our local storage array
  products.push(newProduct)

localStorage.setItem("products", JSON.stringify(products))

});
