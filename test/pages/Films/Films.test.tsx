import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Films } from "../../../src/pages/Films/Films";

// mock films hook
const mockUseFilms = vi.fn();
vi.mock("../../../src/pages/Films/film-service", async (importOriginal) => {
  return {
    ...(await importOriginal<
      typeof import("../../../src/pages/Films/film-service")
    >()),
    useFilms: () => mockUseFilms(),
  };
});

describe("Films component", () => {
  afterEach(() => {
    mockUseFilms.mockReset();
  });
  it("Component renders", () => {
    mockUseFilms.mockReturnValue({
      isLoading: true,
      films: [],
    });
    render(<Films />);

    const heading = screen.getByRole("heading", {
      name: /Films/,
    });
    expect(heading).toBeInTheDocument();
  });

  it("Component shows loading indicator", () => {
    mockUseFilms.mockReturnValue({
      isLoading: true,
      films: [],
    });

    const { container } = render(<Films />);

    const loadingIndicator = container.querySelector(".loader");

    expect(loadingIndicator).toBeInTheDocument();
  });

  it("Component should render results", () => {
    mockUseFilms.mockReturnValue({
      isLoading: false,
      films: [{ title: "Film1" }, { title: "Film2" }],
    });

    render(<Films />);

    const listItems = screen.getAllByRole("listitem");

    expect(listItems).toHaveLength(2);
  });
});
