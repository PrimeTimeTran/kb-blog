export function AppShell({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <div id="scroll-container" className="flex-1 overflow-y-auto">
        <AppNavbar />
        <div className="sticky top-0 z-20">
          <Top />
        </div>
        {children}
      </div>
    </div>
  );
}

export function AppNavbar() {
  return <div className="h-16 bg-white border-b">Navbar</div>;
}

export function Top() {
  return (
    <div className="h-32 bg-white border-b shadow-md sticky">
      <div className="h-16 border-b">Navbar Push</div>
      <div className="h-16">Sub-nav</div>
    </div>
  );
}
export default AppShell;
