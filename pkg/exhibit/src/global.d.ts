export {};

declare global {
  interface Window {
    runtime: any;
    __VFS__: any;
    require: (id: string) => any;
    module: { exports: any };
    exports: any;
  }
}
export interface VFSRuntimeType {
  customRequire: (id: string) => any;
  moduleRegistry: Record<string, any>;
}

export interface Window {
  runtime: VFSRuntimeType;
  __VFS__: VFSRuntimeType;
}
