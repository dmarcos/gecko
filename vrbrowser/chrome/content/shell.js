// This is the basic idea but may need some massaging.  The shell registers
// an event listener that listens for a custom event in the "home" browser,
// passing "true" as the fourth, wantsUntrusted, parameter to enable the event
// to cross the content/chrome boundary.
document.getElementById("home").addEventListener("loadURL", function(evt) {
  document.getElementById("content").src = evt.data.url;
}, true, true);

// If the "home" browser is loaded in the same process, then the shell
// can access the "home" document directly via contentWindow or contentDocument.
document.getElementById("home").contentWindow // or contentDocument;
