import axios from 'axios';
import { BASE_URL } from '../../constants';

export const getNewMessageUser = async ({ setMessageForUser }) => {
    const jwt = sessionStorage.getItem('jwt');
    try {
        const response = await axios.get(`${BASE_URL}/new-message-users`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.data) {
            setMessageForUser(response.data.data[0].attributes.newMessagesUser);
        }
    } catch (error) {
        console.error('error with get new message users', error)
    }
};