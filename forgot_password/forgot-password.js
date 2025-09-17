// Handle Forgot Password
function handleForgot(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;

  if (!email) {
    alert("Please enter a valid email!");
    return false;
  }

  alert(`A password reset link has been sent to ${email}. Please check your inbox.`);
  // TODO: Replace with real email reset integration
}

// Simulate Social Recovery
function socialReset(platform) {
  alert(`Recovering password via ${platform}...`);
  // TODO: Replace with real OAuth recovery
}
