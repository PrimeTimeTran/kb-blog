export function AppShell({ top, children }) {
  return (
    <div className="h-screen flex flex-col">
      {/* Scroll container */}
      <div id="scroll-container" className="flex-1 min-h-0 overflow-y-auto relative">
        <AppNavbar />
        <Top />
        {children}
      </div>
    </div>
  );
}

export function AppNavbar() {
  return <div className="sticky top-0 z-10 h-16 bg-white border-b">Navbar</div>;
}

export function Top() {
  return (
    <div className="sticky top-0 z-20">
      <div className="h-32 bg-white border-b shadow-md">
        <div className="h-16 border-b">Navbar Replacement</div>
        <div className="h-16">Sub-nav</div>
      </div>
    </div>
  );
}

export default AppShell;
