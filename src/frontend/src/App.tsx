import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NoteDetailPage } from "./pages/NoteDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <main className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notas/:id" element={<NoteDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
