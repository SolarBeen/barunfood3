export function shouldShowHeroVideo(preferReducedMotion: boolean, saveData: boolean | undefined) {
  return !preferReducedMotion && !saveData;
}
