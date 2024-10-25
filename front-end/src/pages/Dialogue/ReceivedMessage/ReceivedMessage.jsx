import './ReceivedMessage.css';
import { useEffect, useRef } from 'react';

import Envelop from '../../../assets/envelop.png';
import useStore from '../../../store';
import { getNewMessageUser } from '../../../utils/newMessageProvider/getNewMessageUser';

function ReceivedMessage() {
    const socket = useRef(null);

    // const role = sessionStorage.getItem('role');
    const open_dialogue_user = sessionStorage.getItem('open_dialogue_user');

    // const messageForUser = useStore((state) => state.messageForUser);
    const setMessageForUser = useStore((state) => state.setMessageForUser);

    const flagIsMessage = useStore((state) => state.flagIsMessage);
    const setFlagIsMessage = useStore((state) => state.setFlagIsMessage);

    useEffect(() => {
        getNewMessageUser({ setMessageForUser });
    }, [setMessageForUser]);

    useEffect(() => {
        if (!open_dialogue_user) {
            setFlagIsMessage(false);
        }
    }, [open_dialogue_user, setFlagIsMessage]);

    useEffect(() => {
        socket.current = new WebSocket('ws://localhost:8080');

        socket.current.onmessage = (event) => {
            if (typeof event.data === 'string') {
                if (event.data === "You are connected") {
                    return;
                }
                try {
                    const messageData = JSON.parse(event.data);
                    console.log(messageData);
                } catch (error) {
                    console.error('Ошибка при парсинге сообщения:', error);
                }
            } else if (event.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => {
                    const messageData = JSON.parse(reader.result);
                    if (messageData) {
                        setFlagIsMessage(true);
                    }
                };
                reader.readAsText(event.data);
            }
        };

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [setFlagIsMessage])

    return (
        <div
            className={`received_message_wrap ${flagIsMessage ? 'received_message_wrap_red' : ''}`}
        >
            {flagIsMessage ? <img src={Envelop} alt='logo' /> : null}
        </div >
    );
};

export default ReceivedMessage;