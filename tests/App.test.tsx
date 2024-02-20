import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import App from "../src/App";

describe("App", () => {
	it("renders headline", () => {
		render(<App />);
		const headline = screen.getByText(/asdf/);
		expect(headline).toBeDefined();
	});
});
