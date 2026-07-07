   function submitName() {
    const name = document.getElementById('visitorName').value.trim();
    if (name) {
      // Show content and hide overlay
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('content').style.display = 'block';
      // Optional: display name somewhere
      const displaySpan = document.getElementById('displayName');
      if (displaySpan) displaySpan.textContent = name;
      // 🔗 Send name to server via PUT request
      fetch("/api/names", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name })
      })
      .then(response => response.json())
      .then(data => {
        console.log("Server response:", data);
      })
      .catch(error => {
        console.error("Error sending name:", error);
      });
    } else {
      alert("Please enter your name.");
    }
  }
(async function() {
  try {
    const ua = navigator.userAgent || '';
    let ip = null;
    try {
      const r = await fetch('https://api.ipify.org?format=json');
      if (r.ok) {
        const j = await r.json();
        ip = j.ip;
      }
    } catch (e) {
      console.warn("IP fetch failed", e);
    }
    const payload = { ua, ip, page: location.pathname };
    // Send to your Vercel function
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    });
  } catch (e) {
    console.error("Tracking failed", e);
  }
})();
