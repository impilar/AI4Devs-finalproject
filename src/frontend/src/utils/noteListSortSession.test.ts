import { afterEach, describe, expect, it } from "vitest";
import {
  DEFAULT_NOTE_LIST_SORT,
  getNoteListSort,
  presetToState,
  setNoteListSort,
  stateToPreset,
} from "./noteListSortSession";

describe("noteListSortSession", () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  it("returns default when session is empty", () => {
    expect(getNoteListSort()).toEqual(DEFAULT_NOTE_LIST_SORT);
  });

  it("persists sort state in sessionStorage", () => {
    setNoteListSort({ sort: "title", order: "asc" });
    expect(getNoteListSort()).toEqual({ sort: "title", order: "asc" });
  });

  it("maps preset to state and back", () => {
    const state = presetToState("title_asc");
    expect(state).toEqual({ sort: "title", order: "asc" });
    expect(stateToPreset(state)).toBe("title_asc");
  });
});
