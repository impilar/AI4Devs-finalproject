import { Fragment, type ReactNode } from "react";

export function highlightText(text: string, query: string): ReactNode {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return text;
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = trimmedQuery.toLowerCase();
  const parts: ReactNode[] = [];
  let startIndex = 0;
  let matchIndex = lowerText.indexOf(lowerQuery, startIndex);

  while (matchIndex !== -1) {
    if (matchIndex > startIndex) {
      parts.push(text.slice(startIndex, matchIndex));
    }

    parts.push(
      <mark key={`${matchIndex}-${trimmedQuery}`} className="search-highlight">
        {text.slice(matchIndex, matchIndex + trimmedQuery.length)}
      </mark>,
    );

    startIndex = matchIndex + trimmedQuery.length;
    matchIndex = lowerText.indexOf(lowerQuery, startIndex);
  }

  if (startIndex < text.length) {
    parts.push(text.slice(startIndex));
  }

  return parts.length === 1 ? parts[0] : <Fragment>{parts}</Fragment>;
}
