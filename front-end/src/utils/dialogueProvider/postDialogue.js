import axios from 'axios';
import { BASE_URL } from '../../constants';

export const postDialogue = async ({ updatedMessage }) => {

    const user = sessionStorage.getItem('role');
    const messageFor = sessionStorage.getItem('messageFor');
    const jwt = sessionStorage.getItem('jwt');
    try {
        const response = await axios.post(
            `${BASE_URL}/dialogs`,
            {
                data: {
                    dialog: messageFor ? [messageFor, updatedMessage] : [user, updatedMessage]
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
            // console.log(response.data)
            sessionStorage.setItem('id_dialog', response.data.data.id);
            sessionStorage.removeItem('messageFor');
        }
    } catch (error) {
        console.error('Error with post dialog', error);
    }
};
