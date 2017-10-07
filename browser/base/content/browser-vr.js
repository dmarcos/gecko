var Ci = Components.interfaces;
  var vrDisplay;
  var canvasEl = document.createElement('canvas');

  var startRender = function () {
    vrDisplay.requestAnimationFrame(startRender);
    vrDisplay.submitFrame();
  };

  var stopRender = function () {
    if (!vrDisplay) { return; }
    vrDisplay.exitPresent();
  };

var onLoad = function () { // Initialization code after the browser loads up it's window
  let progressListener = {
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIWebProgressListener]),
    onLocationChange(aWebProgress, aRequest, aLocation, aFlags) {
      const nsIWebProgressListener = Ci.nsIWebProgressListener;
      var location = aLocation ? aLocation.spec : "";
      // Filter out location changes in sub documents.
      if (!aWebProgress.isTopLevel) { return; }
      if (nsIWebProgressListener.STATE_START) { 
        console.log("STARTED NAVIGATION " + location); 
        if (vrDisplay) { vrDisplay.requestPresent([{source: canvasEl}]).then(startRender); }
      }
      if (nsIWebProgressListener.STATE_STOP) {
        console.log("FINISHED NAVIGATION " + location); 
        stopRender();
      }
    }
  };
  gBrowser.addProgressListener(progressListener, Ci.nsIWebProgress.NOTIFY_STATE_REQUEST |
                                                 Ci.nsIWebProgress.NOTIFY_LOCATION);
  navigator.getVRDisplays().then(function (displays) {
    vrDisplay = displays[0];
    console.log("NUMBER OF DISPLAYS: " + displays.length);
  });
};

window.addEventListener("load", onLoad, false); //regiser the init function
