import axios from 'axios';
import { BASE_URL } from '../../constants';

export const getDialogue = async ({ setDialogue, setAdminData }) => {
    const jwt = sessionStorage.getItem('jwt');
    try {
        const response = await axios.get(`${BASE_URL}/dialogs`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.data) {
            const name = sessionStorage.getItem('role');
            const messageFor = sessionStorage.getItem('messageFor');
            if (name === 'admin' && !messageFor) {
                setAdminData(response.data.data);
            } else {
                const userDialogIndex = response.data.data.findIndex(el => {
                    return el.attributes.dialog.some(dialog => {
                        // console.log(dialog)
                        return dialog === messageFor || dialog === name;
                    });
                });
                // console.log(userDialogIndex);
                if (userDialogIndex >= 0) {
                    sessionStorage.setItem('id_dialog', response.data.data[userDialogIndex].id)
                    setDialogue(response.data.data[userDialogIndex].attributes.dialog);
                } else {
                    return [];
                }
            }
        }
    } catch (error) {
        console.error('error with get dialog', error)
    }
};