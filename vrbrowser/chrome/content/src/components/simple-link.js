// Temporary `link` component.
AFRAME.registerComponent('simple-link', {
  schema: {
    event: {default: ''},
    href: {default: ''}
  },

  init: function () {
    var data = this.data;
    this.el.addEventListener(data.event, function () {
      window.location.href = data.href + 'index.html?backUrl=' + window.location.href;
    });
  }
});
