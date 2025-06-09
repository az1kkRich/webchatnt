import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

const FloatingModal = ({ isOpen, onClose, onAdd }) => {
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
      title="Create Group"
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
      <div className="mb-2">
        <label className="block mb-3">Group Name</label>
        <Input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          required
        />
      </div>
      <div>
        <label className="block mb-3">
          Group Password
        </label>
        <Input.Password
          value={groupPassword}
          onChange={(e) => setGroupPassword(e.target.value)}
          placeholder="Enter group password"
          required
        />
      </div>
    </Modal>
  );
};

export default FloatingModal;
