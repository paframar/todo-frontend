import { render, screen, fireEvent, act } from "@testing-library/react";
import DutyForm from "../components/DutyForm";
import { Duty } from "../types";

describe("DutyForm", () => {
  const mockDuty: Duty = { id: "1", name: "Test Duty" };
  const mockOnSubmit = jest.fn();
  const mockCloseEditable = jest.fn();

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with initial values", () => {
    render(<DutyForm onSubmit={mockOnSubmit} initialData={mockDuty} />);

    expect(screen.getByPlaceholderText("Enter a new duty...")).toHaveValue(
      mockDuty.name
    );
  });

  test("renders the form without initial values", () => {
    render(<DutyForm onSubmit={mockOnSubmit} initialData={null} />);

    expect(screen.getByPlaceholderText("Enter a new duty...")).toHaveValue("");
  });

  test("calls onSubmit with correct data when form is submitted", async () => {
    render(<DutyForm onSubmit={mockOnSubmit} initialData={null} />);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Enter a new duty..."), {
        target: { value: "New Duty" },
      });
      fireEvent.click(screen.getByText("New Duty"));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({ name: "New Duty" });
  });

  test("calls onSubmit and closeEditable with correct data when form is submitted with initial data", async () => {
    render(
      <DutyForm
        onSubmit={mockOnSubmit}
        initialData={mockDuty}
        closeEditable={mockCloseEditable}
      />
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Enter a new duty..."), {
        target: { value: "Updated Duty" },
      });
      fireEvent.click(screen.getByText("Update Duty"));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: "1",
      name: "Updated Duty",
    });
    expect(mockCloseEditable).toHaveBeenCalled();
  });

  test("shows validation error when input is empty and form is submitted", async () => {
    render(<DutyForm onSubmit={mockOnSubmit} initialData={null} />);

    await act(async () => {
      fireEvent.click(screen.getByText("New Duty"));
    });

    const input = screen.getByPlaceholderText("Enter a new duty...");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
