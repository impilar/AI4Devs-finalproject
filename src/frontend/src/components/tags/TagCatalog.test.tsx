import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TagCatalog } from "./TagCatalog";

describe("TagCatalog", () => {
  const items = [
    { id: "1", name: "ideas", count: 5 },
    { id: "2", name: "archivo", count: 0 },
  ];

  it("renders name and count labels", () => {
    render(
      <TagCatalog items={items} activeTag={null} onSelect={vi.fn()} onClear={vi.fn()} />,
    );

    expect(screen.getByRole("button", { name: "ideas (5)" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "archivo (0)" })).toBeInTheDocument();
  });

  it("calls onSelect with tag name when clicked", () => {
    const onSelect = vi.fn();

    render(
      <TagCatalog items={items} activeTag={null} onSelect={onSelect} onClear={vi.fn()} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "ideas (5)" }));

    expect(onSelect).toHaveBeenCalledWith("ideas");
  });
});
