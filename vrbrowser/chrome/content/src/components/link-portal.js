AFRAME.registerComponent('link-portal', {
  schema: {
    bg: {default: ''},
    logo: {default: ''}
    /*color: {default: 'rgb(239,45,94);', type: 'color'},
    highlighted: {default: false},
    highlightColor: {default: 'white', type: 'color'}
    */
  },

  init: function () {
    this.el.addEventListener('model-loaded', this.setup.bind(this));
  },
/*
  update: function (oldData) {
    var data = this.data;
    var el = this.el;
    var strokeColor = data.highlighted ? data.highlightColor : data.color;
    el.setAttribute('material', 'strokeColor', strokeColor);
    if (!data.src || oldData.src === data.src) { return; }
    el.setAttribute('material', 'pano', data.src);
  },
*/
  setup: function (evt) {
    var el = this.el;
    this.logoMaterial  = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(this.data.logo), 
      transparent: true
    });
    this.bgMaterial  = new THREE.ShaderMaterial({
      uniforms: {
        pano: { type: "t", value: THREE.ImageUtils.loadTexture( this.data.bg ) },
        glow: { type: "uFloat", value: 0.0}
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader
    });
    var bg = evt.detail.model.getObjectByName('link').children[0];
    var logo = evt.detail.model.getObjectByName('logo').children[0];
    bg.material = this.bgMaterial;
    logo.material = this.logoMaterial;
  },
/*
  tick: (function () {
    var elWorldPosition = new THREE.Vector3();
    var cameraWorldPosition = new THREE.Vector3();
    var scale = new THREE.Vector3();
    var quaternion = new THREE.Quaternion();
    var dummyObject3D = new THREE.Object3D();
    var previousQuaternion;
    return function () {
      var el = this.el;
      var object3D = el.object3D;
      var camera = el.sceneEl.camera;
      var distance;
      var interpolation = 0.0;
      object3D.updateMatrixWorld();
      camera.updateMatrixWorld();
      object3D.matrix.decompose(elWorldPosition, quaternion, scale);
      elWorldPosition.setFromMatrixPosition(object3D.matrixWorld);
      cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
      distance = elWorldPosition.distanceTo(cameraWorldPosition);
      dummyObject3D.quaternion.copy(quaternion);
      dummyObject3D.lookAt(cameraWorldPosition);
      if (!previousQuaternion) { previousQuaternion = quaternion.clone(); }
      interpolation = Math.log(distance / 8);
      // Clamp value 0.0 .. 1.0
      interpolation = Math.min(Math.max(interpolation, 0.0), 1.0);
      object3D.quaternion.copy(previousQuaternion).slerp(dummyObject3D.quaternion, interpolation);
    };
  })(),
*/
  vertexShader: [
    'vec3 portalPosition;',
    'varying vec3 vWorldPosition;',
    'varying vec3 sphereCenter;',
    'varying float vDistanceToCenter;',
    'varying float vDistance;',
    'void main() {',
      'vDistanceToCenter = clamp(length(position - vec3(0.0, 0.0, 0.0)), 0.0, 1.0);',
      'portalPosition = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;',
      'vDistance = length(portalPosition - cameraPosition);',
      'vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;',
      'sphereCenter = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n'),

  fragmentShader: [
    '#define RECIPROCAL_PI2 0.15915494',
    'uniform sampler2D pano;',
    'varying float vDistanceToCenter;',
    'varying float vDistance;',
    'varying vec3 vWorldPosition;',
    'varying vec3 sphereCenter;',
    'void main() {',
      'vec3 direction = normalize(vWorldPosition - cameraPosition);',
      'vec2 sampleUV;',
      'sampleUV.y = saturate(direction.y * 0.5 + 0.5);',
      'sampleUV.x = atan(direction.z, direction.x) * -RECIPROCAL_PI2 + 0.5;',
      'gl_FragColor = mix(texture2D(pano, sampleUV), vec4(0.93, 0.17, 0.36, 1.0), clamp(pow((vDistance / 10.0), 2.0), 0.0, 1.0));',
    '}'
  ].join('\n')
  
});

