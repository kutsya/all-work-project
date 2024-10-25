import { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  Confirm,
  useRecordContext,
  useDelete,
  SelectInput,
} from "react-admin";
import ReceivedMessage from "../Dialogue/ReceivedMessage/ReceivedMessage";

const orderFilters = [
  <TextInput key="search" source="q" label="Search" alwaysOn />,
  <SelectInput
    key="status"
    source="status"
    label="Order Status"
    choices={[
      { id: "active", name: "Active" },
      { id: "completed", name: "Completed" },
      { id: "unprocessed", name: "Unprocessed" },
    ]}
    alwaysOn
  />,
];

export const UserOrders = (props) => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);

  const [remove, { isPending }] = useDelete("orders", {
    id: record && record.id,
  });

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role && role !== 'admin') {
      sessionStorage.setItem('open_dialogue_user', role);
    }
  }, []);

  const handleOrderClose = () => setOpen(false);
  const handleConfirm = () => {
    remove();
    setOpen(false);
  };

  return (
    <List filters={orderFilters} {...props} className="orders">
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="name" label="Order Name" />
        <TextField source="status" label="Status" />
      </Datagrid>
      <Confirm
        isOpen={open}
        loading={isPending}
        title={`Delete order #${record && record.id}`}
        content="Are you sure you want to delete this order?"
        onConfirm={handleConfirm}
        onClose={handleOrderClose}
      />
      <ReceivedMessage />
    </List>
  );
};
