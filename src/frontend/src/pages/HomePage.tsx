import { useState } from "react";
import { Link } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import { useSearch } from "../hooks/useSearch";
import { NoteList } from "../components/notes/NoteList";
import { SearchBar } from "../components/search/SearchBar";
import { TagFilter } from "../components/tags/TagFilter";

export function HomePage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const {
    query,
    setQuery,
    debouncedQuery,
    order,
    setOrder,
    results,
    isSearching,
    error: searchError,
  } = useSearch();
  const trimmedQuery = query.trim();
  const isSearchActive = trimmedQuery.length > 0;
  const showOrderSelect = isSearchActive && (isSearching || debouncedQuery.length > 0);
  const { notes, tags, isLoading, error: notesError } = useNotes({
    etiqueta: isSearchActive ? null : activeTag,
  });

  function handleSearchChange(value: string): void {
    setQuery(value);

    if (value.trim().length > 0 && activeTag) {
      setActiveTag(null);
    }
  }

  function handleTagSelect(tag: string): void {
    setActiveTag(tag);
    setQuery("");
  }

  function handleTagClear(): void {
    setActiveTag(null);
  }

  const displayNotes = isSearchActive ? results : notes;
  const displayLoading =
    isSearchActive ? isSearching || trimmedQuery !== debouncedQuery : isLoading;
  const displayError = isSearchActive ? searchError : notesError;

  return (
    <section className="home-page">
      <header className="home-page__header">
        <div className="home-page__header-row">
          <div>
            <h1>Organizador de Conocimiento</h1>
            <p className="home-page__subtitle">Tus notas</p>
          </div>
          <Link to="/notas/nueva" className="home-page__new-note">
            Nueva nota
          </Link>
        </div>
      </header>
      <SearchBar
        value={query}
        onChange={handleSearchChange}
        order={order}
        onOrderChange={setOrder}
        showOrderSelect={showOrderSelect}
      />
      <TagFilter
        tags={tags}
        activeTag={activeTag}
        onSelect={handleTagSelect}
        onClear={handleTagClear}
      />
      <NoteList
        notes={displayNotes}
        isLoading={displayLoading}
        error={displayError}
        activeTag={isSearchActive ? null : activeTag}
        searchQuery={isSearchActive ? debouncedQuery : null}
      />
    </section>
  );
}
