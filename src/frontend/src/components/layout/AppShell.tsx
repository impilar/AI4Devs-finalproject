import { Link, useLocation } from "react-router-dom";
import { useState, type ReactNode } from "react";
import { AppLogo } from "./AppLogo";
import { RightContextPanel } from "./RightContextPanel";
import { SidebarNav } from "./SidebarNav";
import { useHomeShell } from "../../context/HomeShellContext";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const showRightPanel = isHome;
  const { slots } = useHomeShell();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function closeSidebar(): void {
    setSidebarOpen(false);
  }

  return (
    <div className="app-shell">
      <div className="app-shell__ambient" aria-hidden="true">
        <div className="app-shell__glow app-shell__glow--blue" />
        <div className="app-shell__glow app-shell__glow--violet" />
        <div className="app-shell__glow app-shell__glow--teal" />
      </div>

      {sidebarOpen ? (
        <button
          type="button"
          className="app-shell__sidebar-backdrop"
          aria-label="Cerrar menú"
          onClick={closeSidebar}
        />
      ) : null}

      <aside
        id="app-sidebar"
        className={`app-shell__sidebar glass-panel${sidebarOpen ? " app-shell__sidebar--open" : ""}`}
      >
        <div className="app-shell__sidebar-top">
          <AppLogo />
          <Link to="/notas/nueva" className="app-shell__new-note" onClick={closeSidebar}>
            Nueva nota
          </Link>
          <SidebarNav onNavigate={closeSidebar} />
        </div>

        {isHome && slots.sidebar ? (
          <div className="app-shell__sidebar-tags">{slots.sidebar}</div>
        ) : null}

        {isHome && slots.noteCount !== null ? (
          <p className="app-shell__note-count">{slots.noteCount} notas</p>
        ) : null}
      </aside>

      <div className="app-shell__body">
        {isHome ? (
          <button
            type="button"
            className="app-shell__menu-toggle"
            aria-expanded={sidebarOpen}
            aria-controls="app-sidebar"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            Menú
          </button>
        ) : null}

        <main className="app-shell__main">{children}</main>

        {showRightPanel ? (
          <RightContextPanel notes={slots.notes} tags={slots.tags} />
        ) : null}
      </div>
    </div>
  );
}
