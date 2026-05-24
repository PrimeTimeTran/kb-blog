import { useEffect, useLayoutEffect, useRef } from 'react';

export function WorkspaceShell({ viewport, workspace, children }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   setScrollRoot(window.__workspaceScrollRef?.current ?? window);
  // }, []);
  // 👇 expose globally (simple version)
  useEffect(() => {
    window.__workspaceScrollRef = scrollRef;
  }, []);
  useLayoutEffect(() => {
    if (viewport.activeId !== workspace.id) return;

    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const el = scrollRef.current?.querySelector(`#${hash}`);
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [viewport.activeId, workspace.id]);

  return (
    <div ref={scrollRef} className="h-full w-full overflow-y-auto bg-background">
      {children}
    </div>
  );
}

export function WorkspaceHero({ title, description }: { title: string; description: string }) {
  return (
    <div className=" rounded-3xl bg-surface p-8 text-on-surface shadow-sm border border-surface-container">
      <h1 className="text-4xl tracking-tight font-semibold text-on-surface">{title}</h1>

      <p className="mt-3 max-w-2xl text-on-surface/70">{description}</p>
    </div>
  );
}
export function ScrollableWorkspaceContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-y-auto bg-background text-on-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">{children}</div>
    </div>
  );
}
export function LargeScrollableSection() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl bg-surface-container p-6 text-on-surface border border-surface-container"
        >
          <div className="text-lg font-semibold text-on-surface">Demo Block {index + 1}</div>
          <p className="mt-2 text-on-surface/70">Independent scrollable workspace content.</p>
        </div>
      ))}
    </div>
  );
}
