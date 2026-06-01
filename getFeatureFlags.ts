export function getFeatureFlags() {
  const isMegaMenuOn = true;

  return {
    isMegaMenuOn,
    megaMenu: {
      isOn: isMegaMenuOn,
      state: isMegaMenuOn ? { mounted: false, activeIdx: null } : { mounted: false, activeIdx: null },
      isBriefFocus: false,
    },
    isSceneTickOn: false,
    isCameraTickOn: false,
    sceneTickDuration: 3000,
    cameraTickDuration: 3000,
  };
}
