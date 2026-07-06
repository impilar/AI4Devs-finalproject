import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NoteLinkPicker } from "./NoteLinkPicker";

describe("NoteLinkPicker", () => {
  it("excludes the current note from selectable options", () => {
    const onChange = vi.fn();

    render(
      <NoteLinkPicker
        notes={[
          { id: "11111111-1111-1111-1111-111111111101", title: "Ideas de proyecto" },
          { id: "22222222-2222-2222-2222-222222222202", title: "Investigación de mercado" },
        ]}
        currentNoteId="11111111-1111-1111-1111-111111111101"
        value=""
        onChange={onChange}
      />,
    );

    const select = screen.getByLabelText("Enlazar con otra nota (opcional)");
    expect(select).toHaveTextContent("Investigación de mercado");
    expect(select).not.toHaveTextContent("Ideas de proyecto");

    fireEvent.change(select, {
      target: { value: "22222222-2222-2222-2222-222222222202" },
    });

    expect(onChange).toHaveBeenCalledWith("22222222-2222-2222-2222-222222222202");
  });
});
