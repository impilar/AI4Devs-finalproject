export function SkeletonNoteList({ count = 4 }: { count?: number }) {
  return (
    <div className="skeleton-note-list" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-note-list__card">
          <div className="skeleton-note-list__line skeleton-note-list__line--title" />
          <div className="skeleton-note-list__line skeleton-note-list__line--excerpt" />
          <div className="skeleton-note-list__line skeleton-note-list__line--excerpt-short" />
          <div className="skeleton-note-list__footer">
            <div className="skeleton-note-list__pill" />
            <div className="skeleton-note-list__date" />
          </div>
        </div>
      ))}
    </div>
  );
}
