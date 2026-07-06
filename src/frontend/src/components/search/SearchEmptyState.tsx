type SearchEmptyStateProps = {
  searchTerm: string;
};

export function SearchEmptyState({ searchTerm }: SearchEmptyStateProps) {
  return (
    <div className="search-empty-state" role="status" aria-live="polite">
      <p className="search-empty-state__message">Sin resultados para {searchTerm}</p>
    </div>
  );
}
