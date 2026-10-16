/*
  Soft synthesized open/exit cues for the preloader.
  Light = bright airy chime. Dark = deeper night pad.
  No audio assets — Web Audio only. Browsers may block until a user gesture;
  unlockAudio() arms the context on the first pointer/key event.
*/

let ctx = null;
let unlocked = false;

const getCtx = () => {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  return ctx;
};

export const unlockAudio = async () => {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") {
    try {
      await audio.resume();
    } catch {
      return;
    }
  }
  unlocked = audio.state === "running";
};

const tone = (audio, { freq, type = "sine", start, dur, gain = 0.08, attack = 0.02, release = 0.35 }) => {
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur + release);
  osc.connect(g);
  g.connect(audio.destination);
  osc.start(start);
  osc.stop(start + dur + release + 0.05);
};

const whoosh = (audio, { start, high = true }) => {
  const dur = 0.55;
  const bufferSize = audio.sampleRate * dur;
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) data[i] = Math.random() * 2 - 1;

  const src = audio.createBufferSource();
  src.buffer = buffer;
  const filter = audio.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(high ? 900 : 280, start);
  filter.frequency.exponentialRampToValueAtTime(high ? 2400 : 900, start + dur);
  filter.Q.value = 0.7;

  const g = audio.createGain();
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(high ? 0.045 : 0.055, start + 0.08);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);

  src.connect(filter);
  filter.connect(g);
  g.connect(audio.destination);
  src.start(start);
  src.stop(start + dur + 0.02);
};

const playLightOpen = (audio, t0) => {
  whoosh(audio, { start: t0, high: true });
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    tone(audio, {
      freq,
      type: "triangle",
      start: t0 + 0.12 + i * 0.11,
      dur: 0.18,
      gain: 0.07 - i * 0.008,
      attack: 0.01,
      release: 0.55,
    });
  });
};

const playDarkOpen = (audio, t0) => {
  whoosh(audio, { start: t0, high: false });
  tone(audio, {
    freq: 110,
    type: "sine",
    start: t0,
    dur: 0.9,
    gain: 0.07,
    attack: 0.2,
    release: 0.8,
  });
  const notes = [220, 261.63, 329.63, 440];
  notes.forEach((freq, i) => {
    tone(audio, {
      freq,
      type: "sine",
      start: t0 + 0.18 + i * 0.14,
      dur: 0.28,
      gain: 0.055 - i * 0.006,
      attack: 0.04,
      release: 0.7,
    });
  });
};

const playLightExit = (audio, t0) => {
  tone(audio, { freq: 784, type: "triangle", start: t0, dur: 0.12, gain: 0.05, release: 0.4 });
  tone(audio, { freq: 1175, type: "triangle", start: t0 + 0.08, dur: 0.18, gain: 0.04, release: 0.5 });
};

const playDarkExit = (audio, t0) => {
  tone(audio, { freq: 196, type: "sine", start: t0, dur: 0.2, gain: 0.05, release: 0.5 });
  tone(audio, { freq: 294, type: "sine", start: t0 + 0.1, dur: 0.25, gain: 0.04, release: 0.55 });
};

const currentTheme = () =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

export const playPreloaderOpen = async (theme = currentTheme()) => {
  await unlockAudio();
  const audio = getCtx();
  if (!audio || !unlocked) return false;
  const t0 = audio.currentTime + 0.02;
  if (theme === "dark") playDarkOpen(audio, t0);
  else playLightOpen(audio, t0);
  return true;
};

export const playPreloaderExit = async (theme = currentTheme()) => {
  await unlockAudio();
  const audio = getCtx();
  if (!audio || !unlocked) return false;
  const t0 = audio.currentTime + 0.01;
  if (theme === "dark") playDarkExit(audio, t0);
  else playLightExit(audio, t0);
  return true;
};

/* Arm unlock on the first gesture so later preloader cues can play freely. */
export const armAudioUnlock = () => {
  if (typeof window === "undefined") return () => {};
  const unlock = () => {
    unlockAudio();
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
  return () => {
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
};
