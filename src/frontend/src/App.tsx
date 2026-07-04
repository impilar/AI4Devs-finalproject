export default function App() {
  const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1";

  return (
    <main className="app">
      <h1>Organizador de Conocimiento</h1>
      <p>MVP bootstrap — frontend shell (PHASE-000)</p>
      <p className="api-hint">API: {apiUrl}</p>
    </main>
  );
}
