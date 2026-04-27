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

  let errors = [];

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
