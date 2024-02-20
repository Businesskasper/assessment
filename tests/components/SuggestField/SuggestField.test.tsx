import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SuggestField } from "../../../src/components";

const onSearch = vi.fn(() => Promise.resolve());

describe("SuggestField component", () => {
  afterEach(() => {
    onSearch.mockClear();
  });
  it("Component renders", () => {
    render(<SuggestField onSearch={onSearch} threshold={3} />);

    const input = screen.getByRole("textbox");

    expect(input).toBeDefined();
  });

  it("Search handler is triggered after threshold", () => {
    render(<SuggestField onSearch={onSearch} threshold={3} />);

    const input = screen.getByRole<HTMLInputElement>("textbox");

    expect(input).toBeDefined();

    fireEvent.change(input, { target: { value: "ab" } });
    expect(onSearch).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: "abcd" } });
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
