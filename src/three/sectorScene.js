/* The Overview's sector map: wireframe terrain with the Gran Mur at its western edge, the squadron's machines
   standing on it, crosses where signals were lost, and the Legion massing to the east. A second, small view shows
   the selected Processor's machine up close.
   mountSector(mapEl, inset, roster, onSelect) returns { select(id), dispose() }. Roster entries need
   { id, codename, serial, kia, machine } where machine is "guns", "blades" or null for the Handler. */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import K from "./models.js";

export function mountSector(mapEl, inset, roster, onSelect) {
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const made = [];
  let seed = 86; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  /* ── terrain ── */
  const W = 64, D = 44, hw = W / 2, hd = D / 2;
  const H = (x, z) => 1.9 * Math.sin(x * .16 + 1) * Math.cos(z * .13) + 1.1 * Math.sin(x * .07 + z * .09) + .45 * Math.sin(x * .41) * Math.sin(z * .37);
  const scene = new THREE.Scene();
  const BG = 0x05070a; scene.fog = new THREE.Fog(BG, 48, 96);
  const cBlue = new THREE.Color(0x2f7fd6), cAmber = new THREE.Color(0xb56a14), cDim = new THREE.Color(0x24384f);
  const pos = [], col = [];
  const tint = x => { const c = x < -20 ? cDim.clone() : cBlue.clone().lerp(cAmber, THREE.MathUtils.smoothstep(x, 9, 24)); return c; };
  const seg = (x1, z1, x2, z2) => { pos.push(x1, H(x1, z1), z1, x2, H(x2, z2), z2); const a = tint(x1), b = tint(x2); col.push(a.r, a.g, a.b, b.r, b.g, b.b); };
  for (let z = -hd; z <= hd; z++) for (let x = -hw; x < hw; x++) seg(x, z, x + 1, z);
  for (let x = -hw; x <= hw; x++) for (let z = -hd; z < hd; z++) seg(x, z, x, z + 1);
  const grid = new THREE.BufferGeometry();
  grid.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  grid.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  scene.add(new THREE.LineSegments(grid, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: .7 })));
  const skin = new THREE.PlaneGeometry(W, D, W, D); skin.rotateX(-Math.PI / 2);
  const sp = skin.attributes.position; for (let i = 0; i < sp.count; i++) sp.setY(i, H(sp.getX(i), sp.getZ(i)) - .03);
  scene.add(new THREE.Mesh(skin, new THREE.MeshBasicMaterial({ color: BG, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 })));

  /* Gran Mur — the wall the Handler sits behind */
  const wall = []; const WX = -20;
  for (let z = -hd; z < hd; z++) { const a = H(WX, z), b = H(WX, z + 1); wall.push(WX, a, z, WX, b, z + 1, WX, a + 1.6, z, WX, b + 1.6, z + 1); if (z % 2 === 0) wall.push(WX, a, z, WX, a + 1.6, z); }
  const wg = new THREE.BufferGeometry(); wg.setAttribute('position', new THREE.Float32BufferAttribute(wall, 3));
  scene.add(new THREE.LineSegments(wg, new THREE.LineBasicMaterial({ color: 0xd9e2ec, transparent: true, opacity: .75 })));

  /* ── units: real machines, each baked down to two draw calls ── */
  const at = (x, z, lift = 0) => new THREE.Vector3(x, H(x, z) + lift, z);
  const spots = { lena: [-27, 3], shin: [5, -3], raiden: [1, 4], theo: [8, 6], kurena: [-5, -8], anju: [-2, 10] };      // where the living stand
  const rigs = { guns: K.juggernaut(THREE), blades: K.juggernaut(THREE, { blades: true }) };
  const baked = { guns: K.bake(THREE, rigs.guns), blades: K.bake(THREE, rigs.blades) };
  // a fallen unit: down on one side, gun dropped
  const fall = rig => { const u = rig.userData; u.body.position.set(0, .6, 0); u.body.rotation.set(.1, 0, .3); u.gun.rotation.y = .5; u.cradle.rotation.x = .42; u.rig.pose(); };
  fall(rigs.guns); baked.wreck = K.bake(THREE, rigs.guns); rigs.guns.userData.update(0, 'hold');
  const occluder = new THREE.MeshBasicMaterial({ color: 0x060a11, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, side: THREE.DoubleSide });
  const stamp = (b, color, scale) => { const g = new THREE.Group(), line = new THREE.LineBasicMaterial({ color, transparent: true, opacity: .95 }); g.add(new THREE.Mesh(b.fill, occluder), new THREE.LineSegments(b.edges, line)); g.scale.setScalar(scale); g.userData.line = line; return g; };
  const SCALE = .62, units = [];
  const stemMat = new THREE.LineBasicMaterial({ color: 0x4da3ff, transparent: true, opacity: .8 });
  roster.forEach(r => {
    const g = new THREE.Group(); let p;
    if (!r.kia) {
      const [x, z] = spots[r.id]; p = at(x, z);
      if (!r.machine) {                                   // the Handler has no machine: a command node behind the wall
        const body = new THREE.Mesh(new THREE.OctahedronGeometry(.48), new THREE.MeshBasicMaterial({ color: 0x4da3ff })); body.position.y = 2.2; g.add(body); g.userData.body = body;
        g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, .05, 0), new THREE.Vector3(0, 1.7, 0)]), stemMat));
      } else { const m = stamp(baked[r.machine], 0x4da3ff, SCALE); m.rotation.y = Math.PI / 2 + (rnd() - .5) * .8; m.position.y = .04; g.add(m); g.userData.model = m; }
      const ring = new THREE.Mesh(new THREE.RingGeometry(1.75, 1.84, 56), new THREE.MeshBasicMaterial({ color: 0x4da3ff, transparent: true, opacity: .75, side: THREE.DoubleSide }));
      ring.rotation.x = -Math.PI / 2; ring.position.y = .08; g.add(ring); g.userData.ring = ring;
    } else {
      const x = -10 + rnd() * 26, z = -hd + 4 + rnd() * (D - 8); p = at(x, z);
      const s = .5, cross = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-s, .12, -s), new THREE.Vector3(s, .12, s), new THREE.Vector3(-s, .12, s), new THREE.Vector3(s, .12, -s)]);
      g.add(new THREE.LineSegments(cross, new THREE.LineBasicMaterial({ color: 0xff4d4d, transparent: true, opacity: .85 })));
    }
    g.position.copy(p); scene.add(g); units.push({ r, g, p });
  });
  const wreck = stamp(baked.wreck, 0xff4d4d, SCALE); wreck.visible = false; scene.add(wreck);

  /* Legion contacts: Löwe and Ameise copies merged into one mesh */
  const contacts = Array.from({ length: 26 }, (_, i) => { const x = 15 + rnd() * 15, z = -hd + 2 + rnd() * (D - 4); return { p: at(x, z, .03), ry: -Math.PI / 2 + (rnd() - .5) * .9, kind: i % 4 ? 'ameise' : 'lowe' }; });
  function scatter(b, list, scale) {
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), S = new THREE.Vector3(scale, scale, scale);
    const out = src => { const n = src.count, a = new Float32Array(n * 3 * list.length);
      list.forEach((c, j) => { m.compose(c.p, q.setFromEuler(e.set(0, c.ry, 0)), S); for (let i = 0; i < n; i++) { v.fromBufferAttribute(src, i).applyMatrix4(m); a[(j * n + i) * 3] = v.x; a[(j * n + i) * 3 + 1] = v.y; a[(j * n + i) * 3 + 2] = v.z; } });
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(a, 3)); return g; };
    return { fill: out(b.fill.attributes.position), edges: out(b.edges.attributes.position) };
  }
  for (const kind of ['lowe', 'ameise']) {
    const list = contacts.filter(c => c.kind === kind);
    const b = scatter(K.bake(THREE, K[kind](THREE)), list, .36); scene.add(new THREE.Mesh(b.fill, occluder), new THREE.LineSegments(b.edges, new THREE.LineBasicMaterial({ color: 0xf5a524, transparent: true, opacity: .62 })));
  }

  /* ── camera ── */
  const add = (parent, tag) => { const el = document.createElement(tag); parent.appendChild(el); made.push(el); return el; };
  const canvas = add(mapEl, 'canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); renderer.setClearColor(BG); renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 300); camera.position.set(-6, 30, 46);
  const controls = new OrbitControls(camera, canvas);
  Object.assign(controls, { enableZoom: false, enablePan: false, enableDamping: true, minPolarAngle: .5, maxPolarAngle: 1.25, autoRotate: !reduce, autoRotateSpeed: .35 });
  const goal = new THREE.Vector3(0, 0, 0);
  const fit = () => { const w = mapEl.clientWidth, h = mapEl.clientHeight, wide = w > 760 && !inset.classList.contains('none'); if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.setViewOffset(w, h, wide ? 70 : 0, wide ? -56 : 0, w, h); };                 // keep the focus clear of the machine inset, when it is showing
  const ro = new ResizeObserver(fit); ro.observe(mapEl); fit();

  /* ── html tags pinned to 3D points ── */
  const tags = [];
  const pin = (el, v, lift) => { tags.push({ el, v, lift }); return el; };
  units.forEach(u => {
    if (u.r.kia) return;
    const b = add(mapEl, 'button'); b.type = 'button'; b.className = 'tag'; b.appendChild(document.createElement('span')).textContent = u.r.codename;
    b.onclick = () => onSelect(u.r.id); u.tag = pin(b, u.p, u.r.machine ? 3.1 : 2.9);
  });
  const note = (cls, text, v, lift) => { const d = add(mapEl, 'div'); d.className = 'tag ' + cls; d.appendChild(document.createElement('span')).textContent = text; return pin(d, v, lift); };
  note('note', 'Gran Mur', at(WX, -hd + 3), 2.4);
  note('hostile', 'Legion', at(23, -6), 2.4);
  const lostTag = note('lost', '', new THREE.Vector3(), 1.2); lostTag.style.display = 'none'; const lostPin = tags[tags.length - 1];

  /* ── inset: the selected machine as a live, rigged hologram ── */
  const uCanvas = add(inset, 'canvas');
  const uR = new THREE.WebGLRenderer({ canvas: uCanvas, antialias: true, alpha: true }); uR.setPixelRatio(Math.min(devicePixelRatio, 2));
  const uScene = new THREE.Scene(), uCam = new THREE.PerspectiveCamera(28, 1, .1, 100), holo = {};
  for (const k in rigs) { holo[k] = K.hologram(THREE, rigs[k], { color: 0x4da3ff, fill: 0x060a11 }); uScene.add(rigs[k]); rigs[k].userData.pilot.traverse(o => o.material?.color.set(0xe6eef7)); }
  const floorMat = new THREE.LineBasicMaterial({ color: 0x4da3ff, transparent: true, opacity: .35 });
  for (const r of [2.7, 3.6]) uScene.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 96 }, (_, i) => new THREE.Vector3(Math.cos(i / 96 * 6.2832) * r, 0, Math.sin(i / 96 * 6.2832) * r))), floorMat));
  let uState = { key: 'blades', kia: false, none: false };
  function inspect(r) {
    const none = !r.machine, key = r.machine ?? 'guns', rig = rigs[key], c = r.kia ? 0xff4d4d : 0x4da3ff;
    uState = { key, kia: r.kia, none };
    for (const k in rigs) rigs[k].visible = !none && k === key;
    holo[key].line.color.set(c); floorMat.color.set(c); rig.userData.pilot.visible = !r.kia; if (r.kia) fall(rig);
    fit();
  }

  let current = null, raf = 0;
  function select(id) {
    current = id; const u = units.find(u => u.r.id === id), r = u.r;
    units.forEach(x => { x.tag?.classList.toggle('sel', x.r.id === id); x.g.userData.model?.userData.line.color.set(x.r.id === id ? 0xe2f1ff : 0x4da3ff); });
    wreck.visible = r.kia; if (r.kia) { wreck.position.copy(u.p); wreck.rotation.y = (r.serial.charCodeAt(r.serial.length - 1) * 1.7) % 6.28; }
    inspect(r);
    goal.copy(u.p).multiplyScalar(r.machine ? .55 : .85);
    if (r.kia) { lostTag.style.display = ''; lostTag.classList.add('sel'); lostTag.firstChild.textContent = r.codename; lostPin.v = u.p; } else lostTag.style.display = 'none';
  }

  /* ── loop ── */
  const v = new THREE.Vector3(), clock = new THREE.Clock();
  function frame() {
    raf = requestAnimationFrame(frame); const t = clock.getElapsedTime();
    controls.target.lerp(goal, .05); controls.update();
    units.forEach(u => { if (u.g.userData.ring) { const on = u.r.id === current; u.g.userData.ring.scale.setScalar(on ? 1.12 + Math.sin(t * 3) * .1 : 1); if (u.g.userData.body) u.g.userData.body.rotation.y = t; } });
    renderer.render(scene, camera);
    if (!uState.none && uCanvas.clientWidth) {
      const uw = uCanvas.clientWidth, uh = uCanvas.clientHeight, a = t * .22 + .95;
      if (uCanvas.width !== Math.round(uw * uR.getPixelRatio())) { uR.setSize(uw, uh, false); uCam.aspect = uw / uh; uCam.updateProjectionMatrix(); }
      if (!uState.kia) rigs[uState.key].userData.update(t, 'idle');
      uCam.position.set(Math.cos(a) * 9.4, 3.5, Math.sin(a) * 9.4); uCam.lookAt(0, .98, -.2); uR.render(uScene, uCam);
    }
    const w = mapEl.clientWidth, h = mapEl.clientHeight;
    tags.forEach(({ el, v: p, lift }) => { v.copy(p); v.y += lift; v.project(camera); const hid = v.z > 1; el.style.opacity = hid ? 0 : 1; el.style.transform = `translate(${((v.x + 1) / 2 * w + 8).toFixed(1)}px,${((1 - v.y) / 2 * h - 12).toFixed(1)}px)`; });
  }
  frame();

  return {
    select,
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); controls.dispose();
      for (const r of [renderer, uR]) { r.dispose(); r.forceContextLoss(); }
      made.forEach(el => el.remove());
    },
  };
}
