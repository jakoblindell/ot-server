// Installing the web client as an app. The client reads window.otclientApp:
// its "Install app" button shows while prompt is set and calls install().
window.otclientApp = {
  // The browser's install prompt, kept for the client's button
  prompt: null,
  install: function () {
    var prompt = this.prompt;
    if (!prompt) return;
    this.prompt = null; // a prompt can be shown once
    prompt.prompt();
  },
};

window.addEventListener("beforeinstallprompt", function (event) {
  event.preventDefault(); // the client's button shows it instead
  window.otclientApp.prompt = event;
});

window.addEventListener("appinstalled", function () {
  window.otclientApp.prompt = null;
});

// The service worker makes the page installable and shows an offline page
// when the server cannot be reached
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(function (error) {
    console.warn("Service worker not registered:", error);
  });
}
