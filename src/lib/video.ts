/** Videos start at roughly one bar of volume. The viewer can raise it from the
 *  native controls; we only set the initial level, never fight them afterwards. */
export const DEFAULT_VOLUME = 0.1;

/**
 * Attach to a <video> as `onLoadedMetadata`. Sets the opening volume once and
 * then steps aside, so any manual change the viewer makes is respected.
 */
export function setQuietStart(el: HTMLVideoElement | null) {
  if (!el || el.dataset.volumeInitialised === "true") return;
  el.volume = DEFAULT_VOLUME;
  el.dataset.volumeInitialised = "true";
}
