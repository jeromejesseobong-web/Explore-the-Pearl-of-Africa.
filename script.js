// --------------------
// Tour Packages Array (shared)
// --------------------
const tourPackages = [
  { id: 1, name: "3 Day Gorilla Trekking", price: 1800 },
  { id: 2, name: "5 Day Wildlife Safari", price: 2200 },
  { id: 3, name: "Nile Adventure Tour", price: 600 },
  { id: 4, name: "Cultural Heritage Tour", price: 350 },
  { id: 5, name: "Lake Victoria Escape", price: 900 },
  { id: 6, name: "Rwenzori Mountain Trek", price: 2500 },
];

// --------------------
// Tour Cart (tours.html)
// --------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(packageId) {
  const selectedPackage = tourPackages.find((pkg) => pkg.id === packageId);
  if (selectedPackage) {
    cart.push(selectedPackage);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartBadge();
    alert(`${selectedPackage.name} has been added to your cart!`);
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartBadge();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  displayCart();
  updateCartBadge();
}

function displayCart() {
  const cartSection = document.getElementById("cart");
  const cartTableBody = document.querySelector("#cartTable tbody");
  const cartTotalCell = document.getElementById("cartTotal");
  const cartFooterRow = document.getElementById("cartFooterRow");

  if (!cartSection || !cartTableBody || !cartTotalCell || !cartFooterRow)
    return;

  //  Hide cart section if empty
  cartSection.style.display = cart.length > 0 ? "block" : "none";

  cartTableBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.textContent = item.name;

    let priceCell = document.createElement("td");
    priceCell.textContent = `$${item.price}`;

    let actionCell = document.createElement("td");
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.id = "remove-btn"; // unique ID for styling
    removeBtn.onclick = () => removeFromCart(index);
    actionCell.appendChild(removeBtn);

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(actionCell);

    cartTableBody.appendChild(row);

    total += item.price;
  });

  cartTotalCell.textContent = `$${total}`;

  //  Show Clear + Checkout buttons only if cart has items
  cartFooterRow.innerHTML = "";
  if (cart.length > 0) {
    let clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear Cart";
    clearBtn.id = "clear-cart-btn"; // unique ID
    clearBtn.onclick = clearCart;

    let checkoutBtn = document.createElement("button");
    checkoutBtn.textContent = "Proceed to Checkout";
    checkoutBtn.id = "checkout-btn"; // unique ID
    checkoutBtn.onclick = () => {
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "book.html";
    };

    cartFooterRow.appendChild(clearBtn);
    cartFooterRow.appendChild(checkoutBtn);
  }
}

// --------------------
// Cart Badge + Checkout in Header
// --------------------
function updateCartBadge() {
  let badge = document.getElementById("cart-badge");
  let checkoutLink = document.getElementById("checkout-link");

  const nav = document.querySelector("nav ul");

  if (!badge && nav) {
    let li = document.createElement("li");
    badge = document.createElement("a");
    badge.id = "cart-badge";
    badge.href = "#cart";
    li.appendChild(badge);
    nav.appendChild(li);
  }

  if (!checkoutLink && nav) {
    let li = document.createElement("li");
    checkoutLink = document.createElement("a");
    checkoutLink.id = "checkout-link";
    checkoutLink.href = "book.html";
    checkoutLink.textContent = "Checkout";
    li.appendChild(checkoutLink);
    nav.appendChild(li);
  }

  if (badge) {
    badge.textContent = `Cart (${cart.length})`;
    badge.style.display = cart.length > 0 ? "inline-block" : "none";
  }

  if (checkoutLink) {
    checkoutLink.style.display = cart.length > 0 ? "inline-block" : "none";
  }
}

// Initialize on page load
updateCartBadge();
displayCart();

// --------------------
// Booking Form Validation (book.html)
// --------------------
const bookingForm = document.querySelector("form");

if (bookingForm) {
  //  Show cart summary above booking form
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  if (savedCart.length > 0) {
    const cartSummary = document.createElement("div");
    cartSummary.innerHTML = "<h3>Your Selected Tours:</h3>";

    let table = document.createElement("table");
    table.className = "cart-summary-table";

    let thead = document.createElement("thead");
    thead.innerHTML = "<tr><th>Tour</th><th>Price</th></tr>";
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    let total = 0;

    savedCart.forEach((item) => {
      let row = document.createElement("tr");
      row.innerHTML = `<td>${item.name}</td><td>$${item.price}</td>`;
      tbody.appendChild(row);
      total += item.price;
    });

    table.appendChild(tbody);

    let tfoot = document.createElement("tfoot");
    tfoot.innerHTML = `<tr><td class="cart-total">Total:</td><td>$${total}</td></tr>`;
    table.appendChild(tfoot);

    cartSummary.appendChild(table);
    bookingForm.parentNode.insertBefore(cartSummary, bookingForm);
  }

  bookingForm.addEventListener("submit", function (e) {
    let name = document.querySelector("input[type='text']").value.trim();
    let email = document.querySelector("input[type='email']").value.trim();
    let code = document.getElementById("countryCode").value;
    let number = document.getElementById("phoneNumber").value.trim();
    let fullPhone = code + number;
    let people = document.querySelector("input[type='number']").value;
    let date = document.querySelector("input[type='date']").value;
    let package = document.querySelector("select").value;

    let errors = [];

    if (name === "") errors.push("Full name is required.");
    if (!email.includes("@") || !email.includes("."))
      errors.push("Please enter a valid email address.");
    if (!/^\+\d{7,15}$/.test(fullPhone))
      errors.push("Phone number must start with + and have 7–15 digits.");
    if (package === "") errors.push("Please select a tour package.");
    if (people < 1) errors.push("Number of people must be at least 1.");
    if (date === "") errors.push("Please select a travel date.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      e.preventDefault();
    } else {
      // ✅ Clear cart fully after booking
      clearCart();
      alert("Booking confirmed! Your cart has been cleared.");
    }
  });
}
