import { useCallback } from "react";
import { Duty } from "../types"; // Asegúrate de tener un archivo de tipos donde Duty esté definido
import { API_URL } from "../config";

const useDuties = () => {
  const getDuties = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/duties`);
      if (!response.ok) {
        throw new Error("Error fetching duties");
      }
      const data = await response.json();
      return { data, error: null };
    } catch (err) {
      return { data: [], error: "Error fetching duties" };
    }
  }, []);

  const addDuty = useCallback(async (duty: Partial<Duty>) => {
    try {
      const response = await fetch(`${API_URL}/duties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(duty),
      });
      if (!response.ok) {
        throw new Error("Error adding duty");
      }
      const data = await response.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: "Error adding duty" };
    }
  }, []);

  const updateDuty = useCallback(async (duty: Duty) => {
    try {
      const response = await fetch(`${API_URL}/duties`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(duty),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Update success:", data);
      return { data, error: null };
    } catch (error) {
      console.error("Update error:", error);
      return { data: null, error: error.message || "Error updating duty" };
    }
  }, []);

  const deleteDuty = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/duties/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting duty");
      }
      return { error: null };
    } catch (err) {
      return { error: "Error deleting duty" };
    }
  }, []);

  return { getDuties, addDuty, updateDuty, deleteDuty };
};

export default useDuties;
