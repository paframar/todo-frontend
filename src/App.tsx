import React, { useEffect, useState } from "react";
import DutyForm from "./components/DutyForm";
import DutyList from "./components/DutyList";
import useDuties from "./hooks/useDuties";
import styles from "./App.module.css";
import { Typography } from "antd";

const App: React.FC = () => {
  const { Text } = Typography;
  const { duties, error, newDuty, editDuty, deleteDuty } = useDuties();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>✔ Duties List</h2>
      <div className={styles.innerContainer}>
        <DutyForm
          onSubmit={newDuty}
          initialData={null}
          formStyles={styles.newForm}
        />
        <Text type="danger">{error && <p>{error}</p>}</Text>
        <DutyList duties={duties} onEdit={editDuty} onDelete={deleteDuty} />
      </div>
    </div>
  );
};

export default App;
