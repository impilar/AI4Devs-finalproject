import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TagInput } from "./TagInput";

describe("TagInput", () => {
  it("adds a tag on Enter and clears the input", () => {
    const onChange = vi.fn();

    render(<TagInput value={[]} onChange={onChange} suggestions={[]} />);

    const input = screen.getByLabelText("Etiquetas (opcional)");
    fireEvent.change(input, { target: { value: "productividad" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onChange).toHaveBeenCalledWith(["productividad"]);
  });

  it("does not add duplicate tags", () => {
    const onChange = vi.fn();

    render(
      <TagInput value={["ideas"]} onChange={onChange} suggestions={["ideas", "trabajo"]} />,
    );

    const input = screen.getByLabelText("Etiquetas (opcional)");
    fireEvent.change(input, { target: { value: "ideas" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onChange).not.toHaveBeenCalled();
  });

  it("removes a tag when clicking the chip remove button", () => {
    const onChange = vi.fn();

    render(
      <TagInput value={["ideas", "urgente"]} onChange={onChange} suggestions={[]} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Eliminar etiqueta ideas" }));

    expect(onChange).toHaveBeenCalledWith(["urgente"]);
  });

  it("adds a suggestion when selected", () => {
    const onChange = vi.fn();

    render(
      <TagInput value={[]} onChange={onChange} suggestions={["ideas", "trabajo"]} />,
    );

    const input = screen.getByLabelText("Etiquetas (opcional)");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "id" } });
    fireEvent.mouseDown(screen.getByRole("button", { name: "ideas" }));

    expect(onChange).toHaveBeenCalledWith(["ideas"]);
  });
});
