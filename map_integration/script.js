let map, userMarker, courierMarker, routePath;
let userPos = null;

function initMap() {
  // Default center (India)
  const defaultCenter = { lat: 28.6139, lng: 77.2090 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultCenter,
    zoom: 6,
  });

  // Example doctors & pharmacies (You can fetch from DB)
  const locations = [
    { name: "Dr. Mehta Clinic", position: { lat: 28.7041, lng: 77.1025 }, type: "doctor" },
    { name: "Green Life Pharmacy", position: { lat: 28.5355, lng: 77.3910 }, type: "pharmacy" },
    { name: "Dr. Ahuja Health Center", position: { lat: 19.0760, lng: 72.8777 }, type: "doctor" }
  ];

  locations.forEach((loc) => {
    const marker = new google.maps.Marker({
      position: loc.position,
      map,
      icon: loc.type === "doctor" ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png" : "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      title: loc.name
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h4>${loc.name}</h4><p>Click to book appointment</p>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });

  // Example pharmacy location for delivery tracking
  const pharmacy = { lat: 28.5355, lng: 77.3910 };

  new google.maps.Marker({
    position: pharmacy,
    map,
    icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    title: "Pharmacy Location"
  });

  // Locate user button
  document.getElementById("locateBtn").addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (userMarker) userMarker.setMap(null); // Remove old marker if exists
        userMarker = new google.maps.Marker({
          position: userPos,
          map,
          icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          title: "You"
        });

        map.setCenter(userPos);
        map.setZoom(12);
      }, () => {
        alert("Unable to get your location.");
      });
    } else {
      alert("Geolocation not supported in your browser.");
    }
  });

  // Track delivery button
  document.getElementById("trackBtn").addEventListener("click", () => {
    if (!userPos) {
      alert("Please click 'Show My Location' first.");
      return;
    }

    // Draw route line
    if (routePath) routePath.setMap(null);
    routePath = new google.maps.Polyline({
      path: [pharmacy, userPos],
      geodesic: true,
      strokeColor: "#0077b6",
      strokeOpacity: 0.8,
      strokeWeight: 4,
      map: map
    });

    // Place courier marker at pharmacy
    if (courierMarker) courierMarker.setMap(null);
    courierMarker = new google.maps.Marker({
      position: pharmacy,
      map,
      icon: "https://maps.google.com/mapfiles/kml/shapes/truck.png",
      title: "Delivery Courier"
    });

    // Animate courier movement
    animateCourier(pharmacy, userPos);
  });
}

function animateCourier(start, end) {
  let progress = 0;
  const steps = 100;
  const interval = setInterval(() => {
    progress += 1;
    const lat = start.lat + (end.lat - start.lat) * (progress / steps);
    const lng = start.lng + (end.lng - start.lng) * (progress / steps);
    courierMarker.setPosition({ lat, lng });

    if (progress >= steps) {
      clearInterval(interval);
      alert("Your medicine has arrived! 🚑💊");
    }
  }, 100); // 100ms per step = ~10 seconds delivery simulation
}
