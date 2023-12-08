// admin js

// localStorage.setItem("products", JSON.stringify(products));

//   updating the products array with the one stored in localstorage
let products = JSON.parse(localStorage.getItem("products")) || [];

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
  let allProducts = products.map(function (item, index) {
    return `
    <tr class="prod-row">
    <td><img data-prod-img style="height: 300px;" src=${item.img}></td>
    <td>${item.name}</td>
    <td>${item.make}</td>
    <td>${item.description}</td>
    <td>${item.price}</td>
    <td><button class="edit" data-edit-prod data-bs-toggle="modal" data-bs-target="#productEdit" value = '${index}' data-edit>edit</button></td>
    <td><button class="delete" value = '${index}' data-delete>delete</button></td>
    </tr>
    `;
  });

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
  display();
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

function editProducts(index) {
  let editName = document.querySelector("[data-edit-name]");
  let editMake = document.querySelector("[data-edit-make]");
  let editDescription = document.querySelector("[data-edit-description]");
  let editPrice = document.querySelector("[data-edit-price]");
  let editImg = document.querySelector("[data-edit-img]");
  editName.value = products[index].name;
  editMake.value = products[index].make;
  editDescription.value = products[index].description;
  editPrice.value = products[index].price;
  editImg.value = products[index].img;
  // Store the index in a data attribute for later use
  document.querySelector("#productEdit").setAttribute("data-edit-index", index);
}
// Add this function to save changes when the "Save changes" button is clicked
function saveChanges() {
  // Retrieve values from inputs
  let editedName = document.querySelector("[data-edit-name]").value;
  let editedMake = document.querySelector("[data-edit-make]").value;
  let editedDescription = document.querySelector(
    "[data-edit-description]"
  ).value;
  let editedPrice = document.querySelector("[data-edit-price]").value;
  let editedImg = document.querySelector("[data-edit-img]").value;
  // Retrieve the index from the data attribute
  // let index = document.querySelector('#productEdit').getAttribute('data-edit-index');
  let index = document.querySelector("[data-edit]").value;
  // Update data in your array
  products[index].name = editedName;
  products[index].make = editedMake;
  products[index].description = editedDescription;
  products[index].price = editedPrice;
  products[index].img = editedImg;
  // Update the localStorage
  update();
}
productDisplay.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit")) {
    editProducts(event.target.value);
  }
  update();
});

document.querySelector("[data-saveEdited-prod]").addEventListener(
  "click",
  saveChanges,
  update,
  display
);

let sortBtn = document.querySelector("[data-sort-prod]");
sortBtn.addEventListener("click", () => {
  let sorted = products.sort((a, b) => {
    // put the next item before the current (according to price)
    if (a.price < b.price) return -1;
    // put the next item after the current (according to price)
    if (a.price > b.price) return 1;
  });
  productDisplay.innerHTML = sorted
    .map(function (item, index) {
      return `
        <tr>
        <td><img data-prod-img style="height: 300px;" src=${item.img}></td>
        <td>${item.name}</td>
        <td>${item.make}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td><button class="edit" data-edit-prod data-bs-toggle="modal" data-bs-target="#productEdit" value = '${index}' data-edit>edit</button></td>
        <td><button class="delete" value = '${index}' data-delete>delete</button></td>
        </tr>
        `;
    })
    .join("");
});
