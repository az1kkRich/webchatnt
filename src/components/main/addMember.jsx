import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

const AddMember = ({ isOpen, onClose, onAdd }) => {
  const [groupName, setGroupName] = useState("");
  const [groupPassword, setGroupPassword] = useState("");

  const handleAdd = () => {
    onAdd({ groupName, groupPassword });
    setGroupName("");
    setGroupPassword("");
    onClose();
  };

  return (
    <Modal
      title="Add New Member"
      open={isOpen}
      onCancel={onClose} // x icon va background bosilganda ham ishlaydi
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button
          key="add"
          type="primary"
          onClick={handleAdd}
        >
          Add
        </Button>,
      ]}
      centered
    >
      <div className="mb-2 h-100">
        <Input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Search Username"
          required
        />
      </div>
      
    </Modal>
  );
};

export default AddMember;
