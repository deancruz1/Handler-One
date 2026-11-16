/* XM2 Reginleif, built in code against the official design art and Bandai HG 1/48 kit photos. Official figures: 6.3 m long, 2.7 m high, pile drivers x4.
   H.reginleif(THREE, { blades: true })  →  THREE.Group, forward is +z, units are metres. */
import { H } from "./registry.js";

const RIDE = 1.5, DIM = { coxa: 0.2, L1: 0.85, L2: 2.0 }, TIP = 0.04;

/* clean white paint: faint grey smudges and streaks instead of the kit's rust blooms */
function paint(THREE, base, seed = 9) {
  const c = document.createElement('canvas'); c.width = c.height = 512; const x = c.getContext('2d'); let s = seed; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  x.fillStyle = '#' + new THREE.Color(base).getHexString(); x.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 46; i++) { const px = r() * 512, py = r() * 512, rad = 10 + r() * 50, g = x.createRadialGradient(px, py, 0, px, py, rad); g.addColorStop(0, `rgba(112,118,130,${(0.03 + r() * 0.09).toFixed(2)})`); g.addColorStop(1, 'rgba(112,118,130,0)'); x.fillStyle = g; x.fillRect(px - rad, py - rad, rad * 2, rad * 2); }
  for (let i = 0; i < 36; i++) { x.fillStyle = `rgba(90,96,108,${(0.03 + r() * 0.06).toFixed(2)})`; x.fillRect(r() * 512, r() * 512, 1 + r() * 2, 16 + r() * 90); }
  for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(60,64,72,${(0.06 + r() * 0.14).toFixed(2)})`; x.fillRect(r() * 512, r() * 512, 1 + r(), 1 + r()); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}

H.reginleif = function (THREE, o = {}) {
  const hullHex = o.hull ?? 0xecebe6;
  const k = H.kit(THREE, { hull: hullHex, frame: 0x2e3036, gun: 0x3a3d46, weather: false });
  const { M, at, grp, shell, limb, box, cyl, ball, strut, profile } = k;
  M.hull.map = paint(THREE, hullHex); M.hull.color.set(0xffffff); M.hull.roughness = 0.5; M.hull.needsUpdate = true;
  const RED = k.mat(0xb3202a, { roughness: 0.55, metalness: 0.1 });
  const rivet = (x, y, z) => at(cyl(0.017, 0.014, 'y', M.gun, 0.017, 6), x, y, z);
  const root = grp(); root.name = 'XM2 Reginleif';
  const body = at(grp(), 0, RIDE, 0); body.name = 'body'; root.add(body);

  /* ── body: dark underbody, one long white fuselage, raised canopy panel, a hump for the gun mount ── */
  body.add(shell([[-1.3, 0.38, 0.1, 0.22, -0.3, 4], [-0.6, 0.46, 0.12, 0.28, -0.3, 4], [0.4, 0.46, 0.12, 0.28, -0.3, 4], [1.1, 0.34, 0.1, 0.2, -0.3, 4], [1.45, 0.2, 0.06, 0.12, -0.28, 4]], M.frame, { K: 12, flat: true }));
  const FUS = [[-1.45, 0.3, 0.25, 0.2], [-1.1, 0.5, 0.42, 0.28], [-0.6, 0.58, 0.52, 0.3], [0, 0.6, 0.5, 0.3], [0.5, 0.54, 0.42, 0.3], [1.0, 0.42, 0.28, 0.27], [1.4, 0.28, 0.12, 0.2], [1.62, 0.14, 0.03, 0.1]];
  const fus = shell(FUS.map(([z, w, up, dn]) => ({ z, w, up, dn, yc: 0, n: 2.5, nd: 3.2 })), M.hull, { K: 20 }); fus.name = 'fuselage'; body.add(fus);
  const canopy = shell([[0.15, 0.48, 0.435], [0.5, 0.44, 0.375], [1.0, 0.345, 0.235], [1.3, 0.26, 0.115]].map(([z, w, up]) => ({ z, w, up, dn: 0.02, yc: 0.08, n: 2.5, nd: 6 })), M.hull, { K: 20 });
  canopy.name = 'canopy'; body.add(canopy);
  body.add(shell([[0.11, 0.49, 0.44], [0.16, 0.49, 0.44]].map(([z, w, up]) => ({ z, w, up, dn: 0.02, yc: 0.08, n: 2.5, nd: 6 })), M.frame, { K: 20 }));                                                   // hatch seam
  body.add(shell([[-0.33, 0.594, 0.515], [-0.29, 0.596, 0.513]].map(([z, w, up]) => ({ z, w, up, dn: 0.303, yc: 0, n: 2.5, nd: 3.2 })), M.frame, { K: 20 }));                                              // panel break
  body.add(shell([[-1.32, 0.24, 0.1, 0.1, 0.36], [-0.95, 0.42, 0.25, 0.1, 0.38], [-0.5, 0.44, 0.27, 0.1, 0.4], [-0.05, 0.3, 0.12, 0.1, 0.42]].map(([z, w, up, dn, yc]) => ({ z, w, up, dn, yc, n: 2.4 })), M.hull, { K: 16 }));   // gun hump
  body.add(shell([[1.08, 0.26, 0.08, 0.12, -0.36, 4], [1.5, 0.2, 0.07, 0.1, -0.3, 4], [1.68, 0.12, 0.05, 0.07, -0.24, 4]], M.frame, { K: 10, flat: true }));                                               // chin
  body.add(at(cyl(0.09, 0.1, 'z', M.gun), 0, -0.22, 1.66), at(cyl(0.058, 0.04, 'z', M.eye), 0, -0.22, 1.715));                                                                                           // optic
  for (const s of [-1, 1]) {
    body.add(at(box(0.04, 0.05, 0.2, M.gun), s * 0.2, -0.02, 1.5, 0.3, s * 0.42, 0), at(cyl(0.045, 0.24, 'z', M.frame), s * 0.3, -0.44, 1.02), at(cyl(0.02, 0.07, 'z', M.steel), s * 0.3, -0.44, 1.17)); // side sensors, wire anchors
    body.add(at(cyl(0.09, 0.2, 'z', M.gun), s * 0.17, -0.3, -1.38));                                                            // exhausts, flank flash
  }
  body.add(at(box(0.5, 0.12, 1.1, M.frame), 0, -0.6, -0.1), at(box(0.52, 0.3, 0.1, M.gun), 0, -0.02, -1.44));
  for (let i = 0; i < 6; i++) body.add(at(box(0.44, 0.018, 0.04, M.steel), 0, -0.13 + i * 0.045, -1.495));                                                                                               // rear radiator
  const HIPS = [[0.6, 0, 0.8], [-0.6, 0, 0.8], [0.6, 0, -0.75], [-0.6, 0, -0.75]];
  HIPS.forEach(([hx, hy, hz]) => { const s = Math.sign(hx);
    body.add(shell([[hz - 0.4, 0.1, 0.12, 0.12, 0.02, 2.4, s * 0.52], [hz - 0.16, 0.2, 0.21, 0.2, 0.02, 2.4, s * 0.58], [hz + 0.16, 0.2, 0.21, 0.2, 0.02, 2.4, s * 0.58], [hz + 0.4, 0.1, 0.12, 0.12, 0.02, 2.4, s * 0.52]], M.hull, { K: 12 }));   // hip blister
    body.add(at(cyl(0.13, 0.5, 'y', M.gun), hx, hy, hz)); });
  for (const z of [-0.9, -0.7, -0.5, 0.0, 0.2, 0.4, 0.6, 0.8]) for (const s of [-1, 1]) { const u = z < -0.3 ? 0.36 : 0.3 - Math.max(0, z - 0.2) * 0.2; body.add(at(cyl(0.017, 0.014, 'y', M.gun, 0.017, 6), s * (z < -0.3 ? 0.46 : 0.5 - Math.max(0, z) * 0.14), u, z, 0, 0, s * -0.9)); }   // shoulder rivets
  const pilot = at(k.pilot(), 0, 0.0, 0.55); body.add(pilot);

  /* ── 88mm smoothbore on the back: yaw ▸ elevation ▸ recoil. White shroud over a dark action, long pale barrel with red range bands ── */
  const T = [0, 0.88, -0.5];
  body.add(strut([0, 0.58, -0.62], [0, 0.82, -0.52], 0.2, M.frame, 0.26), strut([0.2, 0.5, -0.8], [0.14, 0.84, -0.56], 0.05, M.gun), strut([-0.2, 0.5, -0.8], [-0.14, 0.84, -0.56], 0.05, M.gun), at(cyl(0.2, 0.08, 'y', M.gun), 0, 0.66, -0.6));
  const gun = at(grp(), ...T), cradle = grp(), barrel = grp(); body.add(gun); gun.add(cradle); cradle.add(barrel);
  cradle.add(cyl(0.12, 0.42, 'x', M.frame), cyl(0.065, 0.46, 'x', M.steel));
  cradle.add(profile([[0.62, -0.15], [0.62, 0.13], [-0.2, 0.2], [-1.3, 0.2], [-1.52, 0.08], [-1.52, -0.18], [-0.9, -0.24], [0, -0.22]], 0.34, M.hull, 0.03));                                              // shroud
  cradle.add(at(box(0.2, 0.12, 1.2, M.gun), 0, 0.25, -0.55), at(cyl(0.05, 0.9, 'z', M.frame), 0, 0.335, -0.45), at(box(0.1, 0.1, 0.12, M.gun), 0, 0.31, -0.95), at(box(0.1, 0.1, 0.12, M.gun), 0, 0.31, 0.02));   // action and recoil cylinder
  cradle.add(at(box(0.3, 0.3, 0.16, M.gun), 0, -0.03, -1.58), at(box(0.36, 0.2, 0.5, M.frame), 0, -0.2, -0.6), at(box(0.06, 0.12, 0.3, M.gun), 0.2, 0.1, -0.2), at(cyl(0.03, 0.03, 'z', M.eye), 0.2, 0.1, -0.04));  // breech, feed, sight
  cradle.add(at(box(0.345, 0.05, 0.42, RED), 0, 0.02, -0.95));
  barrel.add(at(cyl(0.11, 0.5, 'z', M.hull, 0.085), 0, 0, 0.86), at(cyl(0.085, 0.07, 'z', M.gun), 0, 0, 1.14), at(cyl(0.066, 3.25, 'z', M.hull), 0, 0, 2.75));
  for (const z of [3.92, 4.06, 4.2]) barrel.add(at(cyl(0.07, 0.07, 'z', RED), 0, 0, z));                                                                                                                  // range bands
  barrel.add(at(cyl(0.085, 0.26, 'z', M.gun), 0, 0, 4.48), at(cyl(0.095, 0.04, 'z', M.frame), 0, 0, 4.38), at(cyl(0.095, 0.04, 'z', M.frame), 0, 0, 4.59));                                              // muzzle brake
  barrel.add(strut([0, -0.05, 4.3], [0, -0.2, 4.4], 0.03, M.gun), at(cyl(0.04, 0.14, 'z', M.gun), 0, -0.2, 4.44), at(cyl(0.026, 0.02, 'z', M.eye), 0, -0.2, 4.52));                                       // muzzle reference sensor

  /* ── grapple sub-arms: long high-frequency blades, or 12.7mm heavy machine guns ── */
  for (const s of [-1, 1]) {
    const sh = [s * 0.28, -0.4, 1.12], el = [s * 0.42, -0.56, 1.6];
    body.add(at(ball(0.085, M.gun), ...sh), strut(sh, el, 0.11, M.hull), at(ball(0.08, M.gun), ...el));
    const w = at(grp(), ...el, 0, s * 0.16, 0); body.add(w);
    w.add(at(box(0.13, 0.15, 0.3, M.hull), 0, 0.01, 0.16), at(box(0.1, 0.1, 0.12, M.gun), 0, 0, 0.36));
    if (o.blades) {
      const b = at(grp(), 0, -0.02, 0.36, 0, 0, s * -0.3); w.add(b);
      b.add(profile([[0, 0.1], [0.5, 0.13], [2.2, 0.03], [2.5, -0.06], [0.45, -0.13], [0, -0.1]], 0.04, M.gun, 0.008), profile([[0.45, -0.13], [2.5, -0.06], [2.36, -0.045], [0.5, -0.075]], 0.046, M.steel, 0.004));
      b.add(profile([[0.04, 0.07], [0.42, 0.09], [0.52, 0], [0.4, -0.09], [0.04, -0.07]], 0.06, M.frame, 0.006));                                                                                        // hex root
      for (const z of [1.98, 2.12]) b.add(at(box(0.048, 0.09, 0.05, RED), 0, 0.015 - (z - 1.98) * 0.12, z, 0.5));
    } else {
      w.add(at(box(0.12, 0.09, 0.5, M.hull), 0, 0.045, 0.66), at(box(0.11, 0.11, 0.46, M.gun), 0, -0.05, 0.64), at(cyl(0.024, 0.5, 'z', M.steel), 0, 0, 1.12), at(cyl(0.032, 0.05, 'z', RED), 0, 0, 1.3), at(cyl(0.032, 0.06, 'z', M.frame), 0, 0, 1.38));
    }
  }

  /* ── legs: a white thigh pod to a big disc knee, then one broad tusk of armor that runs past the knee into a horn ── */
  const rig = k.legRig(body, HIPS.map((h, i) => ({ hip: h, foot: [Math.sign(h[0]) * (i < 2 ? 2.15 : 2.1), TIP, i < 2 ? 2.0 : -2.05], phase: (i === 0 || i === 3) ? 0 : Math.PI })), DIM);
  const TUSK = [[-1.05, 0.015, 0.015, 0.015, 0], [-0.8, 0.07, 0.06, 0.06, 0.08], [-0.4, 0.13, 0.12, 0.13, 0.16], [0, 0.175, 0.19, 0.22, 0.2], [0.5, 0.19, 0.2, 0.2, 0.24], [1.0, 0.17, 0.17, 0.16, 0.22], [1.5, 0.13, 0.12, 0.11, 0.14], [1.85, 0.095, 0.085, 0.08, 0.07], [2.0, 0.075, 0.06, 0.06, 0.04]];
  const sub = (a, b, grow = 0.004, shift = 0) => {                       // a slice of the tusk between two stations, slightly proud of it (for bands and tips)
    const pick = x => { let i = 0; while (i < TUSK.length - 2 && TUSK[i + 1][0] < x) i++; const p = TUSK[i], q = TUSK[i + 1], t = (x - p[0]) / (q[0] - p[0]); return p.map((v, j) => v + (q[j] - v) * t); };
    return [a, b].map(x => { const s = pick(x); return [x, s[1] + grow, s[2] + grow, s[3] + grow, s[4] + shift, 2.4]; });
  };
  rig.legs.forEach(l => {
    l.group.add(limb([[0, 0.09, 0.09, 0.09, 0, 4], [DIM.coxa, 0.09, 0.09, 0.09, 0, 4]], M.frame, { K: 8, flat: true }));
    l.femur.add(cyl(0.13, 0.3, 'z', M.frame), cyl(0.075, 0.34, 'z', M.gun));
    l.femur.add(limb([[0.02, 0.12, 0.12, 0.12, 0, 2.6], [0.25, 0.17, 0.16, 0.15, 0.01, 2.6], [0.6, 0.17, 0.16, 0.15, 0.01, 2.6], [0.8, 0.12, 0.11, 0.11, 0, 2.6]], M.hull, { K: 14 }));                    // thigh pod
    l.femur.add(at(box(0.4, 0.09, 0.12, M.frame), 0.45, -0.18, 0), at(cyl(0.024, 0.26, 'x', M.steel), 0.72, -0.18, 0), rivet(0.2, 0.166, 0.05), rivet(0.2, 0.166, -0.05), rivet(0.66, 0.166, 0.05), rivet(0.66, 0.166, -0.05));
    // knee disc with its bolt circle
    l.tibia.add(cyl(0.21, 0.46, 'z', M.frame, 0.21, 20), cyl(0.09, 0.5, 'z', M.gun));
    for (let a = 0; a < 5; a++) for (const z of [-0.235, 0.235]) l.tibia.add(at(cyl(0.026, 0.02, 'z', M.gun, 0.026, 6), Math.cos(a * 1.2566 + 0.3) * 0.15, Math.sin(a * 1.2566 + 0.3) * 0.15, z));
    l.tibia.add(limb(TUSK.map(([x, w, up, dn, yc]) => [x, w, up, dn, yc, 2.4]), M.hull, { K: 14 }));                                                                                                      // the tusk
    l.tibia.add(limb(sub(-1.06, -0.84, 0.006), M.frame, { K: 14 }), limb(sub(1.74, 1.9, 0.005), RED, { K: 14 }));                                                                                          // horn tip, pile-driver flash
    l.tibia.add(limb([[-0.78, 0.05, 0.03, 0.05, 0.01, 4], [-0.3, 0.09, 0.04, 0.07, 0.0, 4]], M.frame, { K: 8, flat: true }));                                                                              // dark inner face of the horn
    l.tibia.add(limb([[0.2, 0.06, 0.05, 0.05, -0.01, 4], [1.8, 0.045, 0.04, 0.04, -0.03, 4]], M.frame, { K: 8, flat: true }), at(box(0.34, 0.08, 0.1, M.frame), 0.5, -0.07, 0));                           // inner strut
    for (const z of [-0.07, 0, 0.07]) l.tibia.add(rivet(1.45, 0.275 - Math.abs(z) * 0.25, z), rivet(-0.3, 0.3 - Math.abs(z) * 0.4, z * 0.8), rivet(0.75, 0.428 - Math.abs(z) * 0.22, z * 1.3));
    // pile driver in the open end of the tusk
    l.tibia.add(at(box(0.2, 0.13, 0.16, M.frame), 1.93, 0.02, 0), at(box(0.12, 0.06, 0.2, M.gun), 1.98, -0.05, 0));
    const pile = cyl(0.001, 0.14, 'x', M.steel, 0.036, 6); l.tibia.add(at(pile, DIM.L2, 0, 0));
    for (const z of [-0.07, 0.07]) l.tibia.add(at(box(0.12, 0.05, 0.035, M.gun), 2.0, 0.07, z, 0, 0, 0.4));
  });

  /** t in seconds; motion: 'hold' | 'idle' | 'walk' */
  function update(t = 0, motion = 'idle') {
    const walk = motion === 'walk', live = motion !== 'hold', w = t * 5.0;
    body.position.set(live && !walk ? Math.sin(t * 0.6) * 0.035 : 0, RIDE + (walk ? Math.sin(w * 2) * 0.035 : live ? Math.sin(t * 1.2) * 0.035 : 0), 0);
    body.rotation.set(live ? Math.sin(walk ? w * 2 + 1 : t * 0.9) * (walk ? 0.02 : 0.012) : 0, 0, live ? Math.sin(walk ? w : t * 0.7) * (walk ? 0.026 : 0.014) : 0);
    gun.rotation.y = live ? Math.sin(t * 0.45) * 0.2 : 0; cradle.rotation.x = live ? -0.03 + Math.sin(t * 0.31) * 0.04 : 0;
    rig.pose(w, walk ? 0.45 : 0, walk ? 0.4 : 0);
  }
  update(0, 'hold');
  root.userData = { body, gun, cradle, barrel, pilot, legs: rig.legs, update, size: { length: 6.3, height: 2.7 },
    anchors: { mark: [0.62, RIDE + 0.05, 0.05], cockpit: [0, RIDE + 0.45, 0.6], muzzle: [0, RIDE + 0.88, 3.95], gun: [0, RIDE + 1.1, -1.2], leg: [1.75, 1.75, 1.55] } };
  return root;
};
