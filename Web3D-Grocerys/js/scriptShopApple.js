var scene_apple, camera_apple, renderer_apple, clock_apple, mixer_apple, actions_apple = [], mode_apple, isWireframe_apple = false;
var model_apple, container_apple, width_apple, height_apple;
var modelContainer_apple, sound_apple, activeLast_apple = false;
document.addEventListener("DOMContentLoaded", function () {
  modelContainer_apple = document.getElementById("three-container_apple");
  modelContainer_apple.style.display = "none"; // Hide 3D model_apple on page load
  const swapModel_apple = document.getElementById("toggleModel");
  const playBtn_apple = document.getElementById("btn4");
  const showBtn_apple = document.getElementById("btn3");
  playBtn_apple.disabled = true;
  const wireframeBtn_apple = document.getElementById("toggleWireframe");
  wireframeBtn_apple.style.display = "none";
  swapModel_apple.style.display = "none";
  wireframeBtn_apple.addEventListener('click', function() {
    if(scene_apple){
    isWireframe_apple = !isWireframe_apple;
    toggleWireframe_apple(isWireframe_apple);
    
    }
  });

  //swap out the model
  swapModel_apple.addEventListener("click", function(){
    if(modelContainer.style.display == "flex"){
      document.getElementById("btn").disabled = true;
      document.getElementById("btn2").disabled = true;
      modelContainer_apple.style.display = "flex";
      modelContainer.style.display = "none";
      showBtn_apple.disabled = false;
      playBtn_apple.disabled = false;
      if (!scene_apple) { // Only init_apple once
        init_apple();
      }
 
    }

  });

  // Show the 3D model_apple when "btn2" is pressed
  showBtn_apple.addEventListener("click", function () { 
    document.getElementById("searchBox").style.display = "none";
    document.getElementById("waiting").style.display = "none";
    wireframeBtn_apple.style.display = "block";
    swapModel_apple.style.display = "block";
    document.getElementById("btn5").disabled = true;
    document.getElementById("btn2").disabled = true; 
      if (actions_apple.length === 1) {
        actions_apple.forEach(action => {
          action.reset();
          action.stop();
        }
      )}
      modelContainer_apple.style.display = "flex"; // Show model_apple
      if (!scene_apple) { // Only init_apple once
        init_apple();
      }
      playBtn_apple.disabled = false;
  });

  // Play animation and hide model_apple after delay when "btn" is pressed
  playBtn_apple.addEventListener("click", function () {
    document.getElementById("emptyBasket").disabled = false;
    showBtn_apple.disabled = true;
    swapModel_apple.style.display = "none";
    wireframeBtn_apple.style.display = "none";
    if (actions_apple.length === 1) {
      actions_apple.forEach(action => {
        action.setLoop(THREE.LoopOnce);   // Play only once
        action.clampWhenFinished = true;    // Maintain the final frame
        action.timeScale = 1;
        action.reset();
        action.play();
        if (sound_apple.isPLaying) sound_apple.stop();
        sound_apple.play();
      });
    }
      setTimeout(() => {
          modelContainer_apple.style.display = "none"; // Hide model_apple after delay
          document.getElementById("btn5").disabled = false;
          document.getElementById("btn2").disabled = false; 
          showBtn_apple.disabled = false;
          document.getElementById("searchBox").style.display = "flex";
          document.getElementById("waiting").style.display = "flex";
      }, 2000); // 3 seconds delay
      playBtn_apple.disabled = true;
  });
});


function init_apple() {
  container_apple = document.getElementById("three-container_apple");
  width_apple = container_apple.clientWidth;
  height_apple = container_apple.clientHeight;
  const assetPath = './'; // Path to assets
  clock_apple = new THREE.Clock();
 
  // Create the scene
  scene_apple = new THREE.Scene();
  scene_apple.background = new THREE.Color(0x00aaff);

  // Set up the camera_apple
  camera_apple = new THREE.PerspectiveCamera(30, width_apple / height_apple, 0.1, 1000);
  camera_apple.position.set(10, 0, 0);

  // Add lighting
  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene_apple.add(ambient);

  const light1_apple = new THREE.DirectionalLight();
  light1_apple.position.set(-10, 15, -6);
  scene_apple.add(light1_apple);
  light1_apple.intensity = 10;
  const light2_apple = new THREE.DirectionalLight();
  light2_apple.position.set(0, 13, 16);
  scene_apple.add(light2_apple);
  light2_apple.intensity = 3;
  const light3_apple = new THREE.DirectionalLight();
  light3_apple.position.set(15, 10, 7);
  scene_apple.add(light3_apple);
  light3_apple.intensity = 3;
  const light4_apple = new THREE.DirectionalLight();
  light4_apple.position.set(5, -10, 0);
  light4_apple.intensity = 10;
  scene_apple.add(light4_apple);

  // Set up the renderer_apple
  renderer_apple = new THREE.WebGLRenderer({antialias: true});
  // Set initial renderer_apple size; it will be updated in the resize() function
 
  renderer_apple.setSize(width_apple, height_apple);

  // Append the renderer_apple to the dark grey container_apple
  document.getElementById("three-container_apple").appendChild(renderer_apple.domElement);

  // Add OrbitControls
  const controls = new THREE.OrbitControls(camera_apple, renderer_apple.domElement);
  controls.target.set(1, 2, 0);
  controls.update();

  const listener_apple = new THREE.AudioListener();
  camera_apple.add(listener_apple);
  // Create a sound and attach it to the listener
  sound_apple = new THREE.Audio(listener_apple);  
  // Load a sound and set it as the buffer for the Audio object
  const audioLoader_apple = new THREE.AudioLoader();
  audioLoader_apple.load(assetPath+ 'assets/sounds/apples_slicing_final.mp3', function (buffer) {
    sound_apple.setBuffer(buffer);
    sound_apple.setLoop(false);
    sound_apple.setVolume(1.0);
  });

  
  // Load the glTF model_apple
  const loader_apple = new THREE.GLTFLoader();
  loader_apple.load(assetPath + 'assets/glb/apples_with_animation_final.glb', function(gltf) {
    model_apple = gltf.scene;
    scene_apple.add(model_apple);
    mixer_apple = new THREE.AnimationMixer(model_apple);
    const animations = gltf.animations;
    animations.forEach(clip => {
      const action = mixer_apple.clipAction(clip);
      actions_apple.push(action);
    });
  });

  // Handle resizing
  window.addEventListener('resize', resize_apple, false);
  animate_apple();
}
function toggleWireframe_apple(enable){
  scene_apple.traverse(function(object){
    if (object.isMesh){
      object.material.wireframe = enable;
    }
  });
}

function animate_apple() {
  requestAnimationFrame(animate_apple);
  if (mixer_apple) {
    mixer_apple.update(clock_apple.getDelta());
  }
  renderer_apple.render(scene_apple, camera_apple);
}

function resize_apple() {
  // Resize renderer_apple to match #three-container_apple dimensions
  const container_apple = document.getElementById("three-container_apple");
  const width_apple = container_apple.clientWidth;
  const height_apple = container_apple.clientHeight;

  camera_apple.aspect = width_apple / height_apple;
  camera_apple.updateProjectionMatrix();
  renderer_apple.setSize(width_apple, height_apple);
}
