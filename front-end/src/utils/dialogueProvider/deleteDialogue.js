import axios from 'axios';
import { BASE_URL } from '../../constants';

export const deleteDialogue = async ({ id }) => {
    const jwt = sessionStorage.getItem('jwt');
    try {
        const response = await axios.delete(`${BASE_URL}/dialogs/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.data) {
            sessionStorage.removeItem('id_dialog');
        }
    } catch (error) {
        console.error('Error with post dialog', error);
    }
};
