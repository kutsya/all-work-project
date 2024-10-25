import { useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  EditButton,
  BulkDeleteButton,
  Confirm,
  useRecordContext,
  useDelete,
  CreateButton,
  FunctionField
} from "react-admin";
import DeleteIcon from '@mui/icons-material/Delete';
import './OrdersList.css';

const orderFilters = [
  <TextInput key='search' label="Search" source="q" alwaysOn />,
  <TextInput key='id' label="Id" source="id" />,
];

export const OrdersList = (props) => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);

  const [remove, { isPending }] = useDelete(
    'orders',
    { id: record && record.id }
  );

  const handleClick = () => setOpen(true);
  const handleOrderClose = () => setOpen(false);
  const handleConfirm = () => {
    remove();
    setOpen(false);
  };

  return (
    <List filters={orderFilters} {...props} className="orders_wrap">
      <CreateButton label="Create order" />
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="category.name" label="Category" />
        <TextField source="name" label="Order Name" />
        <FunctionField
          label="Status"
          render={() => "Open"}
        />
        <FunctionField
          label="Location"
          render={record => (record.local ? 'Remote' : 'Not Remote')}
        />
        <EditButton label="Edit order" />
        <BulkDeleteButton label="Delete" onClick={handleClick}>
          <DeleteIcon />
        </BulkDeleteButton>
      </Datagrid>
      <Confirm
        isOpen={open}
        loading={isPending}
        title={`Delete order #${record && record.id}`}
        content="Are you sure you want to delete this order?"
        onConfirm={handleConfirm}
        onClose={handleOrderClose}
      />
    </List>
  );
};

