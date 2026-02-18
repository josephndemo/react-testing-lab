import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AccountContainer from "../AccountContainer"; // default export
import userEvent from "@testing-library/user-event";

const mockTransactions = [
  { id: 1, description: "Coffee", category: "Food", amount: 3.5 },
  { id: 2, description: "Book", category: "Education", amount: 15.0 },
];

describe("AccountContainer", () => {
  beforeEach(() => {
    // Optional: reset anything before each test if needed
  });

  test("displays transactions on startup", async () => {
    await act(async () => {
      render(<AccountContainer initialTransactions={mockTransactions} />);
    });

    // check that all transactions render
    const rows = screen.getAllByRole("row");
    // header + 2 transactions
    expect(rows.length).toBe(3);
    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Book")).toBeInTheDocument();
  });

  test("adds a new transaction", async () => {
    await act(async () => {
      render(<AccountContainer initialTransactions={mockTransactions} />);
    });

    const descInput = screen.getByPlaceholderText(/description/i);
    const catInput = screen.getByPlaceholderText(/category/i);
    const amountInput = screen.getByPlaceholderText(/amount/i);
    const addBtn = screen.getByRole("button", { name: /add transaction/i });

    await act(async () => {
      fireEvent.change(descInput, { target: { value: "Snack" } });
      fireEvent.change(catInput, { target: { value: "Food" } });
      fireEvent.change(amountInput, { target: { value: "2.5" } });
      fireEvent.click(addBtn);
    });

    expect(screen.getByText("Snack")).toBeInTheDocument();
  });

  test("filters transactions based on search input", async () => {
    await act(async () => {
      render(<AccountContainer initialTransactions={mockTransactions} />);
    });

    const searchInput = screen.getByPlaceholderText(/search/i);

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "Book" } });
    });

    expect(screen.getByText("Book")).toBeInTheDocument();
    expect(screen.queryByText("Coffee")).not.toBeInTheDocument();
  });

  test("sorts transactions by description", async () => {
    await act(async () => {
      render(<AccountContainer initialTransactions={mockTransactions} />);
    });

    const sortBtn = screen.getByRole("button", { name: /sort description/i });

    await act(async () => {
      fireEvent.click(sortBtn);
    });

    const rows = screen.getAllByRole("row");
    // First row is header
    expect(rows[1]).toHaveTextContent("Book");
    expect(rows[2]).toHaveTextContent("Coffee");
  });

  test("sorts transactions by category", async () => {
    await act(async () => {
      render(<AccountContainer initialTransactions={mockTransactions} />);
    });

    const sortBtn = screen.getByRole("button", { name: /sort category/i });

    await act(async () => {
      fireEvent.click(sortBtn);
    });

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Book");   // Education
    expect(rows[2]).toHaveTextContent("Coffee"); // Food
  });
});
