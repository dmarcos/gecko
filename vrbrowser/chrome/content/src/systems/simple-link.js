/**
 * Tracked controls system.
 * It maintains a list with the available tracked controllers
 */
AFRAME.registerSystem('simple-link', {
  init: function () {
    var sceneEl = this.sceneEl;
    var self = this;
    sceneEl.addEventListener('renderstart', function() {
      navigator.getVRDisplays().then(gotVRDisplays);
      function gotVRDisplays() { sceneEl.enterVR(); }//setTimeout(function () { sceneEl.enterVR(); }, 100); }
    });
    // controller event listeners
    window.addEventListener('thumbstickdown', function () {
      self.back();
    });
    // controller event listeners
    window.addEventListener('menudown', function () {
      self.back();
    });

    function getUrlParams () {
      var match;
      var pl = /\+/g;  // Regex for replacing addition symbol with a space
      var search = /([^&=]+)=?([^&]*)/g;
      var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };
      var query = window.location.search.substring(1);
      var urlParams = {};

      match = search.exec(query);
      while (match) {
        urlParams[decode(match[1])] = decode(match[2]);
        match = search.exec(query);
      }
      return urlParams;
    }
    var urlParams = getUrlParams();
    this.backUrl = urlParams.backUrl;
  },

  back: function () {
    if (!this.backUrl) { return; }
    window.location.href = this.backUrl;

  }
});
