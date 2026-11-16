import characters from "./characters";

// The roster as the console reads it. The Handler commands from behind the wall and has no machine;
// Shin fights with blades, everyone else with guns.
export const roster = characters.map((c) => ({
  ...c,
  kia: c.status.startsWith("KIA"),
  machine: c.id === "lena" ? null : c.id === "shin" ? "blades" : "guns",
}));
export const synced = roster.filter((r) => !r.kia);
export const lost = roster.filter((r) => r.kia);
export const order = [...synced, ...lost];

// Step through the roster in list order, wrapping at the ends.
export const neighbour = (id, step) => {
  const i = order.findIndex((r) => r.id === id);
  return order[(i + step + order.length) % order.length].id;
};
