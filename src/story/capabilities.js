// What this device/browser can reasonably run. Evaluated once on the client.

export const osPrefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const saveData = () => typeof navigator !== 'undefined' && navigator.connection?.saveData === true;

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
};

/**
 * 'high' = full 3D scene (desktop)
 * 'low'  = lighter scene (capable phones/tablets)
 * 'off'  = static gradient + video poster (reduced motion, data saver, weak devices, no WebGL)
 */
export function graphicsTier(reduceMotion) {
  if (reduceMotion || saveData() || !hasWebGL()) return 'off';
  const cores = navigator.hardwareConcurrency ?? 8;
  const mem = navigator.deviceMemory; // undefined on some browsers
  const touch = window.matchMedia('(pointer: coarse)').matches;
  if (touch) return cores >= 6 && (mem === undefined || mem >= 4) ? 'low' : 'off';
  if (cores < 4 || (mem !== undefined && mem < 4)) return 'off';
  return 'high';
}

export const canPlayVideo = (reduceMotion) => !reduceMotion && !saveData();
