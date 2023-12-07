// admin js
// creating a variable for the array to be saved into local storage
let products = [];

// localStorage.setItem("products", JSON.stringify(products));

//   updating the products array with the one stored in localstorage
products = JSON.parse(localStorage.getItem("products"));

let productDisplay = document.querySelector("[data-product-list]");

// using a constructor function to create new objects
function Product(name, make, description, price, img) {
  (this.name = name),
    (this.make = make),
    (this.description = description),
    (this.price = price),
    (this.img = img);
}

// creating a function to disply the items in the current array
function display() {
  let allProducts = products.map(function (item,index) {
    return `
    <tr>
    <td><img data-prod-img style="height: 300px;" src=${item.img}></td>
    <td>${item.name}</td>
    <td>${item.make}</td>
    <td>${item.description}</td>
    <td>${item.price}</td>
    <td><button class = "edit" value = '${index}' data-edit>edit</button></td>
    <td><button class="delete" value = '${index}' data-delete>delete</button></td>
    </tr>
    `
  })

  productDisplay.innerHTML = allProducts.join("");
}
// calling the display function to display all items
display();

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
  products.push(newProduct);

  //   storing the data we pushed into the array in the local storage
  localStorage.setItem("products", JSON.stringify(products));

  //   updating the products array with the one stored in localstorage
  products = JSON.parse(localStorage.getItem("products"));
  display()
});

// display the items again after one was deleted
function update() {
  // updating the local storage with the current items in the array
  localStorage.setItem("products", JSON.stringify(products));
  // then updating the current array with items added to the localstorage
  products = JSON.parse(localStorage.getItem("products"));
}

function removeItem(position) {
  // removing the item from the array
  products.splice(position, 1);
  // updating the array in localstorage
  update(); // updating the array
  display(); //displaying all items again
}

productDisplay.addEventListener("click", function () {
  if (event.target.classList.contains("delete")) {
    // refer to the button again. the button now becomes the event.target
    // parse the button in the remove function
    removeItem(event.target.value, display());
  }
});