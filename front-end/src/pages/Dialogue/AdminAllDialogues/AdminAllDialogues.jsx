import './AdminAllDialogues.css';
import { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import usersProvider from '../../../utils/usersProvider';
import User from '../../../assets/user.png';
import ListFreelancers from '../ListFreelancers/ListFreelancers';

import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { putNewMessage } from '../../../utils/newMessageProvider/putNewMessage';

function AdminAllDialogues({
    setMessages,
    adminData,
    setAdminData,
    setReboot,
    isReboot,
    isLodaing,
    isSender,
    setSender
}) {
    const idDialog = sessionStorage.getItem('id_dialog');

    const [users, setUsers] = useState([]);
    const [isFreelancers, setFreelancer] = useState(false);
    const [isSearchUser, setSearchUser] = useState('');
    const [isSearchData, setSearchData] = useState([]);

    useEffect(() => {
        if (adminData.length === 0 && isReboot) {
            sessionStorage.removeItem('messageFor');
            setReboot(false);
        }
    }, [adminData, isReboot, setReboot]);

    const openDialogue = (user, id) => {
        const res = adminData.find(el => el.id === id);
        setMessages(res?.attributes?.dialog || []);
        const searchIndex = isSender.findIndex(item => item === user);
        if (searchIndex !== -1) {
            const data = [...isSender];
            data.splice(searchIndex, 1);
            putNewMessage({ data, setSender });
        }
    };

    useEffect(() => {
        const res = adminData.find(el => el.id === +idDialog);
        if (res && res.attributes) {
            setMessages(res.attributes.dialog);
        }
    }, [adminData, setMessages, idDialog]);

    const fetchUsers = async () => {
        const resource = 'users';
        const params = {
            filter: { role: 'admin' },
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 10 }
        };

        try {
            const response = await usersProvider.getList(resource, params);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        if (users.length === 0) {
            fetchUsers();
        }
    }, [users.length]);

    // Мемоизация adminData с учетом isSender
    const filteredAdminData = useMemo(() => {
        const updatedAdminData = [...adminData];
        const userIndex = updatedAdminData.findIndex(user =>
            isSender.includes(user.attributes.dialog[0])
        );

        if (userIndex !== -1 && userIndex !== 0) {
            const [foundUser] = updatedAdminData.splice(userIndex, 1);
            updatedAdminData.unshift(foundUser);
        }

        return updatedAdminData;
    }, [adminData, isSender]);

    // Оптимизированная функция для обновления adminData
    const updateAdminData = useCallback(() => {
        setAdminData(filteredAdminData);
    }, [filteredAdminData, setAdminData]);

    useEffect(() => {
        if (isSender.length > 0) {
            updateAdminData();
        }
    }, [isSender, updateAdminData]);

    const searchUser = (e) => {
        const user = adminData.filter((el) => el.attributes.dialog[0].includes(e));
        setSearchData(user);
    };

    return (
        <div className='admin_dialogues_wrap'>
            <span>
                <Button
                    variant="outlined"
                    sx={{ width: 'max-content', paddingLeft: "10px", paddingRight: '10px' }}
                    onClick={() => setFreelancer(true)}
                >
                    + create message
                </Button>
                All dialogues
                <div>
                    {adminData.length > 0 ? (
                        <TextField
                            label="Freelancer"
                            type="text"
                            value={isSearchUser}
                            onChange={(e) => {
                                setSearchUser(e.target.value);
                                searchUser(e.target.value);
                            }}
                        />
                    ) : null}
                </div>
            </span>
            {users.length > 0 && adminData.length > 0 ? (
                (isSearchData.length > 0 ? isSearchData : filteredAdminData).map((el, i) => {

                    const lastItem = el?.attributes?.dialog.length - 1;

                    const result = [{
                        userName: el.attributes?.dialog[0],
                        id: el.id,
                        message: el?.attributes?.dialog[lastItem]?.message
                    }];

                    const uniqueUsers = Array.from(new Map(result.map(item => [item.userName, item])).values());
                    return (
                        <ul key={i}>
                            {uniqueUsers.map((user, index) => {
                                const userPhoto = users.find(photo => photo.attributes.username === user.userName);
                                if (user.userName) {
                                    return (
                                        <li key={index} onClick={() => {
                                            openDialogue(user.userName, user.id);
                                            sessionStorage.setItem('id_dialog', user.id);
                                            sessionStorage.setItem('open_dialogue', user.userName);
                                        }}>
                                            <ul>
                                                <li><img src={userPhoto?.attributes.avatar || User} alt='logo' /></li>
                                                <li>{user.userName}</li>
                                                <li>{user.message}</li>
                                                {isSender.length > 0 && isSender.map((el, i) => {
                                                    let letter = '';
                                                    if (el === user.userName && el !== letter) {
                                                        letter = el;
                                                    }
                                                    if (letter) {
                                                        return (
                                                            <li key={i}>
                                                                <EmailIcon />
                                                            </li>
                                                        );
                                                    }
                                                })}
                                            </ul>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    );
                })
            ) : (
                <div style={{ margin: "auto" }}>
                    {!isLodaing && adminData.length === 0 ? "Loading..." : "No dialogue"}
                </div>
            )}
            <div
                style={{
                    position: 'absolute', top: !isFreelancers ? '-700px' : '0px', left: '50%',
                    transition: '0.5s', zIndex: '999'
                }}
            >
                <ListFreelancers
                    setFreelancer={setFreelancer}
                    users={users}
                    setMessages={setMessages}
                    adminData={adminData}
                />
            </div>
        </div>
    );
}

AdminAllDialogues.propTypes = {
    setMessages: PropTypes.func.isRequired,
    adminData: PropTypes.array.isRequired,
    setAdminData: PropTypes.func.isRequired,
    setDialogue: PropTypes.func.isRequired,
    setReboot: PropTypes.func.isRequired,
    isReboot: PropTypes.bool.isRequired,
    isLodaing: PropTypes.bool.isRequired,
    isSender: PropTypes.array.isRequired,
    setSender: PropTypes.func.isRequired
};

export default AdminAllDialogues;
