import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NoteCreatePage } from "./pages/NoteCreatePage";
import { NoteDetailPage } from "./pages/NoteDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <main className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notas/nueva" element={<NoteCreatePage />} />
          <Route path="/notas/:id" element={<NoteDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
