import React from "react";
import { render, screen } from "@testing-library/react";
import { HomePage } from "../HomePage";

jest.mock("../../../features/Home/Home", () => {
  return {
    Home: () => <div data-testid="home-feature-mock-node" />,
  };
});

describe("pages/HomePage", () => {
  describe("render", () => {
    it("should be a component", () => {
      expect(HomePage).toBeInstanceOf(Function);
    });

    it("should render plan name", () => {
      render(<HomePage />);
      const planName = screen.getByText(/group plan/i);

      expect(planName).toBeInTheDocument();
    });

    it("should render user who created the plan", () => {
      render(<HomePage />);
      const planUserCreated = screen.getByText(/john doe/i);

      expect(planUserCreated).toBeInTheDocument();
    });

    it("should render 'Home' feature", () => {
      render(<HomePage />);
      const planUserCreated = screen.getByTestId("home-feature-mock-node");

      expect(planUserCreated).toBeInTheDocument();
    });
  });
});
