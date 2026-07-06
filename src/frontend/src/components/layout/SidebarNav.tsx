import { Link, useLocation } from "react-router-dom";

type SidebarNavProps = {
  onNavigate?: () => void;
};

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  function handleNotesClick(): void {
    if (isHome) {
      document.getElementById("home-notes")?.scrollIntoView({ behavior: "smooth" });
    }
    onNavigate?.();
  }

  return (
    <nav className="sidebar-nav" aria-label="Navegación principal">
      <ul className="sidebar-nav__list">
        <li>
          <Link
            to="/"
            className={`sidebar-nav__item${isHome ? " sidebar-nav__item--active" : ""}`}
            onClick={onNavigate}
            aria-current={isHome ? "page" : undefined}
          >
            Inicio
          </Link>
        </li>
        <li>
          {isHome ? (
            <button type="button" className="sidebar-nav__item" onClick={handleNotesClick}>
              Todas las notas
            </button>
          ) : (
            <Link to="/" className="sidebar-nav__item" onClick={onNavigate}>
              Todas las notas
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
