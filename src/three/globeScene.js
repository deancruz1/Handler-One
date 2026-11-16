/* The Factions globe: a schematic chart of the known world. Land is a field of dots coloured by who holds it; the
   Legion's ground flickers and is cratered, the grid is torn over it, and the sea lanes die at the edge of the jamming.
   Everything off the continent is invented filler drawn as pre-war charts: nothing past the jamming has been seen since.
   mountGlobe(stage, powers, onSelect) returns { select(id), toggleHold(), dispose() }. */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const BG = 0x05070a;
const css = c => "#" + c.toString(16).padStart(6, "0");

export function mountGlobe(stage, powers, onSelect) {
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const made = [], add = tag => { const el = document.createElement(tag); stage.appendChild(el); made.push(el); return el; };
  let seed = 86; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  const COAST = [[-36, 34], [-33, 44], [-26, 52], [-17, 57], [-10, 63], [-1, 65], [8, 62], [15, 57], [22, 58], [30, 52], [37, 45], [41, 36], [39, 27], [42, 19], [36, 12], [28, 8], [20, 2], [11, -1], [4, 3], [-3, -2], [-10, 2], [-15, 9], [-22, 11], [-28, 17], [-34, 24]];
  // roughen the coast so it reads as land, not a polygon
  const coast = []; COAST.forEach((a, i) => { const b = COAST[(i + 1) % COAST.length]; for (let k = 0; k < 5; k++) { const t = k / 5, j = k ? 1.5 : 0; coast.push([a[0] + (b[0] - a[0]) * t + (rnd() - .5) * j, a[1] + (b[1] - a[1]) * t + (rnd() - .5) * j]); } });
  const inPoly = (poly, lon, lat) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) c = !c; } return c; };
  const inside = (lon, lat) => inPoly(coast, lon, lat);
  const R = 10, D2R = Math.PI / 180;
  const P = (lon, lat, r = R) => new THREE.Vector3(r * Math.cos(lat * D2R) * Math.sin(lon * D2R), r * Math.sin(lat * D2R), r * Math.cos(lat * D2R) * Math.cos(lon * D2R));
  const POWERS = powers.map(p => ({ ...p, ...p.map, nodata: !p.status })), power = id => POWERS.find(p => p.id === id), LEGION = power('legion'), REPUBLIC = power('republic');
  const arc = (a, b) => Math.hypot((a.lon - b.lon) * Math.cos((a.lat + b.lat) / 2 * D2R), a.lat - b.lat);      // degrees, good enough at this scale
  const owner = (lon, lat) => POWERS.find(p => p.r && arc(p, { lon, lat }) < p.r * (1 + .13 * Math.sin(lon * .9 + p.lat) * Math.cos(lat * 1.1))) ?? LEGION;

  /* craters: holes punched in the dot field, mostly along the fronts */
  const craters = []; while (craters.length < 46) { const lon = -36 + rnd() * 78, lat = -2 + rnd() * 66; if (!inside(lon, lat)) continue; const o = owner(lon, lat); if (o.id === 'legion' || rnd() < .22) craters.push({ lon, lat, r: .9 + rnd() * 1.9 }); }

  /* the rest of the world, from charts drawn before the war. Longitudes may run past 180 so no outline crosses the seam. */
  const rough = poly => { for (let pass = 0; pass < 2; pass++) poly = poly.flatMap((a, i, all) => { const b = all[(i + 1) % all.length], d = Math.hypot(b[0] - a[0], b[1] - a[1]) * .3; return [a, [(a[0] + b[0]) / 2 + (rnd() - .5) * d, (a[1] + b[1]) / 2 + (rnd() - .5) * d]]; }); return poly; };
  const LANDS = [
    { poly: [[78, 48], [86, 58], [100, 63], [116, 60], [130, 64], [144, 56], [152, 44], [148, 32], [138, 24], [130, 12], [118, 6], [108, 14], [98, 8], [88, 16], [80, 28], [74, 38]] },
    { poly: [[-18, -22], [-6, -18], [8, -22], [20, -17], [34, -22], [44, -32], [40, -44], [30, -54], [16, -58], [2, -52], [-10, -46], [-20, -34]] },
    { poly: [[-118, 48], [-104, 54], [-92, 46], [-86, 32], [-90, 18], [-84, 6], [-90, -10], [-98, -24], [-108, -30], [-114, -18], [-110, -2], [-118, 12], [-126, 26], [-124, 38]] },
    { poly: [[168, 0], [180, 6], [194, 2], [206, -6], [212, -20], [204, -34], [190, -40], [176, -36], [166, -24], [162, -10]] },
  ].map(l => ({ ...l, poly: rough(l.poly) }));
  const ISLES = [[56, 40, 1.6], [60, 34, 1.1], [63, 45, 1.3], [58, 22, 1.8], [-28, -8, 1.4], [-34, -13, 1], [50, -4, 1.7], [55, -12, 1.2], [-60, 40, 1.6], [-66, 33, 1.1], [-72, 45, 1.3], [-58, 12, 1.5],
    [150, -8, 1.6], [156, -14, 1.2], [-150, 20, 2], [-158, 28, 1.3], [-140, -6, 1.4], [120, -20, 2.2], [112, -28, 1.4], [-60, -30, 2.4], [-52, -38, 1.3], [-170, 50, 2.6], [-160, 58, 1.5], [70, -40, 2.1], [78, -46, 1.2]].map(([lon, lat, r]) => ({ lon, lat, r }));
  const JAM = { lon: -2, lat: 31 }, jamRho = a => (46 + 2 * Math.sin(3 * a + 1) + 1.2 * Math.sin(7 * a)) * D2R;                 // how far the jamming reaches, by bearing

  /* ── scene ── */
  const canvas = add('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); renderer.setClearColor(BG); renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(30, 1, .1, 400), globe = new THREE.Group(); scene.add(globe);
  const controls = new OrbitControls(camera, canvas); Object.assign(controls, { enableZoom: false, enablePan: false, enableDamping: true, rotateSpeed: .5, autoRotate: !reduce, autoRotateSpeed: .25, minPolarAngle: .5, maxPolarAngle: 2.2 });
  const DIST = 46; camera.position.copy(P(-4, 30, DIST));
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(R - .04, 64, 48), new THREE.MeshBasicMaterial({ color: 0x060a11 })));
  // rim light: a faint halo so the limb reads against the dark
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.06, 64, 48), new THREE.ShaderMaterial({ side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 n; void main(){ n = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
    fragmentShader: 'varying vec3 n; void main(){ float f = pow(1. - abs(n.z), 4.5); gl_FragColor = vec4(.3, .64, 1., 1.) * f * .32; }' })));

  /* graticule: intact over open water and held ground, torn where the Legion sits */
  { const p = [], c = [], seg = (a, b, lon, lat) => { const land = inside(lon, lat), o = land ? owner(lon, lat) : null; if (o?.id === 'legion' && rnd() < .72) return; if (o?.unstable && rnd() < .35) return;
      const k = o ? (o.id === 'legion' ? [.5, .32, .08] : [.16, .3, .46]) : [.1, .2, .32]; p.push(a.x, a.y, a.z, b.x, b.y, b.z); c.push(...k, ...k); };
    for (let lat = -75; lat <= 75; lat += 15) for (let lon = -180; lon < 180; lon += 3) seg(P(lon, lat, R + .01), P(lon + 3, lat, R + .01), lon + 1.5, lat);
    for (let lon = -180; lon < 180; lon += 15) for (let lat = -87; lat < 87; lat += 3) seg(P(lon, lat, R + .01), P(lon, lat + 3, R + .01), lon, lat + 1.5);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(c, 3));
    globe.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: .8 }))); }

  /* land as a dot field, coloured by who holds it. kind: 0 steady, 1 Legion (flickers), 2 collapsing, 3 no data, 4 pre-war chart, 5 ice */
  const dotMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: { uTime: { value: 0 }, uSize: { value: 1 }, uFocus: { value: new THREE.Vector3(9, 9, 9) } },
    vertexShader: `attribute vec3 aColor; attribute float aSeed; attribute float aKind; uniform float uTime, uSize; uniform vec3 uFocus; varying vec3 vC; varying float vA;
      void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); gl_Position = projectionMatrix * mv;
        float n = fract(sin(aSeed * 91.7 + floor(uTime * (1.5 + aSeed * 5.))) * 43758.5453);
        float a = aKind < .5 ? .95 : aKind < 1.5 ? mix(.22, 1., step(.4, n)) : aKind < 2.5 ? mix(.3, 1., step(.3, n)) : aKind < 3.5 ? .4 : aKind < 4.5 ? .8 + .16 * sin(position.y * 1.4 - uTime * .45) : .6;
        float near = 1. - smoothstep(0., 3.4, distance(position, uFocus));
        vC = mix(aColor, vec3(1.), near * .35); vA = a; if (aKind > 1.5 && aKind < 2.5 && n < .12) vC = vec3(1., .3, .3);
        gl_PointSize = uSize * (aKind > 2.5 && aKind < 3.5 ? .7 : 1.) * (1. + near * .45) * 74. / -mv.z; }`,
    fragmentShader: 'varying vec3 vC; varying float vA; void main(){ if (length(gl_PointCoord - .5) > .5) discard; gl_FragColor = vec4(vC, vA); }' });
  { const p = [], c = [], s = [], k = [], col = new THREE.Color();
    const put = (lon, lat, color, kind, shade = 1) => { const v = P(lon, lat, R + .04); col.set(color).multiplyScalar(shade); p.push(v.x, v.y, v.z); c.push(col.r, col.g, col.b); s.push(rnd()); k.push(kind); };
    const grid = (lat0, lat1, lon0, lon1, fn) => { for (let lat = lat0; lat <= lat1; lat += 1.05) { const step = 1.05 / Math.max(.03, Math.cos(lat * D2R)); for (let lon = lon0; lon <= lon1; lon += step) fn(lon, lat); } };
    const relief = (lon, lat) => Math.max(.5, .8 + .3 * Math.sin(lon * .23 + 1.3) * Math.cos(lat * .29) + .2 * Math.sin(lon * .11 - lat * .17));   // uplands read lighter
    grid(-3, 66, -40, 44, (lon, lat) => { if (!inside(lon, lat) || craters.some(cr => arc(cr, { lon, lat }) < cr.r)) return;
      const o = owner(lon, lat); if (o.id === 'legion' && rnd() < .16) return;                                                  // scorched: the Legion's ground is thinner
      put(lon, lat, o.color, o.id === 'legion' ? 1 : o.unstable ? 2 : o.nodata ? 3 : 0); });
    for (const l of LANDS) { const xs = l.poly.map(q => q[0]), ys = l.poly.map(q => q[1]); grid(Math.min(...ys), Math.max(...ys), Math.min(...xs), Math.max(...xs), (lon, lat) => inPoly(l.poly, lon, lat) && put(lon, lat, 0x86a2c4, 4, relief(lon, lat))); }
    for (const i of ISLES) grid(i.lat - i.r - 1, i.lat + i.r + 1, i.lon - (i.r + 1) * 1.6, i.lon + (i.r + 1) * 1.6, (lon, lat) => arc(i, { lon, lat }) < i.r * (1 + .3 * Math.sin(lon * 2.1 + lat * 1.7)) && put(lon, lat, 0x86a2c4, 4, .8));
    grid(72, 88, -180, 180, (lon, lat) => lat > 79 + 3 * Math.sin(lon * D2R * 3) + 1.5 * Math.sin(lon * D2R * 7 + 1) && put(lon, lat, 0xa9bccf, 5));          // ice
    grid(-88, -68, -180, 180, (lon, lat) => lat < -75 + 3 * Math.sin(lon * D2R * 4) + 1.5 * Math.sin(lon * D2R * 9 + 2) && put(lon, lat, 0xa9bccf, 5));
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); g.setAttribute('aColor', new THREE.Float32BufferAttribute(c, 3)); g.setAttribute('aSeed', new THREE.Float32BufferAttribute(s, 1)); g.setAttribute('aKind', new THREE.Float32BufferAttribute(k, 1));
    globe.add(new THREE.Points(g, dotMat)); }

  const loop = (pts, color, opacity) => { const l = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: true, opacity })); globe.add(l); return l; };
  loop(coast.map(([lon, lat]) => P(lon, lat, R + .03)), 0x8fb4dc, .55);                                                         // coastline
  const ring = (c, r, jag, lift = .06) => Array.from({ length: 72 }, (_, i) => { const a = i / 72 * 6.2832, rr = r * (1 + (rnd() - .5) * jag); return P(c.lon + Math.sin(a) * rr / Math.max(.3, Math.cos(c.lat * D2R)), c.lat + Math.cos(a) * rr, R + lift); });
  craters.forEach(cr => loop(ring(cr, cr.r, .5, .03), rnd() < .5 ? 0xff4d4d : 0xf5a524, .34));                                 // crater rims
  const fronts = {}; POWERS.filter(p => p.r).forEach(p => { fronts[p.id] = loop(ring(p, p.r * 1.02, .16), p.color, p.nodata ? .25 : .9); });
  loop(ring(REPUBLIC, REPUBLIC.r * .62, .03), 0xd9e2ec, .8);                                                                 // Gran Mur: the wall inside the Republic's line
  // cracks running out from the Republic: the state coming apart
  { const p = []; for (let i = 0; i < 9; i++) { let a = rnd() * 6.2832, lon = REPUBLIC.lon, lat = REPUBLIC.lat, v = P(lon, lat, R + .05); for (let s = 0; s < 7; s++) { a += (rnd() - .5) * 1.1; lon += Math.sin(a) * 1.6; lat += Math.cos(a) * 1.4; const w = P(lon, lat, R + .05); p.push(v.x, v.y, v.z, w.x, w.y, w.z); v = w; } }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); globe.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xff4d4d, transparent: true, opacity: .7 }))); }

  /* the world past the jamming: old coastlines, the limit of the jamming, and the sea lanes it cut */
  LANDS.forEach(l => loop(l.poly.map(([lon, lat]) => P(lon, lat, R + .03)), 0x6f90b4, .5));
  ISLES.forEach(i => loop(ring(i, i.r, .35, .03), 0x6f90b4, .45));
  const segs = (pts, color, opacity) => { const l = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: true, opacity })); globe.add(l); return l; };
  const around = (c, rho, a, r = R) => { const cv = P(c.lon, c.lat, 1), e = new THREE.Vector3(0, 1, 0).cross(cv).normalize(), up = cv.clone().cross(e); return cv.multiplyScalar(Math.cos(rho)).addScaledVector(e, Math.sin(rho) * Math.sin(a)).addScaledVector(up, Math.sin(rho) * Math.cos(a)).multiplyScalar(r); };
  { const p = []; for (let i = 0; i < 240; i++) { if (i % 3 === 2) continue; const a = i / 240 * 6.2832, b = (i + 1) / 240 * 6.2832; p.push(around(JAM, jamRho(a), a, R + .05), around(JAM, jamRho(b), b, R + .05)); } segs(p, 0xf5a524, .55); }
  { const LANES = [[[40, 30], [78, 42]], [[36, 12], [90, 15]], [[11, -1], [8, -21]], [[-10, 2], [-16, -26]], [[-36, 34], [-88, 34]], [[-34, 24], [-86, 6]], [[-26, 52], [-104, 53]], [[22, 58], [100, 62]],
      [[150, 40], [180, 5]], [[-110, -28], [-150, -22]], [[40, -40], [112, -28]], [[130, 12], [120, -18]], [[-98, -24], [-60, -30]], [[-52, -38], [-18, -30]]];
    const cut = [], open = [], marks = [], ports = [], jam = P(JAM.lon, JAM.lat, 1), N = 56;
    const basis = v => { const e = new THREE.Vector3(0, 1, 0).cross(v).normalize(), u = v.clone().cross(e).normalize(); return [e, u]; };
    for (const [a, b] of LANES) { const va = P(a[0], a[1], 1), vb = P(b[0], b[1], 1), om = va.angleTo(vb), at = t => va.clone().multiplyScalar(Math.sin((1 - t) * om) / Math.sin(om)).addScaledVector(vb, Math.sin(t * om) / Math.sin(om));
      let crossed = va.angleTo(jam) > 46 * D2R;                                                                                 // lanes that start outside the jamming are simply unknown
      for (let i = 0; i < N; i++) { const u = at(i / N), w = at((i + 1) / N), inJam = u.angleTo(jam) < 46 * D2R;
        if (!crossed && !inJam) { crossed = true; const m = u.clone().multiplyScalar(R + .07), [e, n2] = basis(u), s = .22; marks.push(m.clone().addScaledVector(e, s).addScaledVector(n2, s), m.clone().addScaledVector(e, -s).addScaledVector(n2, -s), m.clone().addScaledVector(e, s).addScaledVector(n2, -s), m.clone().addScaledVector(e, -s).addScaledVector(n2, s)); }
        if (inJam ? i % 4 === 0 : i % 2 === 0) (inJam ? cut : open).push(u.multiplyScalar(R + .05), w.multiplyScalar(R + .05)); }
      const m = vb.clone().multiplyScalar(R + .07), [e, n2] = basis(vb), s = .2, d = [m.clone().addScaledVector(e, s), m.clone().addScaledVector(n2, s), m.clone().addScaledVector(e, -s), m.clone().addScaledVector(n2, -s)]; d.forEach((q, i) => ports.push(q, d[(i + 1) % 4])); }
    segs(open, 0x5f86b8, .6); segs(cut, 0xff4d4d, .5); segs(marks, 0xff4d4d, 1); segs(ports, 0x8fb4dc, .8); }

  /* Eintagsfliege: the jamming cloud that hangs over Legion ground */
  const cloud = new THREE.Group(); globe.add(cloud);
  { const p = []; while (p.length < 2600 * 3) { const lon = -40 + rnd() * 84, lat = -4 + rnd() * 70; if (!inside(lon, lat) || owner(lon, lat).id !== 'legion') continue; const v = P(lon, lat, R + .35 + rnd() * .5); p.push(v.x, v.y, v.z); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); cloud.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xb8c7dc, size: .045, transparent: true, opacity: .5, depthWrite: false }))); }

  /* contact: shell bursts along the fronts, ringing out and fading */
  const ringGeo = new THREE.BufferGeometry().setFromPoints(Array.from({ length: 40 }, (_, i) => new THREE.Vector3(Math.cos(i / 40 * 6.2832), Math.sin(i / 40 * 6.2832), 0)));
  const bursts = Array.from({ length: 14 }, () => { const m = new THREE.LineLoop(ringGeo, new THREE.LineBasicMaterial({ color: 0xff7a3d, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); m.userData = { t0: -rnd() * 4, life: 1.6 + rnd() * 1.8, size: .5 + rnd() * .9 }; globe.add(m); return m; });
  const respawn = (m, t) => { const p = power(rnd() < .45 ? 'republic' : rnd() < .7 ? 'federacy' : 'roagracia'), a = rnd() * 6.2832, lon = p.lon + Math.sin(a) * p.r / Math.cos(p.lat * D2R), lat = p.lat + Math.cos(a) * p.r; m.position.copy(P(lon, lat, R + .08)); m.lookAt(m.position.clone().multiplyScalar(2)); m.userData.t0 = t; };

  /* ── tags pinned to the globe ── */
  const pins = POWERS.map(p => { const b = add('button'); b.type = 'button'; b.className = 'tag'; b.style.color = css(p.color); b.style.opacity = 0; b.appendChild(document.createElement('span')).textContent = p.name.replace(/^(The |Republic of |Federal Republic of |United Kingdom of |Alliance of )/, '');
    if (p.nodata) { b.disabled = true; b.classList.add('note'); } else b.onclick = () => onSelect(p.id); return { p, el: b, v: P(p.lon, p.lat, R + .5) }; });
  const note = (text, v, color) => { const el = add('div'); el.className = 'tag note'; el.style.opacity = 0; if (color) el.style.color = color; el.textContent = text; pins.push({ el, v, min: .42 }); };
  note('Jamming limit', around(JAM, jamRho(4.4), 4.4, R + .3), 'var(--hostile)');

  /* ── selection ── */
  let focus = null, hold = false, placed = false, raf = 0;
  function select(id) {
    const p = power(id);
    pins.forEach(x => x.p && x.el.classList.toggle('sel', x.p.id === id));
    Object.entries(fronts).forEach(([k, l]) => { l.material.opacity = k === id ? 1 : power(k).nodata ? .25 : .5; });
    dotMat.uniforms.uFocus.value.copy(P(p.lon, p.lat, R));
    if (placed) focus = P(p.lon, Math.min(p.lat, 42), DIST);                       // turn the globe to it
    else { camera.position.copy(P(p.lon + 14, 30, DIST)); placed = true; }         // first view: no travel
  }
  const release = () => { focus = null; }; canvas.addEventListener('pointerdown', release);

  /* ── loop ── */
  const v = new THREE.Vector3(), n = new THREE.Vector3(), clock = new THREE.Clock();
  const fit = () => { const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); dotMat.uniforms.uSize.value = Math.min(devicePixelRatio, 2) * h / 520; };
  const ro = new ResizeObserver(fit); ro.observe(stage); fit();
  function frame() {
    raf = requestAnimationFrame(frame); const t = clock.getElapsedTime();
    if (focus) { camera.position.lerp(focus, .06).setLength(DIST); if (camera.position.distanceTo(focus) < .4) focus = null; }
    controls.update(); dotMat.uniforms.uTime.value = t; cloud.rotation.y = Math.sin(t * .05) * .06; cloud.children[0].material.opacity = .38 + Math.sin(t * 1.7) * .12;
    bursts.forEach(m => { const u = m.userData, k = (t - u.t0) / u.life; if (k > 1 || k < 0) return respawn(m, t + rnd() * 1.5); m.scale.setScalar(.05 + k * u.size); m.material.opacity = (1 - k) * .9; });
    renderer.render(scene, camera);
    const w = stage.clientWidth, h = stage.clientHeight; n.copy(camera.position).normalize();
    pins.forEach(({ el, v: p, min = .18 }) => { const facing = p.clone().normalize().dot(n); v.copy(p).project(camera); el.style.opacity = facing > min ? 1 : 0; el.style.pointerEvents = facing > min ? '' : 'none'; el.style.transform = `translate(${Math.max(8, Math.min((v.x + 1) / 2 * w + 10, w - el.offsetWidth - 8)).toFixed(1)}px,${((1 - v.y) / 2 * h - 12).toFixed(1)}px)`; });
  }
  frame();

  return {
    select,
    toggleHold() { hold = !hold; controls.autoRotate = !hold && !reduce; },
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); canvas.removeEventListener("pointerdown", release); controls.dispose();
      renderer.dispose(); renderer.forceContextLoss(); made.forEach(el => el.remove());
    },
  };
}
