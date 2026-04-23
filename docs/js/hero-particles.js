// hero-particles.js — multi-system canvas
// Requires Three.js on window (CDN loaded before this)

const canvas = document.getElementById('hero-canvas');
if (!canvas || typeof THREE === 'undefined') {
  throw new Error('hero-particles: canvas or THREE not available');
}

const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const rnd = (a, b) => a + Math.random() * (b - a);

// Reduce counts on mobile/low-power devices
const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
const SCALE = isMobile ? 0.35 : 1;

// ── 1. Background starfield — tiny, deep, barely moving ──────────────────────
const BG_COUNT = Math.floor(1400 * SCALE);
const bgPos = new Float32Array(BG_COUNT * 3);
for (let i = 0; i < BG_COUNT; i++) {
  bgPos[i*3]   = rnd(-13, 13);
  bgPos[i*3+1] = rnd(-8,  8);
  bgPos[i*3+2] = rnd(-4, -1.5);
}
const bgGeo = new THREE.BufferGeometry();
bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({
  color: 0x99bbcc, size: 0.007, transparent: true, opacity: 0.30, sizeAttenuation: true,
})));

// ── 2. Mid-layer network nodes — drift + mouse + sine wave ───────────────────
const NODE_COUNT = Math.floor(380 * SCALE);
const nodePos   = new Float32Array(NODE_COUNT * 3);
const nodeVel   = new Float32Array(NODE_COUNT * 3);
const nodePhase = new Float32Array(NODE_COUNT);

for (let i = 0; i < NODE_COUNT; i++) {
  nodePos[i*3]   = rnd(-9, 9);
  nodePos[i*3+1] = rnd(-5.5, 5.5);
  nodePos[i*3+2] = rnd(-1.2, 1.2);
  nodeVel[i*3]   = rnd(-0.0018, 0.0018);
  nodeVel[i*3+1] = rnd(-0.0018, 0.0018);
  nodeVel[i*3+2] = rnd(-0.0008, 0.0008);
  nodePhase[i]   = Math.random() * Math.PI * 2;
}

// Split node buffer into green (first half) and blue (second half)
const HALF = Math.floor(NODE_COUNT / 2);

const nodeGeoGreen = new THREE.BufferGeometry();
nodeGeoGreen.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
nodeGeoGreen.setDrawRange(0, HALF);
scene.add(new THREE.Points(nodeGeoGreen, new THREE.PointsMaterial({
  color: 0x3dffc8, size: 0.020, transparent: true, opacity: 0.85, sizeAttenuation: true,
})));

const nodeGeoBlue = new THREE.BufferGeometry();
nodeGeoBlue.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
nodeGeoBlue.setDrawRange(HALF, NODE_COUNT - HALF);
scene.add(new THREE.Points(nodeGeoBlue, new THREE.PointsMaterial({
  color: 0x68b6d3, size: 0.018, transparent: true, opacity: 0.80, sizeAttenuation: true,
})));

// ── 3. Connection lines between nearby nodes ──────────────────────────────────
const MAX_LINES  = 280;
const DIST_SQ    = 2.8 * 2.8;
const lineArr    = new Float32Array(MAX_LINES * 6);
const lineGeo    = new THREE.BufferGeometry();
lineGeo.setAttribute('position', new THREE.BufferAttribute(lineArr, 3));
const lineSegments = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
  color: 0x3dffc8, transparent: true, opacity: 0.11,
}));
lineGeo.setDrawRange(0, 0);
scene.add(lineSegments);

let connTimer = 0;
function rebuildConnections() {
  let n = 0;
  for (let a = 0; a < NODE_COUNT && n < MAX_LINES; a++) {
    const ax = nodePos[a*3], ay = nodePos[a*3+1], az = nodePos[a*3+2];
    for (let b = a + 1; b < NODE_COUNT && n < MAX_LINES; b++) {
      const dx = ax - nodePos[b*3], dy = ay - nodePos[b*3+1], dz = az - nodePos[b*3+2];
      if (dx*dx + dy*dy + dz*dz < DIST_SQ) {
        const o = n * 6;
        lineArr[o]   = ax;           lineArr[o+1] = ay;           lineArr[o+2] = az;
        lineArr[o+3] = nodePos[b*3]; lineArr[o+4] = nodePos[b*3+1]; lineArr[o+5] = nodePos[b*3+2];
        n++;
      }
    }
  }
  lineGeo.attributes.position.needsUpdate = true;
  lineGeo.setDrawRange(0, n * 2);
}

// ── 4. Foreground sparkles — faster, slightly different hue, parallax ─────────
const FG_COUNT = Math.floor(550 * SCALE);
const fgPos   = new Float32Array(FG_COUNT * 3);
const fgPhase = new Float32Array(FG_COUNT);
for (let i = 0; i < FG_COUNT; i++) {
  fgPos[i*3]   = rnd(-10, 10);
  fgPos[i*3+1] = rnd(-6, 6);
  fgPos[i*3+2] = rnd(0.5, 2.2);
  fgPhase[i]   = Math.random() * Math.PI * 2;
}
const fgGeo = new THREE.BufferGeometry();
fgGeo.setAttribute('position', new THREE.BufferAttribute(fgPos, 3));
scene.add(new THREE.Points(fgGeo, new THREE.PointsMaterial({
  color: 0x68b6d3, size: 0.009, transparent: true, opacity: 0.45, sizeAttenuation: true,
})));

// ── 5. Ambient orbs — 6 large slow-drifting glowing blobs ─────────────────────
const ORB_COUNT = 6;
const orbPos   = new Float32Array(ORB_COUNT * 3);
const orbPhase = new Float32Array(ORB_COUNT);
const orbSpeed = new Float32Array(ORB_COUNT);
for (let i = 0; i < ORB_COUNT; i++) {
  orbPos[i*3]   = rnd(-7, 7);
  orbPos[i*3+1] = rnd(-4, 4);
  orbPos[i*3+2] = rnd(-0.5, 0.5);
  orbPhase[i]   = Math.random() * Math.PI * 2;
  orbSpeed[i]   = rnd(0.15, 0.35);
}
const orbGeo = new THREE.BufferGeometry();
orbGeo.setAttribute('position', new THREE.BufferAttribute(orbPos, 3));
scene.add(new THREE.Points(orbGeo, new THREE.PointsMaterial({
  color: 0xffd580, size: 0.20, transparent: true, opacity: 0.08, sizeAttenuation: true,
})));

// ── 6. Meteor streaks — amber/gold dashes that shoot across ───────────────────
const METEOR_POOL = isMobile ? 4 : 10;
const meteors = [];

for (let i = 0; i < METEOR_POOL; i++) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
  const mat = new THREE.LineBasicMaterial({ color: 0xffd27f, transparent: true, opacity: 0 });
  const mesh = new THREE.LineSegments(geo, mat);
  scene.add(mesh);
  meteors.push({ mesh, geo, mat, active: false, x: 0, y: 0, z: 0, dx: 0, dy: 0, life: 0, maxLife: 0, tail: 0 });
}

function spawnMeteor(m) {
  const angle = -(Math.PI * rnd(0.08, 0.30));
  m.x       = rnd(-11, 11);
  m.y       = rnd(0, 5.5);
  m.z       = rnd(-0.5, 1.0);
  m.dx      = Math.cos(angle) * rnd(0.10, 0.22);
  m.dy      = Math.sin(angle) * rnd(0.04, 0.12) - 0.04;
  m.life    = 0;
  m.maxLife = Math.floor(rnd(35, 90));
  m.tail    = rnd(0.4, 1.4);
  m.active  = true;
}

function tickMeteor(m) {
  if (!m.active) return;
  m.life++;
  const p = m.life / m.maxLife;
  m.mat.opacity = (p < 0.25 ? p / 0.25 : p > 0.65 ? 1 - (p - 0.65) / 0.35 : 1) * 0.80;
  m.x += m.dx; m.y += m.dy;
  const pos = m.geo.attributes.position.array;
  pos[0] = m.x;                  pos[1] = m.y;                  pos[2] = m.z;
  pos[3] = m.x - m.dx * m.tail * 5;
  pos[4] = m.y - m.dy * m.tail * 5;
  pos[5] = m.z;
  m.geo.attributes.position.needsUpdate = true;
  if (m.life >= m.maxLife) m.active = false;
}

// ── 7. Pulse rings — occasional expanding rings ────────────────────────────────
const RING_SEGS  = 64;
const RING_POOL  = isMobile ? 2 : 4;
const rings = [];

function buildRingGeo() {
  const pts = [];
  for (let i = 0; i <= RING_SEGS; i++) {
    const a = (i / RING_SEGS) * Math.PI * 2;
    pts.push(Math.cos(a), Math.sin(a), 0);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
  return g;
}

for (let i = 0; i < RING_POOL; i++) {
  const geo = buildRingGeo();
  const mat = new THREE.LineBasicMaterial({ color: 0x3dffc8, transparent: true, opacity: 0 });
  const mesh = new THREE.LineLoop(geo, mat);
  scene.add(mesh);
  rings.push({ mesh, mat, active: false, x: 0, y: 0, radius: 0, life: 0, maxLife: 0 });
}

function spawnRing(r) {
  r.x = rnd(-6, 6); r.y = rnd(-4, 4);
  r.mesh.position.set(r.x, r.y, rnd(-0.5, 0.5));
  r.radius = 0.01;
  r.life   = 0;
  r.maxLife = Math.floor(rnd(60, 120));
  r.active = true;
}

function tickRing(r) {
  if (!r.active) return;
  r.life++;
  const p = r.life / r.maxLife;
  r.radius += 0.04;
  r.mesh.scale.setScalar(r.radius);
  r.mat.opacity = (1 - p) * 0.18;
  if (r.life >= r.maxLife) { r.active = false; r.mat.opacity = 0; }
}

// ── Mouse ──────────────────────────────────────────────────────────────────────
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth  - 0.5);
  mouseY = (e.clientY / window.innerHeight - 0.5);
}, { passive: true });

// ── Resize ─────────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, { passive: true });

// ── Cleanup ─────────────────────────────────────────────────────────────────────
const observer = new MutationObserver(() => {
  if (!document.contains(canvas)) {
    cancelAnimationFrame(raf);
    renderer.dispose();
    observer.disconnect();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

// ── Animation loop ────────────────────────────────────────────────────────────
let raf;
const clock = new THREE.Clock();
let frame = 0;
let nextMeteor = 0;
let nextRing   = 0;

function animate() {
  raf = requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  frame++;

  // Network nodes: drift + wave + mouse
  for (let i = 0; i < NODE_COUNT; i++) {
    const wave = Math.sin(t * 0.35 + nodePhase[i]) * 0.0012;
    nodePos[i*3]   += nodeVel[i*3]   + mouseX * 0.0035 + wave;
    nodePos[i*3+1] += nodeVel[i*3+1] - mouseY * 0.0035 + wave;
    nodePos[i*3+2] += nodeVel[i*3+2];
    if (nodePos[i*3]   >  9.5) nodePos[i*3]   = -9.5;
    if (nodePos[i*3]   < -9.5) nodePos[i*3]   =  9.5;
    if (nodePos[i*3+1] >  6)   nodePos[i*3+1] = -6;
    if (nodePos[i*3+1] < -6)   nodePos[i*3+1] =  6;
    if (nodePos[i*3+2] >  1.5) nodePos[i*3+2] = -1.5;
    if (nodePos[i*3+2] < -1.5) nodePos[i*3+2] =  1.5;
  }
  nodeGeoGreen.attributes.position.needsUpdate = true;
  nodeGeoBlue.attributes.position.needsUpdate = true;

  // Rebuild connections every 4 frames
  if (++connTimer >= 4) { rebuildConnections(); connTimer = 0; }

  // Foreground sparkles: gentle Lissajous drift
  for (let i = 0; i < FG_COUNT; i++) {
    fgPos[i*3]   += 0.0008 * Math.sin(t * 0.18 + fgPhase[i]);
    fgPos[i*3+1] += 0.0008 * Math.cos(t * 0.13 + fgPhase[i] * 1.3);
    if (fgPos[i*3]   >  10) fgPos[i*3]   = -10;
    if (fgPos[i*3]   < -10) fgPos[i*3]   =  10;
    if (fgPos[i*3+1] >   6) fgPos[i*3+1] =  -6;
    if (fgPos[i*3+1] <  -6) fgPos[i*3+1] =   6;
  }
  fgGeo.attributes.position.needsUpdate = true;

  // Orbs: slow orbit paths
  for (let i = 0; i < ORB_COUNT; i++) {
    orbPos[i*3]   = Math.cos(t * orbSpeed[i] * 0.12 + orbPhase[i]) * rnd(3, 7);
    orbPos[i*3+1] = Math.sin(t * orbSpeed[i] * 0.09 + orbPhase[i]) * rnd(2, 4);
  }
  orbGeo.attributes.position.needsUpdate = true;

  // Meteors
  if (frame >= nextMeteor) {
    const m = meteors.find(x => !x.active);
    if (m) spawnMeteor(m);
    nextMeteor = frame + Math.floor(rnd(60, 180));
  }
  meteors.forEach(tickMeteor);

  // Pulse rings
  if (frame >= nextRing) {
    const r = rings.find(x => !x.active);
    if (r) spawnRing(r);
    nextRing = frame + Math.floor(rnd(90, 250));
  }
  rings.forEach(tickRing);

  // Gentle slow rock
  scene.rotation.z = Math.sin(t * 0.025) * 0.035;

  renderer.render(scene, camera);
}

animate();
