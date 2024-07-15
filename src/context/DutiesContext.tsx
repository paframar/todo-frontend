import { createContext, useEffect, ReactNode, useState } from "react";

import { Duty, DutiesContextValue } from "../types";
import dutiesServices from "../services/useDutiesServices";

export const DutiesContext = createContext<DutiesContextValue | undefined>(
  undefined
);

export function DutiesProvider({ children }: { children: ReactNode }) {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    getDutiesService,
    addDutyService,
    updateDutyService,
    deleteDutyService,
  } = dutiesServices();

  useEffect(() => {
    const fetchDuties = async () => {
      const result = await getDutiesService();
      if (result.error) {
        setError(result.error);
      } else {
        setDuties(result.data);
      }
    };
    fetchDuties();
  }, [getDutiesService]);

  const getDuties = async () => {
    const result = await getDutiesService();
    if (result.error) {
      setError(result.error);
    } else {
      setDuties(result.data);
    }
  };

  const newDuty = async (duty: Duty) => {
    try {
      const newDuty = await addDutyService(duty);
      setDuties((prevDuties) => [...prevDuties, newDuty.data]);
    } catch (error) {
      setError("Error saving duty");
    }
  };

  const editDuty = async (duty: Duty) => {
    try {
      const editDuty = await updateDutyService(duty);
      setDuties((prevDuties) =>
        prevDuties.map((d) => (d.id === duty.id ? editDuty.data : d))
      );
    } catch (error) {
      setError("Error saving duty");
    }
  };

  const deleteDuty = async (id: string) => {
    try {
      await deleteDutyService(id);
      setDuties((prevDuties) => prevDuties.filter((duty) => duty.id !== id));
    } catch (err) {
      setError("Error deleting duty");
    }
  };

  const value: DutiesContextValue = {
    duties,
    error,
    getDuties,
    newDuty,
    editDuty,
    deleteDuty,
  };

  return (
    <DutiesContext.Provider value={value}>{children}</DutiesContext.Provider>
  );
}
