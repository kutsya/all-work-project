import { useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  BulkDeleteButton,
  Confirm,
  useRecordContext,
  useDelete,
  CreateButton,
  SelectInput,
  ImageField,
} from "react-admin";
import DeleteIcon from '@mui/icons-material/Delete';
import './FreelancersList.css';

const freelancerFilters = [
  <TextInput key="search" source="q" label="Search" alwaysOn />,
  <SelectInput
    key="freelancer"
    source="freelancers"
    label="Freelancers"
    choices={[
      { id: '1', name: 'angel' },
      { id: '2', name: 'crazy_man' },
      { id: '3', name: 'programmer' },
    ]}
    alwaysOn
  />
];

export const FreelancersList = (props) => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);


  const [remove, { isPending }] = useDelete(
    'freelancers',
    { id: record && record.id }
  );

  const handleClick = () => setOpen(true);
  const handleOrderClose = () => setOpen(false);
  const handleConfirm = () => {
    remove();
    setOpen(false);
  };

  return (
    <List filters={freelancerFilters} {...props} className="freelancers_wrap">
      <CreateButton label="Add freelancer" />
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="attributes.position" label="Freelancer" />
        <TextField source="attributes.username" label="Username" />
        <TextField source="attributes.email" label="Email" />
        <ImageField source="attributes.avatar" label="Photo" />
        <BulkDeleteButton label="Delete" onClick={handleClick}>
          <DeleteIcon />
        </BulkDeleteButton>
      </Datagrid>
      <Confirm
        isOpen={open}
        loading={isPending}
        title={`Delete order #${record && record.id}`}
        content="Are you sure you want to delete this freelancer?"
        onConfirm={handleConfirm}
        onClose={handleOrderClose}
      />
    </List>
  );
};

