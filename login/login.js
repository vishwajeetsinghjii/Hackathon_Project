// Handle Login
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  if (email && password) {
    alert(`Welcome back, ${email}!`);
    // TODO: Replace with real authentication
  } else {
    alert("Please fill in all fields!");
  }
}

// Show/Hide Password
function togglePassword() {
  const passwordField = document.getElementById("password");
  passwordField.type = passwordField.type === "password" ? "text" : "password";
}

// Simulate Social Login
function socialLogin(platform) {
  alert(`Logging in with ${platform}...`);
  // TODO: Replace with real OAuth integrations
}
