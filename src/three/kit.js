/* Modelling kit: helpers for building hard-surface machines in code.
   Usage: const k = H.kit(THREE, { hull: 0xd8cfb6 }).
   Every model returns a THREE.Group whose userData carries { update(t, motion), anchors, size, pilot }. */
import { H } from "./registry.js";

const TAU = Math.PI * 2;

H.kit = function (THREE, pal = {}) {
  const V3 = THREE.Vector3;
  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.2, side: THREE.DoubleSide, ...o });
  /* procedural paint: base colour with rust blooms, streaks and chips, so lit hulls don't look factory-new */
  function weather(base, seed = 86) {
    const c = document.createElement('canvas'); c.width = c.height = 512; const x = c.getContext('2d'); let s = seed; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    x.fillStyle = '#' + new THREE.Color(base).getHexString(); x.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 90; i++) { const px = r() * 512, py = r() * 512, rad = 6 + r() * 44, g = x.createRadialGradient(px, py, 0, px, py, rad); g.addColorStop(0, `rgba(${96 + r() * 44 | 0},${54 + r() * 24 | 0},${26 + r() * 14 | 0},${(0.06 + r() * 0.3).toFixed(2)})`); g.addColorStop(1, 'rgba(96,58,30,0)'); x.fillStyle = g; x.fillRect(px - rad, py - rad, rad * 2, rad * 2); }
    for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(70,44,26,${(0.04 + r() * 0.1).toFixed(2)})`; x.fillRect(r() * 512, r() * 512, 1 + r() * 2, 20 + r() * 110); }
    for (let i = 0; i < 700; i++) { x.fillStyle = `rgba(40,30,22,${(0.1 + r() * 0.3).toFixed(2)})`; x.fillRect(r() * 512, r() * 512, 1 + r() * 2, 1 + r() * 2); }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
  }
  const hullHex = pal.hull ?? 0xd8cfb6;
  const M = {
    hull: pal.weather === false ? mat(hullHex, { roughness: 0.72, metalness: 0.05 }) : mat(0xffffff, { roughness: 0.74, metalness: 0.05, map: weather(hullHex, pal.seed) }),
    frame: mat(pal.frame ?? 0x2b2d35, { roughness: 0.55, metalness: 0.5, flatShading: true }),
    gun: mat(pal.gun ?? 0x3a3d46, { roughness: 0.45, metalness: 0.65, flatShading: true }),
    steel: mat(pal.steel ?? 0xa3a9b1, { roughness: 0.3, metalness: 0.9, flatShading: true }),
    eye: new THREE.MeshBasicMaterial({ color: pal.eye ?? 0xff2a3c }),
  };
  M.eye.userData.accent = true;                       // stays lit in hologram mode
  const mesh = (g, m) => { const x = new THREE.Mesh(g, m); x.castShadow = x.receiveShadow = true; return x; };
  const at = (o, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => { o.position.set(x, y, z); o.rotation.set(rx, ry, rz); return o; };
  const grp = (...kids) => { const g = new THREE.Group(); if (kids.length) g.add(...kids); return g; };
  const sec = a => Array.isArray(a) ? { z: a[0], w: a[1], up: a[2], dn: a[3] ?? a[2], yc: a[4] ?? 0, n: a[5], x0: a[6] } : a;

  /* shell: skin a run of superellipse cross-sections along +z.
     section = [z, halfWidth, up, down, yCentre, roundness(2=ellipse, 4+=boxy), xCentre]; add nd for a different lower roundness. */
  function shellG(sections, { K = 16, flat = false, caps = true } = {}) {
    const S = sections.map(sec), n = S.length, P = [], UV = [], idx = [], W = [];
    const pt = (s, k) => { const a = (k % K) / K * TAU, c = Math.cos(a), sn = Math.sin(a), e = 2 / (sn >= 0 ? (s.n ?? 2.5) : (s.nd ?? s.n ?? 2.5));
      return [(s.x0 ?? 0) + s.w * Math.sign(c) * Math.abs(c) ** e, s.yc + (sn >= 0 ? s.up : s.dn) * Math.sign(sn) * Math.abs(sn) ** e, s.z]; };
    const R = S.map(s => Array.from({ length: K + 1 }, (_, k) => pt(s, k)));
    R.forEach((r, i) => r.forEach((p, k) => { P.push(...p); UV.push(k / K, i / (n - 1)); }));
    const row = K + 1;
    for (let i = 0; i < n - 1; i++) for (let k = 0; k < K; k++) { const a = i * row + k, b = a + 1, d = (i + 1) * row + k, c = d + 1; idx.push(a, b, c, a, c, d); }
    if (caps) for (const [i, front] of [[0, false], [n - 1, true]]) {
      const base = P.length / 3, s = S[i]; R[i].forEach(p => { P.push(...p); UV.push(0.5, 0.5); });
      P.push(s.x0 ?? 0, s.yc + (s.up - s.dn) / 2, s.z); UV.push(0.5, 0.5);
      for (let k = 0; k < K; k++) front ? idx.push(base + row, base + k, base + k + 1) : idx.push(base + row, base + k + 1, base + k);
    }
    let g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(UV, 2)); g.setIndex(idx);
    if (flat) g = g.toNonIndexed();
    g.computeVertexNormals();
    if (!flat) { const N = g.attributes.normal, a = new V3(), b = new V3();              // weld the normals across the uv seam
      for (let i = 0; i < n; i++) { a.fromBufferAttribute(N, i * row); b.fromBufferAttribute(N, i * row + K); a.add(b).normalize(); N.setXYZ(i * row, a.x, a.y, a.z); N.setXYZ(i * row + K, a.x, a.y, a.z); } }
    const step = Math.max(1, (K / 8) | 0);                                               // hologram wire: every rib, eight stringers
    R.forEach((r, i) => { for (let k = 0; k < K; k++) W.push(...r[k], ...r[k + 1]); if (i < n - 1) for (let k = 0; k < K; k += step) W.push(...r[k], ...R[i + 1][k]); });
    const w = new THREE.BufferGeometry(); w.setAttribute('position', new THREE.Float32BufferAttribute(W, 3));
    g.userData.wire = w; return g;
  }
  const shell = (s, m, o) => mesh(shellG(s, o), m);
  const limb = (s, m, o) => { const g = shellG(s, o); g.rotateY(Math.PI / 2); g.userData.wire.rotateY(Math.PI / 2); return mesh(g, m); };   // same, running along +x

  const box = (w, h, l, m) => mesh(new THREE.BoxGeometry(w, h, l), m);
  const lines = a => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(a, 3)); return g; };
  const cyl = (r, len, axis, m, r2 = r, seg = 16) => {
    const g = new THREE.CylinderGeometry(r2, r, len, seg), W = [], N = Math.max(seg, 12), h = len / 2;
    for (let i = 0; i < N; i++) { const a = i / N * TAU, b = (i + 1) / N * TAU; for (const [y, q] of [[-h, r], [h, r2]]) W.push(Math.cos(a) * q, y, Math.sin(a) * q, Math.cos(b) * q, y, Math.sin(b) * q); }
    for (let i = 0; i < 4; i++) { const a = i / 4 * TAU + 0.785; W.push(Math.cos(a) * r, -h, Math.sin(a) * r, Math.cos(a) * r2, h, Math.sin(a) * r2); }
    const w = lines(W);
    for (const x of [g, w]) { if (axis === 'z') x.rotateX(Math.PI / 2); if (axis === 'x') x.rotateZ(-Math.PI / 2); }
    g.userData.wire = w; return mesh(g, m);
  };
  const ball = (r, m, seg = 12) => { const g = new THREE.SphereGeometry(r, seg, Math.max(6, (seg * 2 / 3) | 0)), W = [];
    for (let i = 0; i < 20; i++) { const a = i / 20 * TAU, b = (i + 1) / 20 * TAU, c = Math.cos(a) * r, d = Math.sin(a) * r, e = Math.cos(b) * r, f = Math.sin(b) * r; W.push(c, d, 0, e, f, 0, c, 0, d, e, 0, f, 0, c, d, 0, e, f); }
    g.userData.wire = lines(W); return mesh(g, m); };
  const Y = new V3(0, 1, 0);
  const strut = (a, b, t, m, w = t) => { const A = new V3(...a), d = new V3(...b).sub(A), x = box(w, d.length(), t, m); x.position.copy(A).addScaledVector(d, 0.5); x.quaternion.setFromUnitVectors(Y, d.clone().normalize()); return x; };
  /* profile: a side silhouette drawn as [z, y] points, extruded to `width` across x */
  const profile = (pts, width, m, bevel = 0.012) => {
    const depth = Math.max(0.001, width - 2 * bevel);
    const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(p => new THREE.Vector2(p[0], p[1]))), { depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 1, steps: 1 });
    g.rotateY(-Math.PI / 2); g.translate(depth / 2, 0, 0); return mesh(g, m);
  };

  /* legs: hip yaw ▸ femur ▸ tibia ▸ level foot, solved as a two-bone chain so feet stay planted while the body moves */
  function legRig(body, defs, { coxa, L1, L2 }) {
    const legs = defs.map(d => {
      const g = at(grp(), ...d.hip), femur = at(grp(), coxa, 0, 0), tibia = at(grp(), L1, 0, 0), foot = at(grp(), L2, 0, 0);
      body.add(g); g.add(femur); femur.add(tibia); tibia.add(foot);
      return { group: g, femur, tibia, foot, hip: new V3(...d.hip), rest: new V3(...d.foot), phase: d.phase ?? 0 };
    });
    const inv = new THREE.Matrix4(), f = new V3(), cl = THREE.MathUtils.clamp;
    const solve = (leg, target) => {
      f.copy(target).applyMatrix4(inv).sub(leg.hip);
      leg.group.rotation.y = Math.atan2(-f.z, f.x);
      const tx = Math.hypot(f.x, f.z) - coxa, ty = f.y, d = cl(Math.hypot(tx, ty), Math.abs(L1 - L2) + 0.01, L1 + L2 - 0.01);
      const a1 = Math.acos(cl((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1)), a2 = Math.acos(cl((L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2), -1, 1));
      leg.femur.rotation.z = Math.atan2(ty, tx) + a1; leg.tibia.rotation.z = -(Math.PI - a2); leg.foot.rotation.z = -(leg.femur.rotation.z + leg.tibia.rotation.z);
    };
    const foot = new V3();
    /** stride/lift > 0 steps the feet on a treadmill; phase per leg comes from its def */
    const pose = (w = 0, stride = 0, lift = 0) => { body.updateMatrix(); inv.copy(body.matrix).invert();
      legs.forEach(l => { foot.copy(l.rest); if (stride) { const p = w + l.phase; foot.z += Math.cos(p) * stride; foot.y += Math.max(0, -Math.sin(p)) * lift; } solve(l, foot); }); };
    return { legs, pose };
  }

  /* a seated figure, drawn x-ray: used to show that a "drone" has someone in it */
  function pilot(color = 0xff3b3b) {
    const m = new THREE.MeshBasicMaterial({ color, depthTest: false, transparent: true, opacity: 0.95 }); m.userData.accent = true;
    const g = grp(at(ball(0.1, m, 10), 0, 0.3, -0.16), at(box(0.3, 0.42, 0.16, m), 0, 0.04, -0.2, -0.35), at(box(0.3, 0.12, 0.42, m), 0, -0.16, 0.08, -0.12), at(box(0.28, 0.11, 0.36, m), 0, -0.26, 0.42, 0.5), at(box(0.07, 0.07, 0.34, m), -0.19, 0.06, 0.02, 0.5), at(box(0.07, 0.07, 0.34, m), 0.19, 0.06, 0.02, 0.5));
    g.traverse(o => { o.renderOrder = 10; o.castShadow = false; if (o.isMesh) o.userData.xray = true; });
    g.visible = false; return g;
  }
  return { THREE, M, mat, mesh, at, grp, shell, limb, box, cyl, ball, strut, profile, legRig, pilot };
};

/* hologram look: dark occluding faces under bright lines (ribs for curved shells, feature edges for everything else) */
H.hologram = function (THREE, root, { color = 0x4da3ff, fill = 0x07101c, opacity = 0.95, angle = 24 } = {}) {
  const line = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  const occ = new THREE.MeshBasicMaterial({ color: fill, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, side: THREE.DoubleSide });
  root.traverse(m => {
    if (!m.isMesh || m.userData.xray) return;
    m.userData.solid ??= m.material;
    if (!m.userData.solid.userData.accent) m.material = occ;
    if (!m.userData.edges) { m.userData.edges = new THREE.LineSegments(m.geometry.userData.wire ?? new THREE.EdgesGeometry(m.geometry, angle), line); m.add(m.userData.edges); }
    m.userData.edges.material = line; m.userData.edges.visible = !m.userData.solid.userData.accent;
  });
  return { line, occ };
};
/* lit materials, with the same lines kept faint as panel lines (or hidden) */
H.solid = function (THREE, root, { color = 0x0b0b0c, opacity = 0.28, lines = true } = {}) {
  const line = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  root.traverse(m => { if (!m.isMesh) return; if (m.userData.solid) m.material = m.userData.solid;
    if (lines && !m.userData.edges && !m.userData.xray && !m.material.userData.accent && !m.geometry.userData.wire) { m.userData.edges = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 30), line); m.add(m.userData.edges); }
    if (m.userData.edges) { m.userData.edges.material = line; m.userData.edges.visible = lines && !m.geometry.userData.wire; } });
};
/* flatten the current pose into two geometries (faces, lines) for cheap copies on a map */
H.bake = function (THREE, root, angle = 24) {
  root.updateMatrixWorld(true);
  const inv = root.matrixWorld.clone().invert(), m = new THREE.Matrix4(), v = new THREE.Vector3(), F = [], E = [];
  root.traverse(x => {
    if (!x.isMesh || x.userData.xray) return; m.multiplyMatrices(inv, x.matrixWorld);
    const faces = x.geometry.index ? x.geometry.toNonIndexed() : x.geometry, lines = x.geometry.userData.wire ?? new THREE.EdgesGeometry(x.geometry, angle);
    for (const [src, dst] of [[faces, F], [lines, E]]) { const p = src.attributes.position; for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i).applyMatrix4(m); dst.push(v.x, v.y, v.z); } }
  });
  const geo = a => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(a, 3)); return g; };
  return { fill: geo(F), edges: geo(E) };
};
H.stats = function (root) { let meshes = 0, tris = 0; root.traverse(m => { if (m.isMesh) { meshes++; tris += (m.geometry.index ? m.geometry.index.count : m.geometry.attributes.position.count) / 3; } }); return { meshes, tris: Math.round(tris) }; };
