import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "../common/ErrorMessage";
import { ApiError, ValidationApiError } from "../../services/apiClient";
import { createNota } from "../../services/notesApi";

type NoteFormProps = {
  mode: "create";
};

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function sanitizeLinks(values: string[]): string[] {
  return values.map((value) => value.trim()).filter((value) => value.length > 0);
}

export function NoteForm({ mode }: NoteFormProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function clearLinkFieldError(index: number): void {
    const key = `links.${index}`;
    setFieldErrors((current) => {
      if (!current[key]) {
        return current;
      }

      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function addLinkRow(): void {
    setLinks((current) => [...current, ""]);
  }

  function removeLinkRow(index: number): void {
    setLinks((current) => current.filter((_, rowIndex) => rowIndex !== index));
    setFieldErrors((current) => {
      const next: Record<string, string> = {};

      for (const [field, message] of Object.entries(current)) {
        if (!field.startsWith("links.")) {
          next[field] = message;
        }
      }

      return next;
    });
  }

  function updateLink(index: number, value: string): void {
    setLinks((current) =>
      current.map((link, rowIndex) => (rowIndex === index ? value : link)),
    );
    clearLinkFieldError(index);
  }

  function validateClient(): boolean {
    const errors: Record<string, string> = {};

    if (!title.trim()) {
      errors.title = "El título es obligatorio";
    }

    if (!content.trim()) {
      errors.content = "El contenido es obligatorio";
    }

    links.forEach((link, index) => {
      const trimmed = link.trim();

      if (trimmed && !isValidUrl(trimmed)) {
        errors[`links.${index}`] = "La URL no es válida";
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setSubmitError(null);

    if (!validateClient()) {
      return;
    }

    setIsSaving(true);

    try {
      await createNota({
        title: title.trim(),
        content: content.trim(),
        links: sanitizeLinks(links),
      });

      if (mode === "create") {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof ValidationApiError) {
        setFieldErrors(error.fieldErrors);
      } else if (error instanceof ApiError) {
        setSubmitError(error.message);
      } else {
        setSubmitError("No se pudo guardar la nota");
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="note-form" onSubmit={handleSubmit} noValidate>
      <div className="note-form__field">
        <label htmlFor="note-title">Título</label>
        <input
          id="note-title"
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          aria-invalid={Boolean(fieldErrors.title)}
          aria-describedby={fieldErrors.title ? "note-title-error" : undefined}
        />
        {fieldErrors.title ? (
          <p id="note-title-error" className="note-form__field-error" role="alert">
            {fieldErrors.title}
          </p>
        ) : null}
      </div>

      <div className="note-form__field">
        <label htmlFor="note-content">Contenido</label>
        <textarea
          id="note-content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={8}
          required
          aria-invalid={Boolean(fieldErrors.content)}
          aria-describedby={fieldErrors.content ? "note-content-error" : undefined}
        />
        {fieldErrors.content ? (
          <p id="note-content-error" className="note-form__field-error" role="alert">
            {fieldErrors.content}
          </p>
        ) : null}
      </div>

      <fieldset className="note-form__links">
        <legend className="note-form__links-legend">Enlaces (opcional)</legend>

        {links.map((link, index) => (
          <div key={`link-${index}`} className="note-form__link-row">
            <div className="note-form__link-input">
              <label htmlFor={`note-link-${index}`} className="note-form__link-label">
                Enlace {index + 1}
              </label>
              <input
                id={`note-link-${index}`}
                name={`links.${index}`}
                type="url"
                value={link}
                onChange={(event) => updateLink(index, event.target.value)}
                placeholder="https://example.com"
                aria-invalid={Boolean(fieldErrors[`links.${index}`])}
                aria-describedby={
                  fieldErrors[`links.${index}`] ? `note-link-${index}-error` : undefined
                }
              />
              {fieldErrors[`links.${index}`] ? (
                <p
                  id={`note-link-${index}-error`}
                  className="note-form__field-error"
                  role="alert"
                >
                  {fieldErrors[`links.${index}`]}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              className="note-form__link-remove"
              onClick={() => removeLinkRow(index)}
              aria-label={`Eliminar enlace ${index + 1}`}
            >
              ×
            </button>
          </div>
        ))}

        <button type="button" className="note-form__link-add" onClick={addLinkRow}>
          Añadir enlace
        </button>
      </fieldset>

      {submitError ? <ErrorMessage message={submitError} /> : null}

      <div className="note-form__actions">
        <button type="submit" className="note-form__submit" disabled={isSaving}>
          {isSaving ? "Guardando…" : "Guardar"}
        </button>
        <Link to="/" className="note-form__cancel">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
