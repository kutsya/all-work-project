import { useNavigate } from "react-router-dom";
import { List, Datagrid, TextField, DateField } from "react-admin";

const MessageList = (props) => {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/admin_freelancers_chat/create/${id}`);
    };

    return (
        <List {...props}>
            <Datagrid rowClick={(id) => handleRowClick(id)}>
                <TextField source='senderId' label='From' />
                <TextField source='receiverId' label='To' />
                <TextField source='message' />
                <DateField source='timestamp' />
            </Datagrid>
        </List>
    );
};

export default MessageList