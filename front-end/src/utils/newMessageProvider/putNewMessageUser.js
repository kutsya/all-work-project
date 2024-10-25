import axios from 'axios';
import { BASE_URL } from '../../constants';

export const putNewMessageUser = async ({ data, setMessageForUser }) => {
    const jwt = sessionStorage.getItem('jwt');
    try {
        const response = await axios.put(`${BASE_URL}/new-message-users/${1}`,
            {
                data: {
                    newMessagesUser: data
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.data) {
            setMessageForUser(response.data.data.attributes.newMessagesUser);
        }
    } catch (error) {
        console.error('error with put new message', error);
    }
};
