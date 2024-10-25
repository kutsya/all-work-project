import axios from 'axios';
import { BASE_URL } from '../../constants';

export const getNewMessage = async ({ setSender }) => {
    const jwt = sessionStorage.getItem('jwt');
    try {
        const response = await axios.get(`${BASE_URL}/new-messages`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.data) {
            setSender(response.data.data[0].attributes.newMessages);
        }
    } catch (error) {
        console.error('error with get new message', error)
    }
};