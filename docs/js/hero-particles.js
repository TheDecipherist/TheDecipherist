// hero-particles.js — three-zone spatial particle system
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

const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
const SCALE    = isMobile ? 0.35 : 1;

// ── Zone boundaries (world-space x) ───────────────────────────────────────────
// Visible width at z=0 ≈ 10.3 units (16:9, FOV 60, z=5)
// Center 20% of screen  ≈ ±1.05 world units → use ±1.3 for comfortable band
const CTR_EDGE  = 1.3;   // center zone: x ∈ [-1.3, 1.3]
const LEFT_WALL = -9.5;
const RIGHT_WALL = 9.5;

// ── 1. Background starfield ────────────────────────────────────────────────────
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
  color: 0x99bbcc, size: 0.007, transparent: true, opacity: 0.28, sizeAttenuation: true,
})));

// ── 2. LEFT zone — green particles ────────────────────────────────────────────
const LEFT_N  = Math.floor(500 * SCALE);
const leftPos   = new Float32Array(LEFT_N * 3);
const leftVel   = new Float32Array(LEFT_N * 3);
const leftPhase = new Float32Array(LEFT_N);

for (let i = 0; i < LEFT_N; i++) {
  leftPos[i*3]   = rnd(LEFT_WALL, -CTR_EDGE);
  leftPos[i*3+1] = rnd(-5.5, 5.5);
  leftPos[i*3+2] = rnd(-1.2, 1.2);
  leftVel[i*3]   = rnd(-0.0018, 0.0018);
  leftVel[i*3+1] = rnd(-0.0018, 0.0018);
  leftVel[i*3+2] = rnd(-0.0008, 0.0008);
  leftPhase[i]   = Math.random() * Math.PI * 2;
}

const leftGeo = new THREE.BufferGeometry();
leftGeo.setAttribute('position', new THREE.BufferAttribute(leftPos, 3));
scene.add(new THREE.Points(leftGeo, new THREE.PointsMaterial({
  color: 0x3dffc8, size: 0.022, transparent: true, opacity: 0.88, sizeAttenuation: true,
})));

// ── 3. RIGHT zone — blue particles ────────────────────────────────────────────
const RIGHT_N  = Math.floor(500 * SCALE);
const rightPos   = new Float32Array(RIGHT_N * 3);
const rightVel   = new Float32Array(RIGHT_N * 3);
const rightPhase = new Float32Array(RIGHT_N);

for (let i = 0; i < RIGHT_N; i++) {
  rightPos[i*3]   = rnd(CTR_EDGE, RIGHT_WALL);
  rightPos[i*3+1] = rnd(-5.5, 5.5);
  rightPos[i*3+2] = rnd(-1.2, 1.2);
  rightVel[i*3]   = rnd(-0.0018, 0.0018);
  rightVel[i*3+1] = rnd(-0.0018, 0.0018);
  rightVel[i*3+2] = rnd(-0.0008, 0.0008);
  rightPhase[i]   = Math.random() * Math.PI * 2;
}

const rightGeo = new THREE.BufferGeometry();
rightGeo.setAttribute('position', new THREE.BufferAttribute(rightPos, 3));
scene.add(new THREE.Points(rightGeo, new THREE.PointsMaterial({
  color: 0x68b6d3, size: 0.020, transparent: true, opacity: 0.85, sizeAttenuation: true,
})));

// ── 4. CENTER zone — three accent colors via vertex colors ────────────────────
const CTR_N     = Math.floor(80 * SCALE);
const ctrPos    = new Float32Array(CTR_N * 3);
const ctrVel    = new Float32Array(CTR_N * 3);
const ctrPhase  = new Float32Array(CTR_N);
const ctrColors = new Float32Array(CTR_N * 3);

// #f1d184 gold, #c6421b red-orange, #e1d9e4 lavender
const PALETTE = [
  [0xf1/255, 0xd1/255, 0x84/255],
  [0xc6/255, 0x42/255, 0x1b/255],
  [0xe1/255, 0xd9/255, 0xe4/255],
];

for (let i = 0; i < CTR_N; i++) {
  ctrPos[i*3]   = rnd(-CTR_EDGE, CTR_EDGE);
  ctrPos[i*3+1] = rnd(0, 5.5);
  ctrPos[i*3+2] = rnd(-1.2, 1.2);
  ctrVel[i*3]   = rnd(-0.0012, 0.0012);
  ctrVel[i*3+1] = rnd(-0.0018, 0.0018);
  ctrVel[i*3+2] = rnd(-0.0008, 0.0008);
  ctrPhase[i]   = Math.random() * Math.PI * 2;
  const col = PALETTE[i % 3];
  ctrColors[i*3]   = col[0];
  ctrColors[i*3+1] = col[1];
  ctrColors[i*3+2] = col[2];
}

const ctrGeo = new THREE.BufferGeometry();
ctrGeo.setAttribute('position', new THREE.BufferAttribute(ctrPos, 3));
ctrGeo.setAttribute('color',    new THREE.BufferAttribute(ctrColors, 3));
scene.add(new THREE.Points(ctrGeo, new THREE.PointsMaterial({
  vertexColors: true, size: 0.026, transparent: true, opacity: 0.92, sizeAttenuation: true,
})));

// ── 5. Connection lines — green left zone ─────────────────────────────────────
const MAX_LINES = 200;
const DIST_SQ   = 3.2 * 3.2;
const lineArr   = new Float32Array(MAX_LINES * 6);
const lineGeo   = new THREE.BufferGeometry();
lineGeo.setAttribute('position', new THREE.BufferAttribute(lineArr, 3));
const lineSegments = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
  color: 0x3dffc8, transparent: true, opacity: 0.10,
}));
lineGeo.setDrawRange(0, 0);
scene.add(lineSegments);

let connTimer = 0;
function rebuildConnections() {
  let n = 0;
  for (let a = 0; a < LEFT_N && n < MAX_LINES; a++) {
    const ax = leftPos[a*3], ay = leftPos[a*3+1], az = leftPos[a*3+2];
    for (let b = a + 1; b < LEFT_N && n < MAX_LINES; b++) {
      const dx = ax - leftPos[b*3], dy = ay - leftPos[b*3+1], dz = az - leftPos[b*3+2];
      if (dx*dx + dy*dy + dz*dz < DIST_SQ) {
        const o = n * 6;
        lineArr[o]   = ax;             lineArr[o+1] = ay;             lineArr[o+2] = az;
        lineArr[o+3] = leftPos[b*3];   lineArr[o+4] = leftPos[b*3+1]; lineArr[o+5] = leftPos[b*3+2];
        n++;
      }
    }
  }
  lineGeo.attributes.position.needsUpdate = true;
  lineGeo.setDrawRange(0, n * 2);
}

// ── 6. Foreground sparkles ─────────────────────────────────────────────────────
const FG_COUNT = Math.floor(400 * SCALE);
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
  color: 0x99ccdd, size: 0.007, transparent: true, opacity: 0.30, sizeAttenuation: true,
})));

// ── 7. Ambient orbs ───────────────────────────────────────────────────────────
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

// ── 8. Meteor streaks ─────────────────────────────────────────────────────────
const METEOR_POOL = isMobile ? 4 : 10;
const meteors = [];
for (let i = 0; i < METEOR_POOL; i++) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
  const mat  = new THREE.LineBasicMaterial({ color: 0xffd27f, transparent: true, opacity: 0 });
  const mesh = new THREE.LineSegments(geo, mat);
  scene.add(mesh);
  meteors.push({ mesh, geo, mat, active: false, x:0, y:0, z:0, dx:0, dy:0, life:0, maxLife:0, tail:0 });
}

function spawnMeteor(m) {
  const angle = -(Math.PI * rnd(0.08, 0.30));
  m.x = rnd(-11, 11); m.y = rnd(0, 5.5); m.z = rnd(-0.5, 1.0);
  m.dx = Math.cos(angle) * rnd(0.10, 0.22);
  m.dy = Math.sin(angle) * rnd(0.04, 0.12) - 0.04;
  m.life = 0; m.maxLife = Math.floor(rnd(35, 90)); m.tail = rnd(0.4, 1.4); m.active = true;
}

function tickMeteor(m) {
  if (!m.active) return;
  m.life++;
  const p = m.life / m.maxLife;
  m.mat.opacity = (p < 0.25 ? p / 0.25 : p > 0.65 ? 1 - (p - 0.65) / 0.35 : 1) * 0.80;
  m.x += m.dx; m.y += m.dy;
  const pos = m.geo.attributes.position.array;
  pos[0] = m.x; pos[1] = m.y; pos[2] = m.z;
  pos[3] = m.x - m.dx * m.tail * 5; pos[4] = m.y - m.dy * m.tail * 5; pos[5] = m.z;
  m.geo.attributes.position.needsUpdate = true;
  if (m.life >= m.maxLife) m.active = false;
}

// ── 9. Pulse rings ────────────────────────────────────────────────────────────
const RING_SEGS = 64, RING_POOL = isMobile ? 2 : 4;
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
  const geo  = buildRingGeo();
  const mat  = new THREE.LineBasicMaterial({ color: 0x3dffc8, transparent: true, opacity: 0 });
  const mesh = new THREE.LineLoop(geo, mat);
  scene.add(mesh);
  rings.push({ mesh, mat, active: false, x:0, y:0, radius:0, life:0, maxLife:0 });
}
function spawnRing(r) {
  r.x = rnd(-6, 6); r.y = rnd(-4, 4);
  r.mesh.position.set(r.x, r.y, rnd(-0.5, 0.5));
  r.radius = 0.01; r.life = 0; r.maxLife = Math.floor(rnd(60, 120)); r.active = true;
}
function tickRing(r) {
  if (!r.active) return;
  r.life++;
  r.radius += 0.04;
  r.mesh.scale.setScalar(r.radius);
  r.mat.opacity = (1 - r.life / r.maxLife) * 0.18;
  if (r.life >= r.maxLife) { r.active = false; r.mat.opacity = 0; }
}

// ── Mouse ──────────────────────────────────────────────────────────────────────
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth  - 0.5);
  mouseY = (e.clientY / window.innerHeight - 0.5);
}, { passive: true });

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, { passive: true });

const observer = new MutationObserver(() => {
  if (!document.contains(canvas)) {
    cancelAnimationFrame(raf);
    renderer.dispose();
    observer.disconnect();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

// ── Animation loop ─────────────────────────────────────────────────────────────
let raf;
const clock = new THREE.Clock();
let frame = 0, nextMeteor = 0, nextRing = 0;

function animate() {
  raf = requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  frame++;

  // LEFT zone — green, wraps within left half
  for (let i = 0; i < LEFT_N; i++) {
    const wave = Math.sin(t * 0.35 + leftPhase[i]) * 0.0012;
    leftPos[i*3]   += leftVel[i*3]   + mouseX * 0.0035 + wave;
    leftPos[i*3+1] += leftVel[i*3+1] - mouseY * 0.0035 + wave;
    leftPos[i*3+2] += leftVel[i*3+2];
    // Wrap: if it drifts into the center zone, teleport back to the far left
    if (leftPos[i*3] > -CTR_EDGE)  leftPos[i*3] = LEFT_WALL;
    if (leftPos[i*3] < LEFT_WALL)  leftPos[i*3] = -CTR_EDGE;
    if (leftPos[i*3+1] >  6)       leftPos[i*3+1] = -6;
    if (leftPos[i*3+1] < -6)       leftPos[i*3+1] =  6;
    if (leftPos[i*3+2] >  1.5)     leftPos[i*3+2] = -1.5;
    if (leftPos[i*3+2] < -1.5)     leftPos[i*3+2] =  1.5;
  }
  leftGeo.attributes.position.needsUpdate = true;

  // RIGHT zone — blue, wraps within right half
  for (let i = 0; i < RIGHT_N; i++) {
    const wave = Math.sin(t * 0.35 + rightPhase[i]) * 0.0012;
    rightPos[i*3]   += rightVel[i*3]   + mouseX * 0.0035 + wave;
    rightPos[i*3+1] += rightVel[i*3+1] - mouseY * 0.0035 + wave;
    rightPos[i*3+2] += rightVel[i*3+2];
    // Wrap: if it drifts into center, teleport back to far right
    if (rightPos[i*3] < CTR_EDGE)   rightPos[i*3] = RIGHT_WALL;
    if (rightPos[i*3] > RIGHT_WALL) rightPos[i*3] = CTR_EDGE;
    if (rightPos[i*3+1] >  6)       rightPos[i*3+1] = -6;
    if (rightPos[i*3+1] < -6)       rightPos[i*3+1] =  6;
    if (rightPos[i*3+2] >  1.5)     rightPos[i*3+2] = -1.5;
    if (rightPos[i*3+2] < -1.5)     rightPos[i*3+2] =  1.5;
  }
  rightGeo.attributes.position.needsUpdate = true;

  // CENTER zone — three accent colors, wraps within center band
  for (let i = 0; i < CTR_N; i++) {
    const wave = Math.sin(t * 0.40 + ctrPhase[i]) * 0.0010;
    ctrPos[i*3]   += ctrVel[i*3]   + mouseX * 0.0015 + wave;
    ctrPos[i*3+1] += ctrVel[i*3+1] - mouseY * 0.0035 + wave;
    ctrPos[i*3+2] += ctrVel[i*3+2];
    if (ctrPos[i*3] >  CTR_EDGE) ctrPos[i*3] = -CTR_EDGE;
    if (ctrPos[i*3] < -CTR_EDGE) ctrPos[i*3] =  CTR_EDGE;
    if (ctrPos[i*3+1] >  6)      ctrPos[i*3+1] =  0;
    if (ctrPos[i*3+1] <  0)      ctrPos[i*3+1] =  6;
    if (ctrPos[i*3+2] >  1.5)    ctrPos[i*3+2] = -1.5;
    if (ctrPos[i*3+2] < -1.5)    ctrPos[i*3+2] =  1.5;
  }
  ctrGeo.attributes.position.needsUpdate = true;

  // Connections (green left zone)
  if (++connTimer >= 4) { rebuildConnections(); connTimer = 0; }

  // Foreground sparkles
  for (let i = 0; i < FG_COUNT; i++) {
    fgPos[i*3]   += 0.0008 * Math.sin(t * 0.18 + fgPhase[i]);
    fgPos[i*3+1] += 0.0008 * Math.cos(t * 0.13 + fgPhase[i] * 1.3);
    if (fgPos[i*3]   >  10) fgPos[i*3]   = -10;
    if (fgPos[i*3]   < -10) fgPos[i*3]   =  10;
    if (fgPos[i*3+1] >   6) fgPos[i*3+1] =  -6;
    if (fgPos[i*3+1] <  -6) fgPos[i*3+1] =   6;
  }
  fgGeo.attributes.position.needsUpdate = true;

  // Orbs
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

  scene.rotation.z = Math.sin(t * 0.025) * 0.035;
  renderer.render(scene, camera);
}

animate();
