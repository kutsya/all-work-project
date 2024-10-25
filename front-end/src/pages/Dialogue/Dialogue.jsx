import './Dialogue.css';
import { useEffect, useRef, useState } from 'react';
import useStore from '../../store';

import { getDialogue } from '../../utils/dialogueProvider/getDialogue';
import { postDialogue } from '../../utils/dialogueProvider/postDialogue';
import { putDialogue } from '../../utils/dialogueProvider/putDialogue';
import { deleteDialogue } from '../../utils/dialogueProvider/deleteDialogue';
import { createNewDate } from '../../utils/createNewDate';
import { putNewMessage } from '../../utils/newMessageProvider/putNewMessage';
import { getNewMessage } from '../../utils/newMessageProvider/getNewMessage';
import { getNewMessageUser } from '../../utils/newMessageProvider/getNewMessageUser';
import { putNewMessageUser } from '../../utils/newMessageProvider/putNewMessageUser';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import AdminAllDialogues from './AdminAllDialogues/AdminAllDialogues';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import ReceivedMessage from './ReceivedMessage/ReceivedMessage';

const Dialogue = () => {

    const messageForUser = useStore((state) => state.messageForUser);
    const setMessageForUser = useStore((state) => state.setMessageForUser);

    const user = sessionStorage.getItem('role');
    const messageFor = sessionStorage.getItem('messageFor');
    const id = sessionStorage.getItem('id_dialog');
    const open_dialogue = sessionStorage.getItem('open_dialogue');

    const socket = useRef(null);

    const [messages, setMessages] = useState([]);
    const [dialogue, setDialogue] = useState([]);
    const [newMessage, setNewMessage] = useState({
        userName: user,
        message: "",
        timestamp: ""
    });
    const [open, setOpen] = useState(false);
    const [adminData, setAdminData] = useState([]);
    const [isReboot, setReboot] = useState(false);
    const [isLodaing, setLoading] = useState(false);
    const [showDialogue, setShowDialogue] = useState(false);
    const [isSender, setSender] = useState([]);

    useEffect(() => {
        const fetchMessage = async () => {
            await getNewMessageUser({ setMessageForUser })
            if (messageForUser.length > 0) {
                const search = messageForUser.findIndex((item) => item === user);
                const res = messageForUser.slice(1, search);
                await putNewMessageUser({ data: res, setMessageForUser });
            }
        }

        if (user === "admin" && isSender.length === 0) {
            getNewMessage({ setSender });
        } else if (user && user !== 'admin') {
            fetchMessage();
            sessionStorage.removeItem('open_dialogue_user');
        }
    }, []);

    // useEffect(() => {
    //     console.log(isSender);
    // }, [isSender]);

    const handleClickOpen = () => {
        if (id) {
            setOpen(true);
        } else {
            alert('Dialogue is empty');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteMessage = async () => {
        if (id && messages.length > 0) {
            await deleteDialogue({ id });
            setMessages([]);
            setAdminData([]);
            if (socket.current) {
                socket.current.send(JSON.stringify({ type: 'deleteDialogue', id }));
            }
            sessionStorage.removeItem('id_dialog');
            sessionStorage.removeItem('open_dialogue');
            setReboot(true);
        }
        handleClose();
    };

    const storeName = sessionStorage.getItem('role');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        getDialogue({ setDialogue, setAdminData });
    }, []);

    useEffect(() => {
        setMessages([...dialogue]);
    }, [dialogue]);

    useEffect(() => {
        socket.current = new WebSocket('ws://localhost:8080');
        socket.current.onopen = () => {

            if ((messages && messages.length === 0) || (adminData && adminData.length === 0)) {
                try {
                    setLoading(true);
                    getDialogue({ setDialogue, setAdminData })
                } catch {
                    setLoading(false);
                }
            }
        };

        socket.current.onmessage = (event) => {
            if (typeof event.data === 'string') {
                if (event.data === "You are connected") {
                    return;
                }
                try {
                    const messageData = JSON.parse(event.data);
                    if (messageData.type === 'deleteDialogue' && messageData.id === id) {
                        sessionStorage.removeItem('id_dialog');
                        setMessages([]);
                    } else {
                        setMessages(prevMessages => [...prevMessages, messageData]);
                    }
                } catch (error) {
                    console.error('Ошибка при парсинге сообщения:', error);
                }
            } else if (event.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const messageData = JSON.parse(reader.result);
                        if (messageData.type === 'deleteDialogue' && messageData.id === id) {
                            sessionStorage.removeItem('id_dialog');
                            setMessages([]);
                        } else {
                            const sender = messageData.userName || '';
                            const check = isSender.includes(sender);
                            const userToCheck = messageFor || open_dialogue;
                            const checkUser = messageForUser.includes(userToCheck);
                            if (sender && sender !== open_dialogue && !check && sender !== 'admin') {
                                const data = [sender, ...isSender];
                                putNewMessage({ data, setSender });
                            } else if (sender && sender === 'admin' && !checkUser && (messageFor || open_dialogue)) {
                                const data = [(messageFor || open_dialogue), ...messageForUser];
                                putNewMessageUser({ data, setMessageForUser });
                            }
                            getNewMessageUser({ setMessageForUser });
                            getDialogue({ setDialogue, setAdminData });
                            setMessages(prevMessages => [...prevMessages, messageData]);
                        }
                    } catch (error) {
                        console.error('Ошибка при парсинге Blob сообщения:', error);
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

    }, [id, messages.length, adminData.length, open_dialogue, isSender,
        messageFor, messageForUser, setMessageForUser]);

    const sendMessage = async () => {
        const time = new Date().toISOString();
        const formattedDate = createNewDate(time);
        const updatedMessage = {
            userName: newMessage.userName,
            message: newMessage.message,
            timestamp: formattedDate,
            isRead: false
        };

        if (socket.current && updatedMessage.message.trim()) {
            socket.current.send(JSON.stringify(updatedMessage));
        } else {
            alert('Fill out your message');
            return;
        }

        if (id) {
            await putDialogue({ messages: [...messages, updatedMessage], id });
        } else {
            await postDialogue({ updatedMessage });
        }

        setNewMessage(prev => ({ ...prev, message: '', timestamp: '' }));
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            await sendMessage();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [messages]);

    useEffect(() => {
        if ((storeName === "admin" && messages.length > 0 && (id || messageFor)) || (storeName !== 'admin')) {
            setShowDialogue(true);
        } else {
            setShowDialogue(false);
        }
    }, [setShowDialogue, id, messages, messageFor, storeName]);

    return (
        <div className='dialogs_wrap'>
            <div style={{
                top: showDialogue ? '0px' : '-700px',
            }}>
                <div style={storeName === "admin" ? { justifyContent: "space-between" } : { justifyContent: "right" }}>
                    {storeName === "admin" && (
                        <Button
                            variant="contained"
                            onClick={() => {
                                setMessages([]);
                                sessionStorage.removeItem('id_dialog');
                                sessionStorage.removeItem('messageFor');
                                sessionStorage.removeItem('open_dialogue');
                                setReboot(true);
                            }}
                        >
                            Come back
                        </Button>
                    )}
                    <p className='dialogue_header_user'>{open_dialogue}</p>
                    <span>
                        <span id='dialogue_header_delete'>Delete dialogue</span>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClickOpen}>
                            Delete
                        </Button>
                    </span>
                </div>

                <div>
                    {messages.length > 1 ? messages.map((item, index) => {
                        if (typeof item === 'object' && storeName === item.userName) {
                            return (
                                <p className='dialogs_my_messages' key={index}>
                                    <span>{item.timestamp}</span> {item.message}
                                </p>
                            );
                        } else if (typeof item === 'object') {
                            return (
                                <p className='dialogs_notMy_messages' key={index}>
                                    <span>{item.timestamp}</span> {item.message}
                                </p>
                            );
                        }
                    }) : <p className='dialogue_no_messages'>no messages...</p>}
                    <div ref={messagesEndRef} />
                    <div>
                        <input
                            type="text"
                            placeholder='message'
                            value={newMessage.message}
                            onChange={(e) => setNewMessage(prev => ({
                                ...prev,
                                message: e.target.value,
                            }))}
                            onKeyDown={handleKeyDown}
                        />
                        <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
                            Send
                        </Button>
                    </div>
                </div>
                <ConfirmModal
                    open={open}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    deleteMessage={deleteMessage}
                />
            </div>

            <div style={{
                position: 'absolute',
                top: !showDialogue ? '0px' : '-700px',
                left: '50%',
                transition: '0.5s',
                transform: 'translateX(-50%)',
                zIndex: 999,
            }}>
                <AdminAllDialogues
                    setMessages={setMessages}
                    adminData={adminData}
                    setAdminData={setAdminData}
                    setDialogue={setDialogue}
                    setReboot={setReboot}
                    isReboot={isReboot}
                    isLodaing={isLodaing}
                    isSender={isSender}
                    setSender={setSender}
                />
            </div>
            <div style={{ display: 'none' }}>
                <ReceivedMessage />
            </div>
        </div>
    );
};

export default Dialogue;
