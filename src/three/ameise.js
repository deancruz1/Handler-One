/* Ameise, the Legion's scout type, built in code against the official design art. Official equipment: 7.62mm anti-personnel machine guns x2
   and a high-sensitivity sensor unit. No official dimensions are published, so the scale here is an estimate.
   H.ameise(THREE)  →  THREE.Group, forward is +z, units are metres. Autonomous: no pilot. */
import { H } from "./registry.js";

const RIDE = 1.15, DIM = { coxa: 0.15, L1: 1.05, L2: 1.47 }, ANKLE = 0.14, SCALE = 0.9;
/* Legion chrome needs something to reflect: a cold sky over a dark floor, with a few soft strip lights */
let env = null;
function chrome(THREE) {
  if (env) return env;
  const c = document.createElement('canvas'); c.width = 512; c.height = 256; const x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 0, 256);
  [[0, '#f4f8ff'], [0.3, '#a9c6ff'], [0.47, '#5f8ee6'], [0.5, '#ffffff'], [0.54, '#1c3a80'], [0.75, '#0b1a44'], [1, '#040816']].forEach(([t, col]) => g.addColorStop(t, col));
  x.fillStyle = g; x.fillRect(0, 0, 512, 256);
  x.fillStyle = 'rgba(255,255,255,.9)'; for (const [px, w] of [[40, 46], [170, 20], [300, 60], [430, 26]]) x.fillRect(px, 30, w, 54);
  env = new THREE.CanvasTexture(c); env.mapping = THREE.EquirectangularReflectionMapping; env.colorSpace = THREE.SRGBColorSpace; return env;
}

H.ameise = function (THREE, o = {}) {
  const k = H.kit(THREE, { hull: o.hull ?? 0x86a9ee, frame: 0x232d47, gun: 0x34446b, steel: 0xe8f0ff, eye: 0xbfe6ff, weather: false });
  const { M, at, grp, shell, limb, box, cyl, ball, strut } = k;
  Object.assign(M.hull, { metalness: 0.92, roughness: 0.2, envMap: chrome(THREE), envMapIntensity: 1.15 });
  Object.assign(M.steel, { metalness: 0.6, roughness: 0.3, envMap: M.hull.envMap }); Object.assign(M.frame, { metalness: 0.6, roughness: 0.45 }); Object.assign(M.gun, { envMap: M.hull.envMap, envMapIntensity: 0.5 });
  const root = grp(); root.name = 'Ameise';
  const inner = grp(); inner.scale.setScalar(SCALE); root.add(inner);                          // everything is modelled at 1:1 below, then scaled once
  const body = at(grp(), 0, RIDE, 0); body.name = 'body'; inner.add(body);
  const turn = (m, rx) => { m.geometry.rotateX(rx); m.geometry.userData.wire?.rotateX(rx); return m; };

  /* ── thorax and head: a low chrome pod that narrows to a wedge, over a dark underbody ── */
  body.add(shell([[-1.15, 0.3, 0.2, 0.22, 0, 3], [-0.8, 0.5, 0.3, 0.3, 0, 3], [-0.2, 0.58, 0.34, 0.32, 0, 3], [0.4, 0.52, 0.3, 0.3, -0.02, 3], [0.85, 0.4, 0.2, 0.24, -0.08, 3], [1.2, 0.22, 0.08, 0.12, -0.16, 3]], M.hull, { K: 18 }));
  body.add(shell([[-1.0, 0.3, 0.1, 0.16, -0.3, 4], [-0.4, 0.44, 0.1, 0.2, -0.32, 4], [0.4, 0.4, 0.1, 0.18, -0.32, 4], [0.8, 0.26, 0.08, 0.12, -0.34, 4]], M.frame, { K: 10, flat: true }));
  body.add(shell([[0.3, 0.5, 0.1, 0.03, 0.26, 3], [0.8, 0.42, 0.08, 0.03, 0.16, 3], [1.28, 0.2, 0.04, 0.02, -0.02, 3]], M.hull, { K: 14 }));                                  // brow hood
  for (const s of [-1, 1]) {
    body.add(shell([[0.48, 0.12, 0.08, 0.1, -0.3, 2.2, s * 0.24], [0.78, 0.17, 0.14, 0.26, -0.36, 2.2, s * 0.21], [1.04, 0.16, 0.1, 0.3, -0.44, 2.2, s * 0.19], [1.22, 0.1, 0.05, 0.22, -0.53, 2.2, s * 0.15], [1.34, 0.02, 0.012, 0.06, -0.72, 2.2, s * 0.11]], M.hull, { K: 12 }));   // mandible plate
    body.add(at(box(0.08, 0.09, 0.3, M.gun), s * 0.36, -0.14, 0.86), at(cyl(0.015, 0.42, 'z', M.gun), s * 0.36, -0.13, 1.2), at(cyl(0.022, 0.06, 'z', M.frame), s * 0.36, -0.13, 1.4));    // 7.62mm machine gun
    for (const z of [0.38, -0.38]) body.add(at(cyl(0.09, 0.2, 'x', M.gun), s * 0.56, -0.06, z));
  }
  body.add(shell([[0.41, 0.535, 0.315, 0.315, -0.02, 3], [0.49, 0.522, 0.303, 0.303, -0.03, 3]], M.frame, { K: 18 }), shell([[-0.56, 0.56, 0.328, 0.318, 0, 3], [-0.48, 0.575, 0.338, 0.325, 0, 3]], M.frame, { K: 18 }));   // segment bands
  for (const s of [-1, 1]) body.add(shell([[-0.44, 0.045, 0.1, 0.1, -0.12, 3, s * 0.585], [-0.1, 0.05, 0.13, 0.13, -0.13, 3, s * 0.6], [0.36, 0.045, 0.1, 0.1, -0.13, 3, s * 0.545]], M.hull, { K: 10 }));                        // flank plate
  for (let i = 0; i < 5; i++) body.add(at(box(0.03, 0.13, 0.2, M.frame), -0.12 + i * 0.06, -0.21, 1.08));                                                                  // intake ribs between the mandibles
  body.add(at(box(0.3, 0.035, 0.03, M.eye), 0, -0.07, 1.2), at(box(0.6, 0.12, 0.3, M.frame), 0, 0.05, -1.2), at(box(0.3, 0.2, 0.2, M.gun), 0, -0.12, -1.22));

  /* ── high-sensitivity sensor unit: a swept horn built from horizontal slices, with a comb down its trailing edge ── */
  const sensor = at(grp(), 0, 0.3, 0); sensor.name = 'sensor'; body.add(sensor);
  const HH = 1.72, zf = h => 0.95 - 1.453 * h, zr = h => -0.95 - 0.349 * h;   // leading edge rakes back at about 35 degrees; the tip overhangs the tail
  const slice = (h, wBase, pad = 0) => { const f = Math.max(1 - h / HH, 0), L = Math.max((zf(h) - zr(h)) / 2 + pad, 0.004); return { z: h, w: Math.max(wBase * f ** 0.85 + pad, 0.004), up: L, dn: L, yc: -(zf(h) + zr(h)) / 2, n: 4.5, nd: 2 }; };   // local +y is the trailing side: flat there, round at the front
  sensor.add(turn(shell([0, 0.18, 0.45, 0.75, 1.05, 1.32, 1.52, 1.66, HH].map(h => slice(h, 0.5)), M.hull, { K: 24 }), -Math.PI / 2));
  sensor.add(turn(shell([-0.1, 0.07].map(h => slice(Math.max(h, 0), 0.5, 0.05 + (h < 0 ? 0.02 : 0))).map((s, i) => ({ ...s, z: i ? 0.07 : -0.1 })), M.frame, { K: 24 }), -Math.PI / 2));   // collar
  sensor.add(strut([0, 0.1, zr(0.1) - 0.02], [0, 1.42, zr(1.42) - 0.02], 0.06, M.frame, 0.09));
  for (let i = 0; i < 10; i++) { const h = 0.14 + i * 0.134, len = 0.56 - i * 0.022, sp = cyl(0.004, len, 'z', M.steel, 0.06, 4); sp.scale.x = 0.5; sensor.add(at(sp, 0, h, zr(h) - len / 2 + 0.03, -0.14)); }
  sensor.add(at(cyl(0.036, 0.05, 'z', M.frame), 0, 0.16, zf(0.16) + 0.03, -0.97), at(cyl(0.02, 0.03, 'z', M.eye), 0, 0.165, zf(0.16) + 0.05, -0.97));                        // forward optic at the horn's root

  /* ── six legs: a flat rectangular thigh plate held level, then a broad blade of a shin down to a small toed foot ── */
  const A = ANKLE, HIPS = [[0.45, 0.28, 0.75], [-0.45, 0.28, 0.75], [0.55, 0.28, 0], [-0.55, 0.28, 0], [0.45, 0.28, -0.75], [-0.45, 0.28, -0.75]];
  const FEET = [[1.39, A, 2.37], [-1.39, A, 2.37], [2.42, A, 0.1], [-2.42, A, 0.1], [1.65, A, -2.18], [-1.65, A, -2.18]];
  HIPS.forEach(h => body.add(at(cyl(0.15, 0.22, 'y', M.frame), ...h), at(cyl(0.11, 0.05, 'y', M.gun), h[0], h[1] + 0.13, h[2])));
  const rig = k.legRig(body, HIPS.map((h, i) => ({ hip: h, foot: FEET[i], phase: [0, 3, 4].includes(i) ? 0 : Math.PI })), DIM);   // tripod gait
  rig.legs.forEach(l => {
    l.group.add(limb([[0, 0.08, 0.07, 0.07, 0, 4], [DIM.coxa, 0.08, 0.07, 0.07, 0, 4]], M.frame, { K: 8, flat: true }));
    l.femur.add(cyl(0.1, 0.3, 'z', M.frame), cyl(0.06, 0.34, 'z', M.gun));
    l.femur.add(limb([[0.02, 0.07, 0.05, 0.06, -0.06, 4], [DIM.L1 - 0.02, 0.06, 0.045, 0.05, -0.06, 4]], M.frame, { K: 8, flat: true }));
    l.femur.add(limb([[-0.1, 0.11, 0.03, 0.03, 0.035, 6], [0.02, 0.19, 0.07, 0.055, 0.035, 6], [DIM.L1 - 0.06, 0.175, 0.065, 0.05, 0.035, 6], [DIM.L1 + 0.12, 0.11, 0.03, 0.03, 0.035, 6]], M.hull, { K: 12, flat: true }));   // thigh plate
    l.femur.add(at(box(DIM.L1 * 0.62, 0.02, 0.14, M.gun), DIM.L1 * 0.5, 0.11, 0), at(box(0.1, 0.03, 0.3, M.frame), 0.16, 0.1, 0), at(box(0.1, 0.03, 0.28, M.frame), DIM.L1 - 0.18, 0.1, 0));
    l.tibia.add(cyl(0.11, 0.32, 'z', M.frame), cyl(0.065, 0.36, 'z', M.gun));
    l.tibia.add(limb([[0.05, 0.05, 0.04, 0.05, -0.07, 4], [DIM.L2 - 0.1, 0.035, 0.03, 0.04, -0.045, 4]], M.frame, { K: 8, flat: true }));
    l.tibia.add(limb([[-0.08, 0.15, 0.03, 0.03, 0.03, 1.4], [0.06, 0.24, 0.06, 0.04, 0.035, 1.4], [0.3, 0.26, 0.065, 0.04, 0.04, 1.4], [0.85, 0.18, 0.05, 0.035, 0.03, 1.4], [1.25, 0.1, 0.035, 0.03, 0.012, 1.4], [DIM.L2 - 0.04, 0.05, 0.025, 0.02, 0, 1.4]], M.hull, { K: 8, flat: true }));   // shin blade
    l.tibia.add(at(ball(0.065, M.gun), DIM.L2, 0, 0));
    l.foot.add(at(box(0.36, 0.04, 0.1, M.frame), 0.1, -0.1, 0), at(cyl(0.001, 0.14, 'x', M.steel, 0.03, 4), 0.34, -0.1, 0), at(box(0.1, 0.05, 0.08, M.gun), -0.1, -0.09, 0), at(box(0.06, 0.07, 0.06, M.gun), 0, -0.05, 0));
  });

  /** t in seconds; motion: 'hold' | 'idle' | 'walk' */
  function update(t = 0, motion = 'idle') {
    const walk = motion === 'walk', live = motion !== 'hold', w = t * 6.4;
    body.position.set(live && !walk ? Math.sin(t * 0.7) * 0.025 : 0, RIDE + (walk ? Math.sin(w * 2) * 0.022 : live ? Math.sin(t * 1.4) * 0.022 : 0), 0);
    body.rotation.set(live ? Math.sin(walk ? w * 2 + 1 : t * 0.8) * 0.012 : 0, 0, live ? Math.sin(walk ? w : t * 0.6) * (walk ? 0.02 : 0.01) : 0);
    sensor.rotation.y = live ? Math.sin(t * 0.55) * 0.2 : 0;                                  // the horn sweeps while it scouts
    rig.pose(w, walk ? 0.3 : 0, walk ? 0.26 : 0);
  }
  update(0, 'hold');
  root.updateMatrixWorld(true);
  const bb = new THREE.Box3().setFromObject(root), r1 = v => Math.round(v * 10) / 10;
  root.userData = { body, sensor, legs: rig.legs, update, size: { length: r1(bb.max.z - bb.min.z), height: r1(bb.max.y), width: r1(bb.max.x - bb.min.x) },
    anchors: Object.fromEntries(Object.entries({ sensor: [0.2, RIDE + 1.25, -0.75], gun: [0.36, RIDE - 0.13, 1.43], hull: [0.6, RIDE - 0.02, -0.2], leg: [1.75, 1.45, 0.05] }).map(([n, p]) => [n, p.map(v => Math.round(v * SCALE * 100) / 100)])) };
  return root;
};
