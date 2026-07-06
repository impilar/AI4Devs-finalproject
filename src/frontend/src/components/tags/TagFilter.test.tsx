import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TagFilter } from "./TagFilter";

describe("TagFilter", () => {
  it("selects a tag when clicked", () => {
    const onSelect = vi.fn();

    render(
      <TagFilter
        tags={["trabajo", "personal"]}
        activeTag={null}
        onSelect={onSelect}
        onClear={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "trabajo" }));

    expect(onSelect).toHaveBeenCalledWith("trabajo");
  });

  it("highlights the active tag", () => {
    render(
      <TagFilter
        tags={["trabajo", "personal"]}
        activeTag="trabajo"
        onSelect={vi.fn()}
        onClear={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "trabajo" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "personal" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("clears the filter when clicking Ver todas", () => {
    const onClear = vi.fn();

    render(
      <TagFilter
        tags={["trabajo"]}
        activeTag="trabajo"
        onSelect={vi.fn()}
        onClear={onClear}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Ver todas" }));

    expect(onClear).toHaveBeenCalled();
  });

  it("renders nothing when there are no tags", () => {
    const { container } = render(
      <TagFilter tags={[]} activeTag={null} onSelect={vi.fn()} onClear={vi.fn()} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
