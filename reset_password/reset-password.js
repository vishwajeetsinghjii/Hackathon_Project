// Password Strength Checker
function checkStrength() {
  const password = document.getElementById("password").value;
  const strengthMeter = document.getElementById("strengthMeter");

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[\W]/.test(password)) strength++;

  switch (strength) {
    case 0:
    case 1:
      strengthMeter.style.background = "red";
      break;
    case 2:
      strengthMeter.style.background = "orange";
      break;
    case 3:
      strengthMeter.style.background = "yellow";
      break;
    case 4:
      strengthMeter.style.background = "lightgreen";
      break;
    case 5:
      strengthMeter.style.background = "green";
      break;
  }
}

// Handle Reset
function handleReset(event) {
  event.preventDefault();

  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return false;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters!");
    return false;
  }

  alert("✅ Your password has been reset successfully!");
  window.location.href = "login.html"; // Redirect back to login
}
