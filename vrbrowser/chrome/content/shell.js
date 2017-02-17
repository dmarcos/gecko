// This is the basic idea but may need some massaging. The shell registers
// an event listener that listens for a custom event in the "home" browser,
// passing "true" as the fourth, wantsUntrusted, parameter to enable the event
// to cross the content/chrome boundary.
var contentEl = document.getElementById('content');
var chromeEl = document.getElementById('chrome');

chromeEl.addEventListener('loadURL', function (evt) {
  document.getElementById('content').src = evt.data.url;
}, true, true);

// If the "home" browser is loaded in the same process, then the shell
// can access the "home" document directly via contentWindow or contentDocument.
// document.getElementById("home").contentWindow // or contentDocument;

window.addEventListener('keydown', onKeyDown);

function onKeyDown(evt) {
  var iKeyPressed = evt.keyCode === 73;
  var contentElDisplay = contentEl.style.display;
  var chromeElDisplay = chromeEl.style.display;
  if (!iKeyPressed) { return; }
  contentEl.style.display = contentElDisplay === 'none' ? 'block' : 'none';
  chromeEl.style.display = chromeElDisplay === 'none' ? 'block' : 'none';
}