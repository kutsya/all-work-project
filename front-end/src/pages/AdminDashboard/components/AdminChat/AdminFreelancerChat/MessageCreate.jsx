import { useState } from "react";
import { Create, SimpleForm, TextInput, DateInput, TextField } from "react-admin";

const MessageCreate = (props) => {
    const [replyContent, setReplyContent] = useState("");

    return (
        <Create {...props}>
            <SimpleForm>
                <TextField source="Message ID" label="Message ID" />
                <TextInput
                    source='message'
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                />
                <TextInput source='senderId' label='Send From' />
                <TextInput source='receiverId' label='Send To' />
                <DateInput source='timestamp' label='Sent At' />
            </SimpleForm>
        </Create>
    );
};

export default MessageCreate