export function getFeatureFlags() {
  const isMegaMenuOn = true;
  const isDev = process.env.NODE_ENV === 'development';
  return {
    isDev,
    isMegaMenuOn,
    megaMenu: {
      isOn: isMegaMenuOn,
      state: isMegaMenuOn ? { mounted: false, activeIdx: null } : { mounted: true, activeIdx: 0 },
      isBriefFocus: false,
    },
    isSceneTickOn: false,
    isCameraTickOn: false,
    sceneTickDuration: 3000,
    cameraTickDuration: 3000,
  };
}
