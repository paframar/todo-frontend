import React, { useState } from "react";
import { Duty } from "../types";
import { Card, List, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./DutyList.module.css";
import DutyItem from "./DutyItem";
import { Typography } from "antd";

interface DutyListProps {
  duties: Duty[];
  onEdit: (duty: Duty) => void;
  onDelete: (id: string) => void;
}

const DutyList: React.FC<DutyListProps> = ({ duties, onEdit, onDelete }) => {
  const [editingDutyId, setEditingDutyId] = useState<string | null>(null);

  const handleEditClick = (duty: Duty) => {
    if (editingDutyId === duty.id) {
      setEditingDutyId(null);
    } else {
      setEditingDutyId(duty.id);
    }
  };

  const closeEditable = () => setEditingDutyId(null);

  const { Text } = Typography;

  return (
    <List
      locale={{
        emptyText: (
          <>
            <Text className={styles.noDataText} aria-multiline>
              No duties on the list. 🚀 Enter a new Duty to get started!.
            </Text>
          </>
        ),
      }}
      dataSource={duties}
      renderItem={(duty) => (
        <List.Item className={styles.item}>
          <Card
            className={styles.card}
            actions={[
              <Button onClick={() => handleEditClick(duty)} key="edit">
                <EditOutlined />
              </Button>,
              <Button onClick={() => onDelete(duty.id!)} key="delete">
                <DeleteOutlined />
              </Button>,
            ]}
          >
            <DutyItem
              duty={duty}
              editable={editingDutyId === duty.id}
              onEdit={onEdit}
              closeEditable={closeEditable}
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default DutyList;
