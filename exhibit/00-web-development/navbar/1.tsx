export function AppShell({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <AppNavbar />
        <Top />
        {children}
      </div>
    </div>
  );
}

export function AppNavbar() {
  return <div className="sticky top-0 z-50 h-16 bg-white border-b">Navbar</div>;
}

export function Top() {
  return (
    <div className="sticky top-0">
      <div className="w-full h-32 bg-white border-b shadow-md">
        <div className="h-16 flex items-center px-6 border-b">Design System Nav</div>
        <div className="h-16 flex items-center px-6">Sub-nav</div>
      </div>
    </div>
  );
}

export default AppShell;
