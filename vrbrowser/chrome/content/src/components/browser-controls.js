AFRAME.registerComponent('browser-controls', {
  schema: {
    hand: {default: ''}
  },

  init: function () {
    var controlConfiguration;
    var el = this.el;

    this.body = null;
    this.trigger = null;
    this.touchpad = null;
    this.cursor = null;
    this.menu = null;
    this.grip = null;

    el.addEventListener('model-loaded', function (evt) {
      this.body = evt.detail.model.getObjectByName('body');
      this.trigger = evt.detail.model.getObjectByName('trigger');
      this.touchpad = evt.detail.model.getObjectByName('touchpad');
      // this.cursor = evt.detail.model.getObjectByName('cursor');
      this.menu = evt.detail.model.getObjectByName('menu');
      this.grip = evt.detail.model.getObjectByName('grip');
    }.bind(this));

    // Get common configuration to abstract Vive and Oculus.
    controlConfiguration = {hand: this.data.hand, model: false};
    el.setAttribute('gltf-model', "#controller");
    el.setAttribute('vive-controls', controlConfiguration);
    el.setAttribute('oculus-touch-controls', controlConfiguration);
  },

  play: function () {
    var self = this;
    ['buttonchanged', 'axismove', 'touchstart', 'touchend'].forEach(function (i) {
      self.el.addEventListener(i, self.controllerEvent.bind(self));
    });
  },

  pause: function () {
    var self = this;
    ['buttonchanged', 'axismove', 'touchstart', 'touchend'].forEach(function (i) {
      self.el.removeEventListener(i, self.controllerEvent);
    });
  },

  controllerEvent: function (evt) {

    switch (evt.type) {
/*      case 'touchstart':
        if (evt.detail.id == 0) {
          this.touchpad.visible = true;
          this.cursor.visible = true;
        }
        break;

      case 'touchend':
        if (evt.detail.id == 0) {
          this.touchpad.visible = false;
          this.cursor.visible = false;
        }
        break;

      case 'axismove':
        var x = evt.detail.axis[0];
        var y = evt.detail.axis[1];
        this.cursor.position.y = y * 0.019;
        this.cursor.rotation.y = x * 0.41;
        break;
*/
      // case 'buttonchanged':
      //   switch(evt.detail.id) {
      //     case 0: // touchpad
      //       this.touchpad.position.z = evt.detail.state.pressed ? -0.001 : 0;
      //     break;
      //     case 1: // trigger
      //       this.trigger.rotation.x = -evt.detail.state.value * 0.4;
      //     break;
      //     case 2: // grip
      //       var scaleX = evt.detail.state.pressed ? 0.975 : 1;
      //       this.grip.scale.set(scaleX, 1, 1);
      //     break;
      //     case 3: // menu
      //       this.menu.position.z = evt.detail.state.pressed ? -0.0004 : 0;
      //     break;
      //   }
      //   break;
    }
 }
});
