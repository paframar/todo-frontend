import { DutiesContext } from "../context/DutiesContext";
import { useContext } from "react";

const useDuties = () => {
  const context = useContext(DutiesContext);
  if (context === undefined) {
    throw new Error("useDutiesContext must be used within a DutiesProvider");
  }
  return context;
};

export default useDuties;
