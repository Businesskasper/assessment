import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useFilms } from "../../../src/pages/Films/film-service";

describe("Test useFilms", () => {
  const fetchSpy = vi.spyOn(global, "fetch");

  it("Should fetch movies and update loading state", async () => {
    const mockedFetchResult = {
      ok: true,
      json: () => {
        return new Promise((resolve) => {
          resolve({
            results: [{ title: "Star Wars" }],
          });
        });
      },
    } as Response;

    fetchSpy.mockResolvedValue(mockedFetchResult);

    const { result } = renderHook(() => useFilms());

    await waitFor(() => {
      expect(result.current).toEqual({
        isLoading: false,
        films: [{ title: "Star Wars" }],
      });
    });
  });
});
