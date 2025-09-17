// Handle Signup
function handleSignup(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

  alert(`Welcome ${name}! Your account has been created with ${email}.`);
  // TODO: Replace with real signup process
}

// Toggle Password Visibility
function togglePassword(id) {
  const field = document.getElementById(id);
  field.type = field.type === "password" ? "text" : "password";
}

// Password Strength Checker
function checkStrength() {
  const password = document.getElementById("password").value;
  const strengthText = document.getElementById("strength-text");

  let strength = "Weak";
  let color = "red";

  if (password.length >= 8 && /[A-Z]/.test(password) &&
      /[0-9]/.test(password) && /[@$!%*?&]/.test(password)) {
    strength = "Strong";
    color = "green";
  } else if (password.length >= 6) {
    strength = "Medium";
    color = "orange";
  }

  strengthText.textContent = `Password Strength: ${strength}`;
  strengthText.style.color = color;
}

// Simulate Social Signup
function socialSignup(platform) {
  alert(`Signing up with ${platform}...`);
  // TODO: Replace with real OAuth integrations
}
