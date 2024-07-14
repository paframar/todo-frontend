import React, { useState } from "react";
import DutyForm from "./DutyForm";
import { Duty } from "../types";
import { Typography } from "antd";
import styles from "./DutyItem.module.css";

interface DutyItemProps {
  duty: Duty;
  editable: boolean;
  onEdit: (data: Duty) => void;
  closeEditable: () => void;
}

const DutyItem: React.FC<DutyItemProps> = ({
  duty,
  editable,
  closeEditable,
  onEdit,
}) => {
  const { Text } = Typography;

  return editable ? (
    <DutyForm
      onSubmit={onEdit}
      initialData={duty}
      closeEditable={closeEditable}
    />
  ) : (
    <div className={styles.content}>
      <Text type="secondary">#{duty.id} </Text>
      <Text strong>{duty.name}</Text>
    </div>
  );
};

export default DutyItem;
