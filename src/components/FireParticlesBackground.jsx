import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// ── 1. Move options OUTSIDE the component to prevent canvas re-initialization lag ──
const particleOptions = {
  fpsLimit: 60,
  particles: {
    color: {
      value: ["#ff0000", "#ff4400", "#ffaa00"], // Red, Orange, Gold embers
    },
    move: {
      direction: "top", // Embers drift UP
      enable: true,
      random: true,
      speed: { min: 0.5, max: 2 },
      straight: false,
    },
    number: {
      value: 80, // Slightly tuned down for a clean, premium look in a smaller container
      density: {
        enable: true,
        area: 800,
      },
    },
    opacity: {
      value: { min: 0.2, max: 0.7 },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    shadow: {
      enable: true,
      color: "#ff4400",
      blur: 8,
    },
  },
};

function FireParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none z-0 overflow-hidden select-none">
      {/* The actual particle canvas restricted to this box */}
      <Particles
        id="tsparticles"
        className="w-full h-full"
        init={particlesInit}
        options={particleOptions}
      />

      {/* ── 2. Gradient Overlay Mask ── */}
      {/* Smoothly dissolves the canvas boundaries and dims the sparks as they float up */}
      <div className="absolute inset-0 bg-linear-to-t from-transparent via-black/20 to-black pointer-events-none" />
    </div>
  );
}

export default FireParticlesBackground;
