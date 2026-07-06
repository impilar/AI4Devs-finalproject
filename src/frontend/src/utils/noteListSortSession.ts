export type NoteListSort = "created_at" | "title";
export type NoteListOrder = "asc" | "desc";

export type NoteListSortState = {
  sort: NoteListSort;
  order: NoteListOrder;
};

export type NoteListSortPreset =
  | "created_at_desc"
  | "created_at_asc"
  | "title_asc"
  | "title_desc";

const STORAGE_KEY = "okc.noteListSort";

const PRESET_MAP: Record<NoteListSortPreset, NoteListSortState> = {
  created_at_desc: { sort: "created_at", order: "desc" },
  created_at_asc: { sort: "created_at", order: "asc" },
  title_asc: { sort: "title", order: "asc" },
  title_desc: { sort: "title", order: "desc" },
};

export const DEFAULT_NOTE_LIST_SORT: NoteListSortState = PRESET_MAP.created_at_desc;

export function presetToState(preset: NoteListSortPreset): NoteListSortState {
  return PRESET_MAP[preset];
}

export function stateToPreset(state: NoteListSortState): NoteListSortPreset {
  const entry = Object.entries(PRESET_MAP).find(
    ([, value]) => value.sort === state.sort && value.order === state.order,
  );

  return (entry?.[0] as NoteListSortPreset | undefined) ?? "created_at_desc";
}

export function getNoteListSort(): NoteListSortState {
  if (typeof sessionStorage === "undefined") {
    return DEFAULT_NOTE_LIST_SORT;
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_NOTE_LIST_SORT;
    }

    const parsed = JSON.parse(raw) as Partial<NoteListSortState>;
    if (
      (parsed.sort === "created_at" || parsed.sort === "title") &&
      (parsed.order === "asc" || parsed.order === "desc")
    ) {
      return { sort: parsed.sort, order: parsed.order };
    }
  } catch {
    // ignore invalid session data
  }

  return DEFAULT_NOTE_LIST_SORT;
}

export function setNoteListSort(state: NoteListSortState): void {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
