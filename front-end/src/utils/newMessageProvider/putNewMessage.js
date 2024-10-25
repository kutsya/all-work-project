import axios from 'axios';
import { BASE_URL } from '../../constants';

export const putNewMessage = async ({ data, setSender }) => {
    const jwt = sessionStorage.getItem('jwt');
    try {
        const response = await axios.put(`${BASE_URL}/new-messages/${1}`,
            {
                data: {
                    newMessages: data
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
            setSender(response.data.data.attributes.newMessages);
        }
    } catch (error) {
        console.error('error with put new message', error);
    }
};
