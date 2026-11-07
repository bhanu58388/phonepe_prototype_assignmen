// PhonePe SoundBox and payment chime audio synthesizer

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays the signature PhonePe cheerful success chime (harmonic chords)
 */
export function playPhonePeChime(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Two pleasant ascending notes: C6 (1046.5Hz) -> E6 (1318.5Hz) -> G6 (1567.9Hz)
    const notes = [
      { freq: 1046.5, time: 0, duration: 0.12 },
      { freq: 1318.5, time: 0.1, duration: 0.14 },
      { freq: 1567.9, time: 0.22, duration: 0.35 },
    ];

    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now + note.time);

      gain.gain.setValueAtTime(0.001, now + note.time);
      gain.gain.exponentialRampToValueAtTime(0.3, now + note.time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + note.time);
      osc.stop(now + note.time + note.duration);
    });
  } catch (e) {
    console.warn('AudioContext chime failed:', e);
  }
}

/**
 * Plays the iconic PhonePe SmartSpeaker / Soundbox voice announcement
 */
export function speakSoundbox(amount: number, language: 'hi' | 'en' = 'hi'): void {
  // Always trigger chime first
  playPhonePeChime();

  if (!('speechSynthesis' in window)) return;

  setTimeout(() => {
    try {
      window.speechSynthesis.cancel(); // Clear any ongoing speech
      
      const text =
        language === 'hi'
          ? `PhonePe par ${amount} rupaye prapt hue!`
          : `Payment of rupees ${amount} received on PhonePe!`;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.05;
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      // Pick an Indian accent voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(
        (v) =>
          (language === 'hi' && (v.lang.includes('hi') || v.name.includes('Hindi'))) ||
          (language === 'en' && (v.lang.includes('IN') || v.name.includes('India')))
      );
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  }, 450);
}
