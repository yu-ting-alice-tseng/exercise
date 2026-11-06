/** 用瀏覽器內建語音念法文 */
export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speakFr(text: string, onEnd?: () => void, rate = 0.9): void {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "fr-FR";
  u.rate = rate;
  const fr = synth.getVoices().find((v) => v.lang === "fr-FR") ?? synth.getVoices().find((v) => v.lang.startsWith("fr"));
  if (fr) u.voice = fr;
  if (onEnd) {
    u.onend = onEnd;
    u.onerror = onEnd;
  }
  synth.speak(u);
}

export function stopSpeaking(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
}
