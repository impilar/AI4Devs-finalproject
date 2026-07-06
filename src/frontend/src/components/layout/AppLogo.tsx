export function AppLogo() {
  return (
    <div className="app-logo">
      <div className="app-logo__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path
            d="M12 3C8.5 3 6 5.5 6 9c0 2.2 1.2 4.1 3 5.2V19a1 1 0 001 1h4a1 1 0 001-1v-4.8c1.8-1.1 3-3 3-5.2 0-3.5-2.5-6-6-6z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="app-logo__text">
        <h1 className="app-logo__title">Organizador de Conocimiento</h1>
        <span className="app-logo__subtitle">Tu segundo cerebro</span>
      </div>
    </div>
  );
}
