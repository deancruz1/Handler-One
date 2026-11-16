/* The Arsenal's two views: one machine on a deck that can be walked around, and all of them side-on at one scale.
   mountArsenal builds both inside the given elements and returns { update(view), dispose() }. */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import K from "./models.js";
import { allowPageScroll, pixelRatio, watchVisible } from "./stage.js";

const BG = 0x05070a, BLUE = 0x4da3ff, AMBER = 0xf5a524;
const css = c => "#" + c.toString(16).padStart(6, "0");
const tint = m => (m.hostile ? AMBER : BLUE);
const short = m => m.name.replace(/\s*\(.*/, "");

export function mountArsenal({ stage, lineup, mechs, onSelect }) {
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const made = [];                                                   // DOM this scene adds, removed again on dispose
  const add = (parent, tag) => { const el = document.createElement(tag); parent.appendChild(el); made.push(el); return el; };
  let view = null, model = null, raf = 0;

  /* ── viewer ── */
  const renderer = new THREE.WebGLRenderer({ canvas: add(stage, "canvas"), antialias: true });
  renderer.setClearColor(BG); renderer.setPixelRatio(pixelRatio());
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene(), env = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200); camera.position.set(8, 4.4, 10);
  const controls = new OrbitControls(camera, renderer.domElement); allowPageScroll(controls);
  Object.assign(controls, { enableZoom: false, enablePan: false, enableDamping: true, minPolarAngle: 0.7, maxPolarAngle: 1.52, autoRotate: !reduce, autoRotateSpeed: 0.5 });
  scene.add(new THREE.HemisphereLight(0xdfe9ff, 0x10151c, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 2.6); key.position.set(-6, 11, 7); key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8 }); key.shadow.bias = -0.0005; scene.add(key);
  const rim = new THREE.DirectionalLight(0x4da3ff, 1.6); rim.position.set(7, 4, -8); scene.add(rim);

  // deck: range rings, a metre grid and a shadow catcher for the painted look
  const deckMat = new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.3 });
  for (const r of [3, 5, 7]) scene.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 128 }, (_, i) => new THREE.Vector3(Math.cos(i / 128 * 6.2832) * r, 0, Math.sin(i / 128 * 6.2832) * r))), deckMat));
  { const p = []; for (let i = -9; i <= 9; i++) p.push(i, 0, -9, i, 0, 9, -9, 0, i, 9, 0, i);
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
    scene.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.07 }))); }
  const catcher = new THREE.Mesh(new THREE.CircleGeometry(30, 48), new THREE.ShadowMaterial({ opacity: 0.55 })); catcher.rotation.x = -Math.PI / 2; catcher.receiveShadow = true; scene.add(catcher);

  const cache = {};
  function build() {
    const m = mechs.find(x => x.id === view.id), keyId = m.id + (m.crew ? view.load : "");
    if (model) scene.remove(model);
    model = cache[keyId] ??= K[m.model](THREE, { blades: view.load === "blades" }); scene.add(model); model.userData.update(0, "hold");
    const box = new THREE.Box3(); model.traverse(o => { if (o.isMesh && !o.userData.xray) box.expandByObject(o); });
    const z0 = box.min.z, z1 = box.max.z, h = box.max.y;
    controls.target.set(0, h * 0.42, (z0 + z1) / 2 * 0.5); camera.position.sub(controls.target).setLength(6.5 + (z1 - z0) * 1.3).add(controls.target);
    restyle();
  }
  function restyle() {
    const m = mechs.find(x => x.id === view.id), paint = view.style === "paint", c = tint(m);
    if (paint) { K.solid(THREE, model, { opacity: 0.2 }); model.traverse(o => { if (o.material && "envMapIntensity" in o.material && !o.material.envMap) o.material.envMapIntensity = 0.45; }); }
    else K.hologram(THREE, model, { color: c, fill: 0x060a11 });
    scene.environment = paint ? env : null; catcher.visible = paint; deckMat.color.set(c);
    const p = model.userData.pilot; if (p) { p.visible = view.pilot === "on"; p.traverse(o => o.material?.color.set(0xe6eef7)); }
  }

  /* ── scale lineup: every machine side-on at one scale, over a metre rule ── */
  const luR = new THREE.WebGLRenderer({ canvas: add(lineup, "canvas"), antialias: true, alpha: true }); luR.setPixelRatio(pixelRatio());
  const luScene = new THREE.Scene(), luCam = new THREE.OrthographicCamera();
  const occ = new THREE.MeshBasicMaterial({ color: BG, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, side: THREE.DoubleSide });
  const slots = []; let cursor = 1;
  mechs.forEach(m => {
    const b = K.bake(THREE, K[m.model](THREE)); b.edges.computeBoundingBox(); const bb = b.edges.boundingBox, len = bb.max.z - bb.min.z;
    const line = new THREE.LineBasicMaterial({ color: tint(m), transparent: true, opacity: 0.4 }), g = new THREE.Group(); g.add(new THREE.Mesh(b.fill, occ), new THREE.LineSegments(b.edges, line));
    g.position.z = -(cursor + bb.max.z); luScene.add(g); slots.push({ m, line, from: cursor - 0.5, to: cursor + len + 0.5 }); cursor += len + 1.6;
  });
  luScene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 2), new THREE.Vector3(0, 0, -cursor - 2)]), new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.35 })));
  { const p = []; for (let z = 0; z <= cursor; z++) p.push(new THREE.Vector3(0, 0, -z), new THREE.Vector3(0, z % 5 ? -0.12 : -0.26, -z));
    luScene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(p), new THREE.LineBasicMaterial({ color: 0xd9e2ec, transparent: true, opacity: 0.55 }))); }
  const marks = []; for (let z = 5; z < cursor; z += 5) { const el = add(lineup, "span"); el.className = "m"; el.textContent = z + " m"; marks.push({ el, z }); }
  slots.forEach(s => { const b = add(lineup, "button"); b.type = "button"; b.style.setProperty("--c", css(tint(s.m))); b.textContent = short(s.m); b.onclick = () => onSelect(s.m.id); s.btn = b; });
  function drawLineup() {
    const w = lineup.clientWidth, h = lineup.clientHeight; if (!w || !view) return;
    const total = cursor - 0.6, mid = cursor / 2 - 0.3, asp = w / h, vh = Math.max(total / asp, 5.6) / 2, X = z => (z - mid + vh * asp) / (2 * vh * asp) * w;
    luR.setSize(w, h, false); Object.assign(luCam, { left: -vh * asp, right: vh * asp, top: vh * 2 - 0.9, bottom: -0.9, near: 0.1, far: 200 });
    luCam.position.set(50, 0, -mid); luCam.lookAt(0, 0, -mid); luCam.updateProjectionMatrix();
    slots.forEach(s => { const on = s.m.id === view.id; s.line.opacity = on ? 1 : 0.38; s.btn.setAttribute("aria-pressed", on); s.btn.style.left = X(s.from) + "px"; s.btn.style.width = X(s.to) - X(s.from) + "px"; });
    marks.forEach(m => { m.el.style.left = X(m.z) + "px"; });
    luR.render(luScene, luCam);
  }

  /* ── loop ── */
  const clock = new THREE.Clock();
  const fit = () => { const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); drawLineup(); };
  const ro = new ResizeObserver(fit); ro.observe(stage); ro.observe(lineup);
  const seen = watchVisible(stage);
  function frame() {
    raf = requestAnimationFrame(frame);
    if (!model || !seen.on) return;
    controls.update(); model.userData.update(clock.getElapsedTime(), view.motion); renderer.render(scene, camera);
  }
  frame();

  return {
    update(next) {
      const prev = view; view = next;
      if (!prev || prev.id !== next.id || prev.load !== next.load) build();
      else if (prev.style !== next.style || prev.pilot !== next.pilot) restyle();
      if (!prev || prev.id !== next.id) drawLineup();
    },
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); seen.stop(); controls.dispose(); env.dispose();
      for (const r of [renderer, luR]) { r.dispose(); r.forceContextLoss(); }
      made.forEach(el => el.remove());
    },
  };
}
