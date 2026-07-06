import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RemovableTagChip } from "./RemovableTagChip";

describe("RemovableTagChip", () => {
  it("calls onRemove with etiqueta id when remove button is clicked", () => {
    const onRemove = vi.fn();

    render(
      <RemovableTagChip
        tag={{ id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01", name: "urgente" }}
        onRemove={onRemove}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Quitar etiqueta urgente" }));

    expect(onRemove).toHaveBeenCalledWith("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbb01");
  });
});
