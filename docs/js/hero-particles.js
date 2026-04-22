// hero-particles.js
// Loaded ONLY after window load event (see index.html <body> script)
// Requires Three.js already available on window (loaded from CDN before this)

const canvas = document.getElementById('hero-canvas');
if (!canvas || typeof THREE === 'undefined') {
  // Silently exit — particles are decorative only
  throw new Error('hero-particles: canvas or THREE not available');
}

const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Particle geometry — ~2000 particles in cipher grid formation
const COUNT    = 2000;
const positions = new Float32Array(COUNT * 3);
const speeds    = new Float32Array(COUNT);

for (let i = 0; i < COUNT; i++) {
  // Grid formation with slight randomness
  const gridX = ((i % 40) - 20) * 0.25;
  const gridY = (Math.floor(i / 40) - 25) * 0.25;
  positions[i * 3]     = gridX + (Math.random() - 0.5) * 0.15;
  positions[i * 3 + 1] = gridY + (Math.random() - 0.5) * 0.15;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
  speeds[i] = Math.random() * 0.003 + 0.001;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0x17b8a0,  // approximate teal (non-OKLCH — Three.js color space)
  size: 0.018,
  transparent: true,
  opacity: 0.55,
  sizeAttenuation: true,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Mouse gravitational pull
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.5;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
}, { passive: true });

// Resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', onResize, { passive: true });

// Cleanup when canvas leaves DOM
const observer = new MutationObserver(() => {
  if (!document.contains(canvas)) {
    cancelAnimationFrame(raf);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    observer.disconnect();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

// Animation loop
let raf;
const clock = new THREE.Clock();

function animate() {
  raf = requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const pos = particles.geometry.attributes.position.array;

  for (let i = 0; i < COUNT; i++) {
    // Slow random drift with subtle mouse influence
    pos[i * 3]     += (mouseX * 0.008 - pos[i * 3]     * 0.0003);
    pos[i * 3 + 1] += (-mouseY * 0.008 - pos[i * 3 + 1] * 0.0003);
    pos[i * 3 + 2] += speeds[i] * Math.sin(t * 0.3 + i);
    // Wrap Z
    if (pos[i * 3 + 2] > 1)  pos[i * 3 + 2] = -1;
    if (pos[i * 3 + 2] < -1) pos[i * 3 + 2] = 1;
  }

  particles.geometry.attributes.position.needsUpdate = true;
  particles.rotation.y = t * 0.01;
  renderer.render(scene, camera);
}

animate();
