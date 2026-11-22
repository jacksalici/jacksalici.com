import { bind, play, setEnabled, setVolume, sounds } from "cuelume";

export { play, setEnabled, setVolume, sounds };

const STORAGE_KEY = "sound-enabled";

// cuelume itself doesn't persist the on/off preference (see setEnabled docs),
// so this is the one place that owns doing so, via localStorage. Sound is
// off by default: it plays only after the visitor explicitly turns it on.
export function isSoundEnabled() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function setSoundEnabled(enabled: boolean) {
  localStorage.setItem(STORAGE_KEY, String(enabled));
  setEnabled(enabled);
}

export function initSounds() {
  bind();
  setEnabled(isSoundEnabled());
}
