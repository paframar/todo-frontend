import React, { useEffect, useState } from "react";
import DutyForm from "./components/DutyForm";
import DutyList from "./components/DutyList";
import useDuties from "./hooks/useDuties";
import styles from "./App.module.css";
import { Duty } from "./types";
import { Typography } from "antd";

const App: React.FC = () => {
  const { getDuties, addDuty, updateDuty, deleteDuty } = useDuties();
  const [duties, setDuties] = useState<Duty[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { Text } = Typography;

  useEffect(() => {
    const fetchDuties = async () => {
      const result = await getDuties();
      if (result.error) {
        setError(result.error);
      } else {
        setDuties(result.data);
      }
    };
    fetchDuties();
  }, [getDuties]);

  const handleNewDuty = async (duty: Duty) => {
    try {
      const newDuty = await addDuty(duty);
      setDuties([...duties, newDuty.data]);
    } catch (error) {
      setError("Error saving duty");
    }
  };

  const handleEditDuty = async (duty: Duty) => {
    console.log("handleEditDuty duty", duty);
    try {
      const editDuty = await updateDuty(duty);
      setDuties(duties.map((d) => (d.id === duty.id ? editDuty.data : d)));
    } catch (error) {
      setError("Error saving duty");
    }
  };

  const handleDeleteDuty = async (id: string) => {
    try {
      await deleteDuty(id);
      setDuties(duties.filter((duty) => duty.id !== id));
    } catch (err) {
      setError("Error deleting duty");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>✔ Duties List</h2>
      <div className={styles.innerContainer}>
        <DutyForm
          onSubmit={handleNewDuty}
          initialData={null}
          formStyles={styles.newForm}
        />
        <Text type="danger">{error && <p>{error}</p>}</Text>
        <DutyList
          duties={duties}
          onEdit={handleEditDuty}
          onDelete={handleDeleteDuty}
        />
      </div>
    </div>
  );
};

export default App;
