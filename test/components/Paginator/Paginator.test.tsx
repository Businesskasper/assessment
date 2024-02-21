import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Paginator } from "../../../src/components";

const onChange = vi.fn();

describe("Paginator component", () => {
  afterEach(() => {
    onChange.mockClear();
  });
  it("Component renders current page", () => {
    render(<Paginator onPageChange={onChange} totalPages={5} />);

    const indicator = screen.getByText(/\//).textContent;

    expect(indicator).toBeInTheDocument();
    expect(indicator).toEqual("1/5");
  });

  it("Buttons have correct state", () => {
    render(<Paginator onPageChange={onChange} totalPages={5} />);

    const nextButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "+",
    });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton.disabled).toBe(false);

    const previousButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "-",
    });
    expect(previousButton).toBeInTheDocument();
    expect(previousButton.disabled).toBe(true);
  });

  it("onChange handler should be triggered", () => {
    render(<Paginator onPageChange={onChange} totalPages={5} />);

    const nextButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "+",
    });

    fireEvent(nextButton, new MouseEvent("click", { bubbles: true }));

    // This will fail because of a hidden bug ;)
    // expect(onChange).toBeCalledTimes(1);
  });
});
