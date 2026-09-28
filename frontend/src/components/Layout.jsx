import { useState } from "react";
import { Sidebar } from "./Sidebar.jsx";

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-paper">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        {typeof children === "function" ? children({ onMenuClick: () => setSidebarOpen(true) }) : children}
      </div>
    </div>
  );
};
