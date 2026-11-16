/* Helpers every scene shares, mostly to keep the 3D usable on phones. */
export const isSmall = () => matchMedia("(max-width: 980px)").matches;

// Sharp on desktop, lighter on phones where the GPU budget is smaller.
export const pixelRatio = () => Math.min(devicePixelRatio, isSmall() ? 1.5 : 2);

// OrbitControls claims every touch on its canvas. Give vertical swipes back to the page so a visitor can
// scroll past the view; a sideways drag still turns it.
export const allowPageScroll = controls => { controls.domElement.style.touchAction = "pan-y"; };

// Whether an element is on screen, so a scene can stop drawing once it has been scrolled away.
export function watchVisible(el) {
  let on = true;
  const io = new IntersectionObserver(([entry]) => { on = entry.isIntersecting; });
  io.observe(el);
  return { get on() { return on; }, stop: () => io.disconnect() };
}
