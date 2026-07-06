import { type KeyboardEvent, useState } from "react";
import { getTagColor } from "../../utils/getTagColor";

type TagInputProps = {
  id?: string;
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
};

export function TagInput({
  id = "note-tags",
  label = "Etiquetas (opcional)",
  value,
  onChange,
  suggestions = [],
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const trimmedInput = inputValue.trim();
  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      trimmedInput.length > 0 &&
      suggestion.toLowerCase().startsWith(trimmedInput.toLowerCase()) &&
      !value.includes(suggestion),
  );

  function addTag(raw: string): void {
    const name = raw.trim().replace(/,$/, "");

    if (!name || value.includes(name)) {
      return;
    }

    onChange([...value, name]);
    setInputValue("");
    setShowSuggestions(false);
  }

  function removeTag(name: string): void {
    onChange(value.filter((tag) => tag !== name));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(inputValue);
      return;
    }

    if (event.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value[value.length - 1] ?? "");
    }
  }

  return (
    <div className="tag-input">
      <label htmlFor={`${id}-input`}>{label}</label>

      <div className="tag-input__control">
        {value.map((tag) => {
          const color = getTagColor(tag);

          return (
            <span
              key={tag}
              className="tag-input__chip"
              style={{
                background: `${color}18`,
                color,
                borderColor: `${color}28`,
              }}
            >
              {tag}
              <button
                type="button"
                className="tag-input__chip-remove"
                onClick={() => removeTag(tag)}
                aria-label={`Eliminar etiqueta ${tag}`}
              >
                ×
              </button>
            </span>
          );
        })}

        <input
          id={`${id}-input`}
          className="tag-input__text"
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            window.setTimeout(() => setShowSuggestions(false), 150);
          }}
          placeholder={value.length === 0 ? "Escribe y pulsa Enter" : "Añadir otra"}
          aria-autocomplete="list"
          aria-controls={showSuggestions ? `${id}-suggestions` : undefined}
        />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 ? (
        <ul
          id={`${id}-suggestions`}
          className="tag-input__suggestions"
          role="listbox"
          aria-label="Sugerencias de etiquetas"
        >
          {filteredSuggestions.map((suggestion) => (
            <li key={suggestion} role="option">
              <button
                type="button"
                className="tag-input__suggestion"
                onMouseDown={(event) => {
                  event.preventDefault();
                  addTag(suggestion);
                }}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
