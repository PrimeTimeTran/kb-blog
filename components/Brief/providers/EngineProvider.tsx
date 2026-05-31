import React, { useContext, useState } from 'react';

type EngineState = {
  isSceneTickOn: boolean;
  isCameraTickOn: boolean;
  isCameraBypassed: boolean;

  set: (patch: Partial<EngineState>) => void;
};

export const EngineContext = React.createContext<EngineState | null>(null);

export function EngineProvider({ children }) {
  const [state, setState] = useState({
    isSceneTickOn: true,
    isCameraTickOn: false,
    isCameraBypassed: true,
  });

  const value = {
    ...state,
    set: (patch) => setState((s) => ({ ...s, ...patch })),
  };

  return <EngineContext.Provider value={value}>{children}</EngineContext.Provider>;
}
