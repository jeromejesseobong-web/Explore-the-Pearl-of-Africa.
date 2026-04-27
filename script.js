// Select the booking form
const bookingForm = document.querySelector("form");

bookingForm.addEventListener("submit", function (e) {
  let name = document.querySelector("input[type='text']").value.trim();
  let email = document.querySelector("input[type='email']").value.trim();
  if (!fullPhone.match(/^\+\d{7,15}$/)) {
    alert("Please enter a valid phone number.");
    e.preventDefault();
    let people = document.querySelector("input[type='number']").value;
  let date = document.querySelector("input[type='date']").value;
  let package = document.querySelector("select").value;

  let errors = [];}
  

  // Name validation
  if (name === "") {
    errors.push("Full name is required.");
  }

  // Email validation
  if (!email.includes("@") || !email.includes(".")) {
    errors.push("Please enter a valid email address.");
  }

  // Phone validation (+256 format)
  if (!fullPhone.match(/^\+\d{7,15}$/)) {
    alert("Please enter a valid phone number.");
    e.preventDefault();
  }

  // Tour package validation
  if (package === "") {
    errors.push("Please select a tour package.");
  }

  // Number of people validation
  if (people < 1) {
    errors.push("Number of people must be at least 1.");
  }

  // Date validation
  if (date === "") {
    errors.push("Please select a travel date.");
  }

  // Show errors if any
  if (errors.length > 0) {
    alert(errors.join("\n"));
    e.preventDefault(); // stop form submission
  }
});
// Tour packages array
const tourPackages = [
  { id: 1, name: "3 Day Gorilla Trekking", price: 1800 },
  { id: 2, name: "5 Day Wildlife Safari", price: 2200 },
  { id: 3, name: "Nile Adventure Tour", price: 600 },
  { id: 4, name: "Cultural Heritage Tour", price: 350 },
  { id: 5, name: "Lake Victoria Escape", price: 900 },
  { id: 6, name: "Rwenzori Mountain Trek", price: 2500 }
];
// Empty cart to store the selected tours
let cart = [];

//Add to cart
function addToCart(packageId) {
  const selectedPackage = tourPackages.find((pkg) => pkg.id === packageId);
  if (selectedPackage) {
    cart.push(selectedPackage);
    displayCart(); // <-- this makes the cart show up
    alert(`${selectedPackage.name} has been added to your cart!`);
  }
}

//Display Cart
function displayCart() {
  const cartSection = document.getElementById("cart");
  const cartList = document.getElementById("cartItems");

  // Show cart only if it has items
  if (cart.length > 0) {
    cartSection.style.display = "block";
  }

  // clear old items
  cartList.innerHTML = "";

  //Add each item
  cart.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

