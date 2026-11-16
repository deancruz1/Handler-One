/* M1A4 Juggernaut, built in code against the official design art and Bandai HG 1/48 kit photos. Official figures: 5.4 m long including the gun, 2.1 m high.
   H.juggernaut(THREE, { blades: true })  →  THREE.Group, forward is +z, units are metres. */
import { H } from "./registry.js";

const RIDE = 1.0, DIM = { coxa: 0.18, L1: 1.0, L2: 1.72 }, ANKLE = 0.22;

H.juggernaut = function (THREE, o = {}) {
  const k = H.kit(THREE, { hull: o.hull ?? 0xd8cfb6, frame: 0x2b2d35, gun: 0x3a3d46 });
  const { M, at, grp, shell, limb, box, cyl, ball, strut, profile } = k;
  const root = grp(); root.name = 'M1A4 Juggernaut';
  const body = at(grp(), 0, RIDE, 0); body.name = 'body'; root.add(body);

  /* ── body: dark underbody, dark dome, cream canopy shell over it, cream cheek panels ── */
  body.add(shell([[-0.92, 0.34, 0.12, 0.22, -0.2, 4], [-0.6, 0.46, 0.16, 0.3, -0.2, 4], [0, 0.5, 0.18, 0.32, -0.2, 4], [0.5, 0.44, 0.16, 0.3, -0.2, 4], [0.85, 0.3, 0.12, 0.22, -0.22, 4], [1.0, 0.2, 0.08, 0.14, -0.26, 4]], M.frame, { K: 12, flat: true }));
  const dome = [[-0.95, 0.36, 0.26], [-0.6, 0.5, 0.4], [-0.2, 0.58, 0.47], [0.2, 0.57, 0.44], [0.55, 0.46, 0.3], [0.8, 0.32, 0.14], [0.95, 0.2, 0.04]];
  body.add(shell(dome.map(([z, w, up]) => ({ z, w, up, dn: 0.05, yc: 0, n: 2.6, nd: 6 })), M.frame));
  const canopy = shell([[-0.75, 0.4, 0.3], [-0.5, 0.47, 0.36], [-0.2, 0.52, 0.41], [0.2, 0.51, 0.38], [0.55, 0.41, 0.24], [0.8, 0.27, 0.085], [0.9, 0.17, 0.02]].map(([z, w, up]) => ({ z, w, up, dn: 0.02, yc: 0.1, n: 2.5, nd: 6 })), M.hull, { K: 20 });
  canopy.name = 'canopy'; body.add(canopy);
  body.add(shell([[-0.43, 0.49, 0.385], [-0.38, 0.5, 0.39]].map(([z, w, up]) => ({ z, w, up, dn: 0.02, yc: 0.1, n: 2.5, nd: 6 })), M.frame, { K: 20 }));                                                    // hatch seam
  for (const s of [-1, 1]) {
    body.add(shell([[-0.62, 0.05, 0.12, 0.12, -0.16, 3, s * 0.5], [0, 0.05, 0.15, 0.15, -0.17, 3, s * 0.56], [0.45, 0.05, 0.13, 0.13, -0.17, 3, s * 0.5], [0.76, 0.04, 0.08, 0.08, -0.2, 3, s * 0.35]], M.hull, { K: 10 }));   // cheek panel (carries the Personal Mark)
    body.add(at(cyl(0.05, 0.3, 'z', M.frame), s * 0.3, -0.44, 0.62), at(cyl(0.022, 0.08, 'z', M.steel), s * 0.3, -0.44, 0.8));                                                              // wire anchors
    body.add(at(cyl(0.1, 0.2, 'z', M.gun), s * 0.17, -0.22, -1.0));
  }
  body.add(at(cyl(0.125, 0.18, 'z', M.frame), 0, -0.2, 1.0), at(cyl(0.078, 0.04, 'z', M.eye), 0, -0.2, 1.1), at(cyl(0.032, 0.06, 'z', M.gun), 0.17, -0.27, 0.98));                              // optic
  body.add(at(box(0.5, 0.14, 0.9, M.frame), 0, -0.53, -0.1), at(box(0.5, 0.3, 0.3, M.frame), 0, 0.06, -1.0), at(box(0.56, 0.05, 0.06, M.gun), 0, 0.24, -1.02));
  const HIPS = [[0.55, -0.15, 0.45], [-0.55, -0.15, 0.45], [0.55, -0.15, -0.5], [-0.55, -0.15, -0.5]];
  HIPS.forEach(h => body.add(at(box(0.26, 0.22, 0.34, M.frame), h[0] * 0.87, h[1], h[2]), at(cyl(0.13, 0.26, 'y', M.gun), ...h)));
  const pilot = at(k.pilot(), 0, 0.02, 0.12); body.add(pilot);

  /* ── the gun: yaw ▸ elevation ▸ recoil. A 57mm smoothbore built like an outsized rifle, with a slab magazine hanging off the back ── */
  const T = [0, 0.78, -0.95];
  body.add(strut([0, 0.22, -0.82], [0, 0.7, -0.95], 0.14, M.frame, 0.2), strut([0.16, 0.1, -1.05], [0.12, 0.72, -0.97], 0.05, M.gun), strut([-0.16, 0.1, -1.05], [-0.12, 0.72, -0.97], 0.05, M.gun));
  const gun = at(grp(), ...T), cradle = grp(), barrel = grp(); body.add(gun); gun.add(cradle); cradle.add(barrel);
  cradle.add(cyl(0.13, 0.36, 'x', M.frame), cyl(0.07, 0.4, 'x', M.steel));
  cradle.add(profile([[0.3, -0.1], [0.3, 0.16], [-0.2, 0.2], [-0.5, 0.28], [-1.25, 0.28], [-1.4, 0.36], [-1.8, 0.36], [-1.95, 0.22], [-1.95, -0.16], [-1.5, -0.22], [-0.6, -0.22], [-0.3, -0.14]], 0.26, M.gun, 0.02));          // receiver
  cradle.add(at(box(0.3, 0.14, 0.5, M.frame), 0, 0.02, -0.9), at(box(0.29, 0.06, 0.3, M.frame), 0, -0.1, -0.2), at(box(0.3, 0.1, 0.16, M.frame), 0, 0.12, -1.62));
  cradle.add(at(cyl(0.03, 0.56, 'z', M.gun), 0, 0.45, -0.85), at(box(0.04, 0.16, 0.05, M.gun), 0, 0.36, -0.6), at(box(0.04, 0.16, 0.05, M.gun), 0, 0.36, -1.1));                                                               // carry handle
  cradle.add(at(cyl(0.05, 0.22, 'x', M.gun), -0.2, 0.3, -0.32), at(cyl(0.035, 0.3, 'z', M.gun), -0.1, 0.3, -0.32));                                                                                                            // charging handle
  cradle.add(at(box(0.035, 0.2, 0.04, M.gun), 0.08, 0.46, -1.7), at(box(0.035, 0.2, 0.04, M.gun), -0.08, 0.46, -1.7), at(box(0.2, 0.035, 0.04, M.gun), 0, 0.56, -1.7));                                                        // rear loop
  cradle.add(profile([[-0.72, -0.2], [-1.72, -0.2], [-1.88, -1.2], [-0.92, -1.26]], 0.32, M.frame, 0.02), profile([[-0.86, -0.34], [-1.62, -0.34], [-1.74, -1.08], [-1.0, -1.12]], 0.35, M.gun, 0.01));                        // magazine
  cradle.add(at(box(0.05, 0.07, 0.1, M.eye), 0.135, -0.04, -0.62));
  barrel.add(at(cyl(0.095, 0.55, 'z', M.gun), 0, 0.03, 0.57), at(cyl(0.095, 0.16, 'z', M.gun, 0.058), 0, 0.03, 0.93), at(cyl(0.052, 2.2, 'z', M.gun), 0, 0.03, 2.0), at(cyl(0.068, 0.06, 'z', M.frame), 0, 0.03, 1.7));
  barrel.add(at(cyl(0.08, 0.26, 'z', M.gun), 0, 0.03, 3.14), at(cyl(0.092, 0.04, 'z', M.frame), 0, 0.03, 3.27), at(cyl(0.092, 0.04, 'z', M.frame), 0, 0.03, 3.02));                                                            // muzzle brake
  barrel.add(strut([0, -0.02, 2.86], [0, -0.2, 2.94], 0.03, M.gun), at(cyl(0.045, 0.16, 'z', M.gun), 0, -0.2, 3.0), at(cyl(0.03, 0.02, 'z', M.eye), 0, -0.2, 3.09));                                                           // muzzle reference sensor

  /* ── grapple sub-arms: 12.7mm heavy machine guns, or high-frequency blades ── */
  for (const s of [-1, 1]) {
    const sh = [s * 0.3, -0.34, 0.62], el = [s * 0.44, -0.4, 0.95];
    body.add(at(ball(0.075, M.gun), ...sh), strut(sh, el, 0.07, M.frame), at(ball(0.07, M.gun), ...el));
    const w = at(grp(), ...el, 0, s * 0.14, 0); body.add(w);
    if (o.blades) {
      const b = at(grp(), 0, -0.02, 0.05, 0, 0, s * -0.3); w.add(b);
      b.add(profile([[-0.1, 0.1], [1.55, 0.1], [1.85, -0.03], [1.8, -0.12], [0.1, -0.17], [-0.1, -0.1]], 0.04, M.gun, 0.008), profile([[0.1, -0.17], [1.8, -0.12], [1.85, -0.03], [1.72, -0.055], [0.14, -0.105]], 0.046, M.steel, 0.004), at(box(0.09, 0.1, 0.34, M.frame), 0, 0.13, 0.22));
    } else w.add(at(box(0.1, 0.13, 0.5, M.gun), 0, 0, 0.2), at(cyl(0.022, 0.56, 'z', M.gun), 0, 0.01, 0.72), at(cyl(0.032, 0.09, 'z', M.frame), 0, 0.01, 1.0), at(box(0.09, 0.15, 0.2, M.frame), s * -0.095, -0.03, 0.14));
  }

  /* ── legs: dark frame under cream armor; the shin plate bows outward like a rib ── */
  const rig = k.legRig(body, HIPS.map((h, i) => ({ hip: h, foot: [Math.sign(h[0]) * (i < 2 ? 2.0 : 1.95), ANKLE, i < 2 ? 1.45 : -1.5], phase: (i === 0 || i === 3) ? 0 : Math.PI })), DIM);
  rig.legs.forEach(l => {
    l.group.add(limb([[0, 0.07, 0.07, 0.07, 0, 4], [DIM.coxa, 0.07, 0.07, 0.07, 0, 4]], M.frame, { K: 8, flat: true }));
    l.femur.add(cyl(0.12, 0.24, 'z', M.frame), cyl(0.07, 0.28, 'z', M.gun));
    l.femur.add(limb([[0, 0.055, 0.06, 0.06, 0, 4], [DIM.L1, 0.05, 0.055, 0.055, 0, 4]], M.frame, { K: 8, flat: true }), at(box(0.42, 0.11, 0.12, M.frame), 0.48, -0.12, 0), at(cyl(0.025, 0.3, 'x', M.steel), 0.82, -0.12, 0));
    for (const [x, y, z] of [[0.1, 0.156, 0.05], [0.1, 0.156, -0.05], [0.9, 0.156, 0.05], [0.9, 0.156, -0.05]]) l.femur.add(at(cyl(0.02, 0.016, 'y', M.gun, 0.02, 6), x, y, z));
    for (const [x, y, z] of [[0.22, 0.186, 0.05], [0.22, 0.186, -0.05], [1.36, 0.146, 0.028], [1.36, 0.146, -0.028]]) l.tibia.add(at(cyl(0.02, 0.016, 'y', M.gun, 0.02, 6), x, y, z));
    l.femur.add(limb([[-0.06, 0.03, 0.015, 0.015, 0.1, 3], [0.08, 0.1, 0.045, 0.03, 0.11, 3], [0.5, 0.125, 0.055, 0.03, 0.125, 3], [0.92, 0.1, 0.045, 0.03, 0.11, 3], [1.06, 0.03, 0.015, 0.015, 0.1, 3]], M.hull, { K: 12 }));     // thigh plate
    l.tibia.add(cyl(0.13, 0.26, 'z', M.frame), cyl(0.08, 0.3, 'z', M.gun));
    l.tibia.add(limb([[0.05, 0.045, 0.05, 0.05, -0.02, 4], [1.62, 0.035, 0.04, 0.04, -0.02, 4]], M.frame, { K: 8, flat: true }), at(box(0.3, 0.08, 0.1, M.frame), 0.36, -0.1, 0));
    const Z = [0.02, 0.18, 0.42, 0.75, 1.08, 1.4, 1.64], Wd = [0.05, 0.1, 0.12, 0.11, 0.09, 0.065, 0.035], Th = [0.03, 0.05, 0.06, 0.055, 0.045, 0.035, 0.02], Yc = [0.06, 0.12, 0.17, 0.19, 0.16, 0.1, 0.03];
    l.tibia.add(limb(Z.map((z, i) => [z, Wd[i], Th[i], Th[i], Yc[i], 2.8]), M.hull, { K: 12 }));                                                                                                                                  // shin plate
    l.tibia.add(at(ball(0.085, M.gun), DIM.L2, 0, 0));
    l.foot.add(at(cyl(0.05, 0.1, 'y', M.frame), 0, -0.06, 0), at(cyl(0.17, 0.09, 'y', M.frame, 0.1, 10), 0, -0.13, 0), at(cyl(0.001, 0.1, 'y', M.steel, 0.04, 6), 0, -0.17, 0));
    for (let a = 0; a < 3; a++) l.foot.add(at(box(0.11, 0.05, 0.07, M.gun), Math.cos(a * 2.094) * 0.17, -0.155, Math.sin(a * 2.094) * 0.17, 0, -a * 2.094, 0));
  });

  /** t in seconds; motion: 'hold' | 'idle' | 'walk' */
  function update(t = 0, motion = 'idle') {
    const walk = motion === 'walk', live = motion !== 'hold', w = t * 5.2;
    body.position.set(live && !walk ? Math.sin(t * 0.6) * 0.03 : 0, RIDE + (walk ? Math.sin(w * 2) * 0.03 : live ? Math.sin(t * 1.2) * 0.03 : 0), 0);
    body.rotation.set(live ? Math.sin(walk ? w * 2 + 1 : t * 0.9) * (walk ? 0.02 : 0.012) : 0, 0, live ? Math.sin(walk ? w : t * 0.7) * (walk ? 0.028 : 0.014) : 0);
    gun.rotation.y = live ? Math.sin(t * 0.45) * 0.22 : 0; cradle.rotation.x = live ? -0.03 + Math.sin(t * 0.31) * 0.04 : 0;
    rig.pose(w, walk ? 0.42 : 0, walk ? 0.36 : 0);
  }
  update(0, 'hold');
  root.userData = { body, gun, cradle, barrel, pilot, legs: rig.legs, rig, update, size: { length: 5.4, height: 2.1 },
    anchors: { mark: [0.62, RIDE - 0.16, -0.05], cockpit: [0, RIDE + 0.3, 0.1], muzzle: [0, RIDE + 0.81, 2.3], gun: [0, RIDE + 0.95, -1.6], leg: [1.5, 1.2, 1.1] } };
  return root;
};
