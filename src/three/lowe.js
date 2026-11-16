/* Löwe, the Legion's tank type, built in code against the official design art.
   Official armament: 120mm smoothbore, 12.7mm machine gun. No official dimensions are published; this build is sized as a
   fifty-tonne machine that dwarfs the 5.4 m Juggernaut.
   H.lowe(THREE)  →  THREE.Group, forward is +z, units are metres. Autonomous: there is no pilot. */
import { H } from "./registry.js";

const RIDE = 1.75, DIM = { coxa: 0.3, L1: 1.2, L2: 2.15 }, ANKLE = 0.2;
const DECK = 0.38, TURRET = [0, DECK, 0.2], TRUNNION = [0, 0.36, 0.95];     // hull top; turret ring on the hull; gun trunnion inside the turret

H.lowe = function (THREE, o = {}) {
  const k = H.kit(THREE, { hull: o.hull ?? 0xb2c8ee, frame: 0x303d5c, gun: 0x55678f, steel: 0xd5e1f6, eye: 0xd9f5ff, weather: false });
  const { M, mat, mesh, at, grp, shell, limb, box, cyl, ball } = k;
  Object.assign(M.hull, { metalness: 0.45, roughness: 0.3, flatShading: true });
  const pale = mat(0xdce8fa, { metalness: 0.35, roughness: 0.32, flatShading: true });                      // lighter plates: glacis, strakes, comb
  const glass = mat(0xa9c9f2, { metalness: 0.2, roughness: 0.15, transparent: true, opacity: 0.38 });
  const F = { K: 12, flat: true }, B = { K: 4, flat: true };                                                  // faceted shells; four-sided blades
  const root = grp(); root.name = 'Löwe';
  const body = at(grp(), 0, RIDE, 0); body.name = 'body'; root.add(body);

  /* ── hull: a deep faceted wedge, pale glacis under the nose, dark keel ── */
  body.add(shell([[-2.3, 0.7, 0.24, 0.3, 0.02, 5], [-1.8, 1.05, 0.34, 0.44, 0, 5], [-0.6, 1.3, DECK, 0.5, 0, 5], [0.8, 1.25, DECK, 0.5, 0, 5], [1.7, 0.98, 0.3, 0.44, -0.02, 5], [2.35, 0.58, 0.12, 0.32, -0.12, 5], [2.6, 0.32, 0.05, 0.16, -0.22, 5]], M.hull, F));
  body.add(shell([[1.1, 0.86, 0.05, 0.14, -0.56, 5], [2.1, 0.68, 0.05, 0.14, -0.5, 5], [2.85, 0.32, 0.03, 0.08, -0.38, 5]], pale, F));                          // glacis
  body.add(shell([[-2.0, 0.5, 0.1, 0.2, -0.56, 5], [-1.2, 0.76, 0.1, 0.26, -0.56, 5], [1.05, 0.76, 0.1, 0.26, -0.56, 5]], M.frame, F));                         // keel
  body.add(at(box(1.2, 0.055, 0.05, M.eye), 0, 0.165, 2.02, 0.41));                                                                                             // sensor slit
  for (const s of [-1, 1]) {
    body.add(shell([[-1.9, 0.06, 0.05, 0.05, 0.27, 5, s * 1.0], [-0.6, 0.06, 0.05, 0.05, 0.32, 5, s * 1.29], [0.8, 0.06, 0.05, 0.05, 0.32, 5, s * 1.24], [1.7, 0.05, 0.04, 0.04, 0.24, 5, s * 0.96]], pale, { K: 8, flat: true }));   // deck strake
    body.add(at(box(0.16, 0.3, 3.5, M.frame), s * 1.15, -0.14, 0));                                                                                            // hip rail
    body.add(at(box(0.5, 0.04, 0.9, pale), s * 0.64, DECK - 0.02, 1.12, 0.09, 0, s * -0.05), at(box(0.06, 0.05, 0.05, M.eye), s * 0.82, 0.07, 2.14));           // deck hatch, corner sensor
    for (let i = 0; i < 5; i++) body.add(at(box(0.44, 0.03, 0.07, M.gun), s * 0.8, DECK - 0.03 - i * 0.012, -1.3 - i * 0.14));                                  // engine louvres
  }
  body.add(at(box(1.0, 0.34, 0.14, M.frame), 0, -0.02, -2.3)); for (let i = 0; i < 4; i++) body.add(at(box(0.84, 0.03, 0.05, M.gun), 0, -0.14 + i * 0.08, -2.38));               // stern exhaust
  const HIPS = [[0.98, 1.75], [1.2, 0.6], [1.2, -0.55], [1.03, -1.7]].flatMap(([x, z]) => [[x, -0.08, z], [-x, -0.08, z]]);
  const FEET = [[2.4, 3.4], [2.9, 1.1], [2.9, -1.1], [2.45, -3.1]].flatMap(([x, z]) => [[x, ANKLE, z], [-x, ANKLE, z]]);
  HIPS.forEach(h => body.add(at(cyl(0.2, 0.36, 'y', M.gun), ...h), at(cyl(0.23, 0.05, 'y', pale), h[0], h[1] + 0.2, h[2])));

  /* ── turret: yaw ▸ elevation ▸ recoil. Low and faceted, with the radiator comb and tail plate on its bustle ── */
  const gun = at(grp(), ...TURRET), cradle = at(grp(), ...TRUNNION), barrel = grp(); body.add(gun); gun.add(cradle); cradle.add(barrel);
  gun.add(at(cyl(0.95, 0.08, 'y', M.frame, 0.95, 24), 0, 0.04, 0));
  gun.add(shell([[-1.25, 0.62, 0.4], [-0.6, 0.92, 0.56], [0.3, 0.88, 0.54], [0.95, 0.52, 0.36], [1.25, 0.32, 0.22]].map(([z, w, up]) => ({ z, w, up, dn: 0.02, yc: 0.1, n: 3.4, nd: 6 })), M.hull, F));
  gun.add(at(cyl(0.5, 0.05, 'y', pale, 0.5, 6), 0, 0.665, -0.05, 0, 0.52, 0));                                                                                   // hexagonal roof plate
  const dome = at(ball(0.24, M.hull, 12), 0, 0.74, -0.52); dome.scale.y = 0.55; gun.add(at(cyl(0.27, 0.1, 'y', M.frame), 0, 0.69, -0.52), dome);                  // cupola
  gun.add(at(box(0.11, 0.11, 0.42, M.gun), 0.56, 0.36, 0.86), at(cyl(0.022, 0.75, 'z', M.gun), 0.56, 0.36, 1.42), at(cyl(0.03, 0.08, 'z', M.frame), 0.56, 0.36, 1.8));  // 12.7mm coaxial
  gun.add(at(box(0.05, 0.07, 0.18, M.eye), -0.5, 0.4, 1.0, 0, -0.5, 0));
  for (const s of [-1, 1]) gun.add(at(box(0.04, 0.2, 0.62, M.gun), s * 0.87, 0.25, 0.12, 0, s * -0.08, s * 0.42), at(box(0.07, 0.16, 0.5, M.gun), s * 0.86, 0.22, -0.7, 0, s * 0.2, s * 0.4));   // cheek armour, stowage
  gun.add(shell([[-2.6, 0.52, 0.03, 0.03, 0.6, 5], [-2.0, 0.74, 0.04, 0.04, 0.45, 5], [-1.2, 0.78, 0.05, 0.05, 0.26, 5]], M.hull, { K: 8, flat: true }));        // tail plate
  const fan = at(grp(), 0, 0.55, -1.05, -1.15); gun.add(fan);                                                                                                    // radiator comb, swept back
  const N = 19; for (let i = 0; i < N; i++) { const a = Math.PI * i / (N - 1); fan.add(at(box(0.78, 0.026, 0.15, pale), Math.cos(a) * 0.9, Math.sin(a) * 0.9, 0, 0, 0, a)); }
  fan.add(mesh(new THREE.TorusGeometry(0.5, 0.055, 6, 24, Math.PI), M.frame), cyl(0.06, 1.1, 'x', M.frame));
  const arch = at(grp(), 0, 0.55, -0.8, -0.3); gun.add(arch);                                                                                                    // the arch standing in front of the comb
  arch.add(mesh(new THREE.TorusGeometry(0.62, 0.035, 6, 24, Math.PI), pale), mesh(new THREE.CircleGeometry(0.6, 24, 0, Math.PI), glass));

  cradle.add(cyl(0.2, 0.74, 'x', M.frame));
  cradle.add(shell([[-0.2, 0.36, 0.24, 0.24, 0, 5], [0.5, 0.3, 0.2, 0.2, 0, 5], [0.9, 0.22, 0.15, 0.15, 0, 5]], M.hull, { K: 8, flat: true }));                   // mantlet
  barrel.add(shell([[0.9, 0.2, 0.13, 0.13, 0, 4], [2.4, 0.15, 0.1, 0.1, 0, 4], [4.2, 0.09, 0.07, 0.07, 0, 4]], M.hull, { K: 8, flat: true }));                    // flat faceted sleeve
  barrel.add(shell([[1.0, 0.035, 0.03, 0.02, 0.14, 4], [4.1, 0.02, 0.02, 0.02, 0.085, 4]], pale, B));                                                            // spine along the sleeve
  barrel.add(at(cyl(0.062, 0.7, 'z', M.gun), 0, 0, 4.54), at(cyl(0.085, 0.2, 'z', M.frame), 0, 0, 4.9), at(cyl(0.075, 0.04, 'z', M.steel), 0, 0, 4.25), at(cyl(0.075, 0.03, 'z', M.steel), 0, 0, 4.76), at(cyl(0.02, 0.1, 'z', M.frame), 0, -0.1, 4.9));

  /* ── legs: a wide plate over the thigh, then a long four-sided blade down to a small claw ── */
  const rig = k.legRig(body, HIPS.map((h, i) => ({ hip: h, foot: FEET[i], phase: (((i >> 1) + (i & 1)) % 2) ? Math.PI : 0 })), DIM);
  rig.legs.forEach(l => {
    l.group.add(limb([[0, 0.12, 0.11, 0.11, 0, 5], [DIM.coxa, 0.11, 0.1, 0.1, 0, 5]], M.frame, { K: 8, flat: true }));
    l.femur.add(cyl(0.17, 0.34, 'z', M.frame), cyl(0.1, 0.38, 'z', M.gun));
    l.femur.add(limb([[0, 0.08, 0.08, 0.08, 0, 5], [DIM.L1, 0.07, 0.07, 0.07, 0, 5]], M.frame, { K: 8, flat: true }), at(box(0.5, 0.1, 0.14, M.gun), 0.5, -0.12, 0), at(cyl(0.028, 0.34, 'x', M.steel), 0.92, -0.12, 0));
    l.femur.add(limb([[-0.16, 0.24, 0.03, 0.03, 0.13, 5], [0.25, 0.4, 0.05, 0.04, 0.16, 5], [DIM.L1 - 0.1, 0.27, 0.045, 0.04, 0.15, 5], [DIM.L1 + 0.16, 0.13, 0.025, 0.025, 0.12, 5]], M.hull, { K: 8, flat: true }));    // thigh plate
    l.tibia.add(cyl(0.16, 0.34, 'z', M.frame), cyl(0.09, 0.38, 'z', M.gun), at(box(0.3, 0.09, 0.12, M.gun), 0.3, -0.1, 0));
    l.tibia.add(limb([[-0.34, 0.05, 0.02, 0.02, 0.07], [-0.12, 0.17, 0.05, 0.04, 0.05], [0.12, 0.26, 0.075, 0.05, 0.035], [0.5, 0.28, 0.075, 0.05, 0.025], [1.4, 0.16, 0.055, 0.04, 0.005], [DIM.L2 - 0.02, 0.04, 0.022, 0.022, 0]], M.hull, B));           // blade
    l.tibia.add(at(ball(0.07, M.gun, 10), DIM.L2, 0, 0));
    l.foot.add(at(cyl(0.001, 0.2, 'y', M.frame, 0.075, 4), 0, -0.1, 0), limb([[-0.1, 0.06, 0.03, 0.03, -0.14], [0.32, 0.012, 0.01, 0.01, -0.19]], M.frame, B));                                                         // claw
  });

  /** t in seconds; motion: 'hold' | 'idle' | 'walk' */
  function update(t = 0, motion = 'idle') {
    const walk = motion === 'walk', live = motion !== 'hold', w = t * 3.6;
    body.position.set(0, RIDE + (walk ? Math.sin(w * 2) * 0.03 : live ? Math.sin(t * 0.8) * 0.025 : 0), 0);
    body.rotation.set(live ? Math.sin(walk ? w * 2 + 1 : t * 0.6) * 0.008 : 0, 0, live ? Math.sin(walk ? w : t * 0.5) * 0.01 : 0);
    gun.rotation.y = live ? Math.sin(t * 0.3) * 0.35 : 0; cradle.rotation.x = live ? -0.02 + Math.sin(t * 0.23) * 0.03 : 0;
    rig.pose(w, walk ? 0.5 : 0, walk ? 0.4 : 0);
  }
  update(0, 'hold');
  const gy = RIDE + TURRET[1] + TRUNNION[1], gz = TURRET[2] + TRUNNION[2];
  root.userData = { body, gun, cradle, barrel, legs: rig.legs, update, size: { length: 8.6, height: 3.3 },
    anchors: { muzzle: [0, gy, gz + 4.95], gun: [0, RIDE + TURRET[1] + 0.7, TURRET[2]], hull: [1.3, RIDE + 0.05, -0.3], leg: [2.47, 2.29, 0.98], sensor: [0, RIDE + 0.17, 2.05] } };
  return root;
};
