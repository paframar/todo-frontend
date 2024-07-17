import { render, screen, fireEvent } from "@testing-library/react";
import DutyItem from "../components/DutyItem";
import DutyForm from "../components/DutyForm";
import { Duty } from "../types";

jest.mock("../components/DutyForm", () =>
  jest.fn(() => <div>DutyForm Component</div>)
);

describe("DutyItem", () => {
  const mockDuty: Duty = { id: "1", name: "Test Duty" };
  const mockOnEdit = jest.fn();
  const mockCloseEditable = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders duty in non-editable mode", () => {
    render(
      <DutyItem
        duty={mockDuty}
        editable={false}
        onEdit={mockOnEdit}
        closeEditable={mockCloseEditable}
      />
    );

    expect(screen.getByText(`#${mockDuty.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockDuty.name)).toBeInTheDocument();
  });

  test("renders DutyForm in editable mode", () => {
    render(
      <DutyItem
        duty={mockDuty}
        editable={true}
        onEdit={mockOnEdit}
        closeEditable={mockCloseEditable}
      />
    );

    expect(screen.getByText("DutyForm Component")).toBeInTheDocument();
  });

  test("calls onEdit with correct data when form is submitted", () => {
    // Mock implementation of DutyForm to call onSubmit with mock data
    (DutyForm as jest.Mock).mockImplementation(({ onSubmit }) => (
      <button onClick={() => onSubmit(mockDuty)}>Submit</button>
    ));

    render(
      <DutyItem
        duty={mockDuty}
        editable={true}
        onEdit={mockOnEdit}
        closeEditable={mockCloseEditable}
      />
    );

    fireEvent.click(screen.getByText("Submit"));

    expect(mockOnEdit).toHaveBeenCalledWith(mockDuty);
  });

  test("calls closeEditable when editable mode is closed", () => {
    // Mock implementation of DutyForm to call closeEditable
    (DutyForm as jest.Mock).mockImplementation(({ closeEditable }) => (
      <button onClick={closeEditable}>Close</button>
    ));

    render(
      <DutyItem
        duty={mockDuty}
        editable={true}
        onEdit={mockOnEdit}
        closeEditable={mockCloseEditable}
      />
    );

    fireEvent.click(screen.getByText("Close"));

    expect(mockCloseEditable).toHaveBeenCalled();
  });
});
