var scene_carrot, camera_carrot, renderer_carrot, clock_carrot, mixer_carrot, actions_carrot = [], mode_carrot, isWireframe_carrot = false;
var model_carrot, container_carrot, width_carrot, height_carrot;
var modelContainer_carrot, sound_carrot, activeLast_carrot = false;
document.addEventListener("DOMContentLoaded", function () {
  modelContainer_carrot = document.getElementById("three-container_carrot");
  modelContainer_carrot.style.display = "none"; // Hide 3D model_carrot on page load
  const swapModel_carrot = document.getElementById("toggleModel");
  const playBtn_carrot = document.getElementById("btn6");
  const showBtn_carrot = document.getElementById("btn5");
  playBtn_carrot.disabled = true;
  const wireframeBtn_carrot = document.getElementById("toggleWireframe");
  wireframeBtn_carrot.addEventListener('click', function() {
    if (scene_carrot){
    isWireframe_carrot = !isWireframe_carrot;
    toggleWireframe_carrot(isWireframe_carrot);
    }
  });

    //swap out the model
    swapModel_carrot.addEventListener("click", function(){
      if(modelContainer_apple.style.display == "flex"){
        document.getElementById("btn4").disabled = true;
        document.getElementById("btn3").disabled = true;
        modelContainer_carrot.style.display = "flex";
        modelContainer_apple.style.display = "none";
        showBtn_carrot.disabled = false;
        playBtn_carrot.disabled = false;
        if (!scene_carrot) { // Only init_carrot once
          init_carrot();
        }
        activeLast_carrot = false;
        activeLast_apple = true;
      }
    });

  // Show the 3D model_carrot when "btn2" is pressed
  showBtn_carrot.addEventListener("click", function () {
    document.getElementById("searchBox").style.display = "none";
    document.getElementById("waiting").style.display = "none";
    wireframeBtn_carrot.style.display = "block";
    swapModel_carrot.style.display = "block";
    activeLast_carrot = true;
    document.getElementById("btn3").disabled = true;
    document.getElementById("btn2").disabled = true; 
      if (actions_carrot.length === 1) {
        actions_carrot.forEach(action => {
          action.reset();
          action.stop();
        } 
      )}
      modelContainer_carrot.style.display = "flex"; // Show model_carrot
      if (!scene_carrot) { // Only init_carrot once
        init_carrot();
      }
      playBtn_carrot.disabled = false;
  });

  // Play animation and hide model_carrot after delay when "btn" is pressed
  playBtn_carrot.addEventListener("click", function () {
    document.getElementById("emptyBasket").disabled = false;
    showBtn_carrot.disabled = true;
    wireframeBtn_carrot.style.display = "none";
    swapModel_carrot.style.display = "none";
    if (actions_carrot.length === 1) {
      actions_carrot.forEach(action => {
        action.setLoop(THREE.LoopOnce);   // Play only once
        action.clampWhenFinished = true;    // Maintain the final frame
        action.timeScale = 1;
        action.reset();
        action.play();
        if (sound_carrot.isPlaying) sound_carrot.stop();
        sound_carrot.play();
      });
    }
      setTimeout(() => {
          modelContainer_carrot.style.display = "none"; // Hide model_carrot after delay
          document.getElementById("btn3").disabled = false;
          document.getElementById("btn2").disabled = false; 
          showBtn_carrot.disabled = false;
          document.getElementById("searchBox").style.display = "flex";
          document.getElementById("waiting").style.display = "flex";
      }, 1500); // 5 seconds delay
      playBtn_carrot.disabled = true;
  });
});


function init_carrot() {
  container_carrot = document.getElementById("three-container_carrot");
  width_carrot = container_carrot.clientWidth;
  height_carrot = container_carrot.clientHeight;
  const assetPath = './'; // Path to assets
  clock_carrot = new THREE.Clock();
 
  // Create the scene_carrot
  scene_carrot = new THREE.Scene();
  scene_carrot.background = new THREE.Color(0x00aaff);

  // Set up the camera_carrot
  camera_carrot = new THREE.PerspectiveCamera(30, width_carrot / height_carrot, 0.1, 1000);
  camera_carrot.position.set(10, 0, 0);

  // Add lighting
  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene_carrot.add(ambient);

  const light1 = new THREE.DirectionalLight();
  light1.position.set(-10, 15, -6);
  scene_carrot.add(light1);
  light1.intensity = 1;
  const light2 = new THREE.DirectionalLight();
  light2.position.set(0, 13, 16);
  scene_carrot.add(light2);
  light2.intensity = 1;
  const light3 = new THREE.DirectionalLight();
  light3.position.set(15, 10, 7);
  scene_carrot.add(light3);
  light3.intensity = 1;
  const light4 = new THREE.DirectionalLight();
  light4.position.set(5, -10, 0);
  light4.intensity = 1;
  scene_carrot.add(light4);

  // Set up the renderer_carrot
  renderer_carrot = new THREE.WebGLRenderer({antialias: true});
  // Set initial renderer_carrot size; it will be updated in the resize_carrot() function
 
  renderer_carrot.setSize(width_carrot, height_carrot);

  // Append the renderer_carrot to the dark grey container_carrot
  document.getElementById("three-container_carrot").appendChild(renderer_carrot.domElement);

  // Add OrbitControls
  const controls = new THREE.OrbitControls(camera_carrot, renderer_carrot.domElement);
  controls.target.set(1, 2, 0);
  controls.update();
  
  const listener_carrot = new THREE.AudioListener();
  camera_carrot.add(listener_carrot);
  // Create a sound and attach it to the listener
  sound_carrot = new THREE.Audio(listener_carrot);  
  // Load a sound and set it as the buffer for the Audio object
  const audioLoader_carrot = new THREE.AudioLoader();
  audioLoader_carrot.load(assetPath+ 'assets/sounds/carrot_missiles.mp3', function (buffer) {
    sound_carrot.setBuffer(buffer);
    sound_carrot.setLoop(false);
    sound_carrot.setVolume(0.4);
  });

  // Load the glTF model_carrot
  const loader = new THREE.GLTFLoader();
  loader.load(assetPath + 'assets/glb/Carrot_with_animation_final.glb', function(gltf) {
    model_carrot = gltf.scene;
    scene_carrot.add(model_carrot);
    mixer_carrot = new THREE.AnimationMixer(model_carrot);
    const animations = gltf.animations;
    animations.forEach(clip => {
      const action = mixer_carrot.clipAction(clip);
      actions_carrot.push(action);
    });
  });

  // Handle resizing
  window.addEventListener('resize', resize_carrot, true);
  animate_carrot();
  
}
function toggleWireframe_carrot(enable){
  scene_carrot.traverse(function(object){
    if (object.isMesh){
      object.material.wireframe = enable;
    }
  });
}
function animate_carrot() {
  requestAnimationFrame(animate_carrot);
  if (mixer_carrot) {
    mixer_carrot.update(clock_carrot.getDelta());
  }
  renderer_carrot.render(scene_carrot, camera_carrot);
}

function resize_carrot() {
  // Resize renderer_carrot to match #three-container_carrot dimensions
  const container_carrot = document.getElementById("three-container_carrot");
  const width_carrot = container_carrot.clientWidth;
  const height_carrot = container_carrot.clientHeight;

  camera_carrot.aspect = width_carrot / height_carrot;
  camera_carrot.updateProjectionMatrix();
  renderer_carrot.setSize(width_carrot, height_carrot);
}
