import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DutyList from "../components/DutyList";
import { Duty } from "../types";

const mockDuties: Duty[] = [
  { id: "1", name: "Duty 1" },
  { id: "2", name: "Duty 2" },
];

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe("DutyList component", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("renders empty state correctly", () => {
    render(
      <DutyList duties={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    expect(
      screen.getByText(
        "No duties on the list. 🚀 Enter a new Duty to get started!."
      )
    ).toBeInTheDocument();
  });

  it("renders duties correctly", () => {
    render(
      <DutyList
        duties={mockDuties}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText("Duty 1")).toBeInTheDocument();
    expect(screen.getByText("Duty 2")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <DutyList
        duties={mockDuties}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });
});
