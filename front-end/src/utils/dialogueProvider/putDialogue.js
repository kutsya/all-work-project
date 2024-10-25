import axios from 'axios';
import { BASE_URL } from '../../constants';

export const putDialogue = async ({ messages, id }) => {

    const jwt = sessionStorage.getItem('jwt');

    try {
        await axios.put(
            `${BASE_URL}/dialogs/${id}`,
            {
                data: {
                    dialog: messages
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Error with put dialog', error.response.data);
    }
};
