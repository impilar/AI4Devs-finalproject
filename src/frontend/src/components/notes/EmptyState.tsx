import { Link } from "react-router-dom";

type EmptyStateProps = {
  message: string;
  ctaLabel?: string;
  ctaTo?: string;
};

export function EmptyState({ message, ctaLabel, ctaTo }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="48" height="48" role="presentation">
          <rect x="8" y="6" width="32" height="36" rx="4" fill="var(--color-accent-soft)" />
          <rect x="14" y="14" width="20" height="2" rx="1" fill="var(--color-accent)" />
          <rect x="14" y="20" width="16" height="2" rx="1" fill="var(--color-accent)" opacity="0.6" />
          <rect x="14" y="26" width="18" height="2" rx="1" fill="var(--color-accent)" opacity="0.4" />
        </svg>
      </div>
      <p className="empty-state__message">{message}</p>
      {ctaLabel && ctaTo ? (
        <Link to={ctaTo} className="empty-state__cta">
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
