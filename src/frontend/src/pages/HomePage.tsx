import { useEffect, useMemo, useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { useSearch } from "../hooks/useSearch";
import { useHomeShell } from "../context/HomeShellContext";
import { NoteList } from "../components/notes/NoteList";
import { SearchBar } from "../components/search/SearchBar";
import { TagFilter } from "../components/tags/TagFilter";
import { formatGreeting, formatLongDate } from "../utils/formatGreeting";
import { formatRelativeDate } from "../utils/formatDate";

export function HomePage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { setSlots, clearSlots } = useHomeShell();
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
  const totalNotes = isSearchActive ? results.length : notes.length;

  const lastUpdated = useMemo(() => {
    if (notes.length === 0) {
      return null;
    }

    const latest = notes.reduce((current, note) =>
      new Date(note.updatedAt) > new Date(current.updatedAt) ? note : current,
    );

    return latest.updatedAt;
  }, [notes]);

  useEffect(() => {
    setSlots({
      search: null,
      sidebar: (
        <TagFilter
          tags={tags}
          activeTag={activeTag}
          onSelect={handleTagSelect}
          onClear={handleTagClear}
          layout="sidebar"
        />
      ),
      noteCount: totalNotes,
      notes: isSearchActive ? results : notes,
      tags,
    });
  }, [
    activeTag,
    tags,
    totalNotes,
    setSlots,
    notes,
    results,
    isSearchActive,
  ]);

  useEffect(() => {
    return () => {
      clearSlots();
    };
  }, [clearSlots]);

  const sectionTitle = activeTag ? `Notas · ${activeTag}` : "Todas las notas";
  const greeting = formatGreeting();
  const todayLabel = formatLongDate();

  return (
    <section className="home-page">
      <header className="home-dashboard__header">
        <div>
          <p className="home-dashboard__date">{todayLabel}</p>
          <h2 className="home-dashboard__greeting">{greeting}</h2>
          <p className="home-dashboard__tagline">
            Tu conocimiento organizado y siempre accesible.
          </p>
        </div>
      </header>

      <div className="home-dashboard__search">
        <SearchBar
          value={query}
          onChange={handleSearchChange}
          order={order}
          onOrderChange={setOrder}
          showOrderSelect={showOrderSelect}
          variant="spotlight"
        />
      </div>

      {!isSearchActive ? (
        <div className="home-dashboard__kpis">
          <article className="kpi-card">
            <p className="kpi-card__value">{notes.length}</p>
            <p className="kpi-card__label">Total notas</p>
          </article>
          <article className="kpi-card">
            <p className="kpi-card__value">{tags.length}</p>
            <p className="kpi-card__label">Etiquetas</p>
          </article>
          <article className="kpi-card">
            <p className="kpi-card__value">
              {lastUpdated ? formatRelativeDate(lastUpdated) : "—"}
            </p>
            <p className="kpi-card__label">Última actualización</p>
          </article>
        </div>
      ) : null}

      <div id="home-notes" className="home-page__notes-section">
        <header className="home-page__header">
          <h2 className="home-page__title">{sectionTitle}</h2>
          <p className="home-page__subtitle">
            {displayNotes.length} nota{displayNotes.length === 1 ? "" : "s"}
            {isSearchActive ? ` · búsqueda «${trimmedQuery}»` : ""}
          </p>
        </header>

        <NoteList
          notes={displayNotes}
          isLoading={displayLoading}
          error={displayError}
          activeTag={isSearchActive ? null : activeTag}
          searchQuery={isSearchActive ? debouncedQuery : null}
        />
      </div>
    </section>
  );
}
