import React, { useState, useEffect } from "react";
import { Modal, Input, Button, List, Popconfirm } from "antd";
import { SearchUsers } from "../../api/api";

const AddMember = ({ isOpen, onClose, onAdd }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search user as you type
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        setLoading(true);
        SearchUsers(search)
          .then((res) => setResults(res.data))
          .catch(() => setResults([]))
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 500); // debounced

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <Modal
      title="Add New Member"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      centered
    >
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Username"
        allowClear
      />

      <List
        loading={loading}
        dataSource={results}
        className="mt-4 overflow-y-auto max-h-[300px]"
        renderItem={(user) => (
          <List.Item>
            <div className="flex justify-between w-full items-center">
              <span>{user.username} (@{user.username})</span>
              <Popconfirm
                title={`Add ${user.username}  to group?`}
                onConfirm={() => {
                  onAdd({ memberId: user._id });
                  onClose();
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link">Add</Button>
              </Popconfirm>
            </div>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default AddMember;
