function goToLogin() { 
    window.location.href = "patient_dashboard.html"; 
} 

function goTosignUp() { 
    window.location.href = "signup.html"; 
}

function learnMore() { 
    window.location.href = "learnmore.html"; 
}
// Counter Animation (2s smooth)
function animateCounter(id, target, duration = 2000) {
  let start = 0;
  const element = document.getElementById(id);
  const increment = target / (duration / 30);

  const update = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(update);
    }
    element.textContent = Math.floor(start);
  }, 30);
}

// Observe counters section
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter("doctors", 500);
      animateCounter("patients", 2000);
      animateCounter("availability", 24);
      observer.disconnect(); // run only once
    }
  });
}, { threshold: 0.5 }); // trigger when 50% visible

observer.observe(document.querySelector(".counters"));
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = 'MY_SECRET_TOKEN'; // same as in Meta Dashboard
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook verified!');
        res.status(200).send(challenge); // MUST send back the challenge
    } else {
        res.sendStatus(403);
    }
});
