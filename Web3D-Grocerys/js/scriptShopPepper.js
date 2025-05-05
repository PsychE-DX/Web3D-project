var scene, camera, renderer, clock, mixer, actions = [], mode, isWireframe_pepper = false;
var model, container, width, height;
var  modelLoaded = false, sound_pepper;
var modelContainer, activeLast_pepper;
document.addEventListener("DOMContentLoaded", function () {
  modelContainer = document.getElementById("three-container_pepper");
  modelContainer.style.display = "none"; // Hide 3D model on page load
  const swapModel_pepper = document.getElementById("toggleModel");
  const playBtn = document.getElementById("btn");
  const showBtn = document.getElementById("btn2");
  playBtn.disabled = true;
  const wireframeBtn_pepper = document.getElementById("toggleWireframe");
  wireframeBtn_pepper.addEventListener('click', function() {
    if(scene){
    isWireframe_pepper = !isWireframe_pepper;
    toggleWireframe_pepper(isWireframe_pepper);
    }
  });

    //swap out the model
    swapModel_pepper.addEventListener("click", function(){
      if(modelContainer_carrot.style.display == "flex" && activeLast_carrot == true){

        document.getElementById("btn5").disabled = true;
        document.getElementById("btn6").disabled = true;
        modelContainer.style.display = "flex";
        modelContainer_carrot.style.display = "none";
        showBtn.disabled = false;
        playBtn.disabled = false;
        if (!scene) { // Only init once
          init();
        }
      }
      if (activeLast_apple == true){
        activeLast_apple = false;
        activeLast_carrot = true;
      }
    });
  
  // Show the 3D model when "btn2" is pressed
  showBtn.addEventListener("click", function () {
    document.getElementById("searchBox").style.display = "none";
    document.getElementById("waiting").style.display = "none";
    wireframeBtn_pepper.style.display = "block";
    swapModel_pepper.style.display = "block";
     document.getElementById("btn3").disabled = true;
     document.getElementById("btn5").disabled = true; 
      if (actions.length === 4) {
        actions.forEach(action => {
          action.reset();
          action.stop();
        }
      )}
      modelContainer.style.display = "flex"; // Show model
      if (!scene) { // Only init once
        init();
      }
      playBtn.disabled = false;
  });

  // Play animation and hide model after delay when "btn" is pressed
  playBtn.addEventListener("click", function () {
    document.getElementById("emptyBasket").disabled = false;
    showBtn.disabled = true;
    wireframeBtn_pepper.style.display = "none";
    swapModel_pepper.style.display = "none";
    if (actions.length === 4) {
      actions.forEach(action => {
        action.setLoop(THREE.LoopOnce);   // Play only once
        action.clampWhenFinished = true;    // Maintain the final frame
        action.timeScale = 1;
        action.reset();
        action.play();
        if(sound_pepper.isPLaying) sound_pepper.stop();
        sound_pepper.play();
      });
    }
      setTimeout(() => {
          modelContainer.style.display = "none"; // Hide model after delay
          document.getElementById("btn3").disabled = false;
          document.getElementById("btn5").disabled = false; 
          showBtn.disabled = false;
          document.getElementById("searchBox").style.display = "flex";
          document.getElementById("waiting").style.display = "flex";
      }, 1500); // 5 seconds delay
      playBtn.disabled = true;
     
  });
});

function init() {
  container = document.getElementById("three-container_pepper");
  width = container.clientWidth;
  height = container.clientHeight;
  const assetPath = './'; // Path to assets
  clock = new THREE.Clock();
 
  // Create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x00aaff);

  // Set up the camera
  camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
  camera.position.set(10, 0, 0);

  // Add lighting
  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(ambient);
  const light1 = new THREE.DirectionalLight();
  light1.position.set(-10, 15, -6);
  scene.add(light1);
  light1.intensity = 1;
  const light2 = new THREE.DirectionalLight();
  light2.position.set(0, 13, 16);
  scene.add(light2);
  light2.intensity = 1;
  const light3 = new THREE.DirectionalLight();
  light3.position.set(15, 10, 7);
  scene.add(light3);
  light3.intensity = 1;
  const light4 = new THREE.DirectionalLight();
  light4.position.set(5, -10, 0);
  light4.intensity = 1;
  scene.add(light4);

  // Set up the renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  // Set initial renderer size; it will be updated in the resize() function
 
  renderer.setSize(width, height);

  // Append the renderer to the dark grey container
  document.getElementById("three-container_pepper").appendChild(renderer.domElement);

  // Add OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(1, 2, 0);
  controls.update();

  const listener_pepper = new THREE.AudioListener();
  camera.add(listener_pepper);
  // Create a sound and attach it to the listener
  sound_pepper = new THREE.Audio(listener_pepper);  
  // Load a sound and set it as the buffer for the Audio object
  const audioLoader_pepper = new THREE.AudioLoader();
  audioLoader_pepper.load(assetPath+ 'assets/sounds/pepper_falling.mp3', function (buffer) {
    sound_pepper.setBuffer(buffer);
    sound_pepper.setLoop(false);
    sound_pepper.setVolume(1.0);
  });
  // Load the glTF model
  const loader = new THREE.GLTFLoader();
  loader.load(assetPath + 'assets/glb/Bell Pepper_with_animation.glb', function(gltf) {
    model = gltf.scene;
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    const animations = gltf.animations;
    animations.forEach(clip => {
      const action = mixer.clipAction(clip);
      actions.push(action);
    });
  });

  // Handle resizing
  window.addEventListener('resize', resize, false);
  animate();
}
function toggleWireframe_pepper(enable){
  scene.traverse(function(object){
    if (object.isMesh){
      object.material.wireframe = enable;
    }
  });
}
function animate() {
  requestAnimationFrame(animate);
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera);
}

function resize() {
  // Resize renderer to match #three-container dimensions
  const container = document.getElementById("three-container_pepper");
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
