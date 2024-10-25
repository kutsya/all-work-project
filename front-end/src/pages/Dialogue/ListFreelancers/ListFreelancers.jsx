import './ListFreelancers.css';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { useState } from 'react';
// import { useEffect } from 'react';

function ListFreelancers({ setFreelancer, users, setMessages, adminData }) {

    const [isSearchUser, setSearchUser] = useState('');
    const [isSearchData, setSearchData] = useState([]);

    // useEffect(() => {
    //     console.log(adminData)
    // }, [adminData]);

    const addDataUser = (username) => {
        const searchChat = adminData.filter(user => user.attributes.dialog[0] === username);
        sessionStorage.setItem('messageFor', username);
        if (searchChat.length > 0) {
            sessionStorage.setItem('id_dialog', searchChat[0].id)
            setMessages(searchChat[0].attributes.dialog);
        } else {
            setMessages([username]);

        }
        setFreelancer(false);
    };

    const searchUser = (e) => {
        const user = users.filter((el) => el.attributes.username.includes(e));
        setSearchData(user);
    }

    return (
        <div className='list_freelancers_wrap'>
            <div>
                <div>
                    <TextField
                        label="Freelancer"
                        type="text"
                        value={isSearchUser}
                        onChange={(e) => {
                            setSearchUser(e.target.value);
                            searchUser(e.target.value);
                        }}
                        sx={{
                            '& .MuiInputLabel-root': { color: '#2196f3' },
                        }}
                    />
                </div>
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ width: 'max-content', paddingLeft: "10px", paddingRight: '10px' }}
                    onClick={() => {
                        setFreelancer(false);
                        sessionStorage.removeItem('messageFor');
                        setSearchUser('');
                    }}
                >
                    Close
                </Button>
            </div>
            <div>
                {users.length > 0 ? (isSearchData.length > 0 ? isSearchData : users).map((user, i) => (
                    <ul key={i} onClick={() => {
                        addDataUser(user.attributes.username);
                    }}>
                        <li>
                            <img src={user.attributes.avatar} alt='logo' />
                        </li>
                        <li>
                            {user.attributes.username}
                        </li>
                        <li>
                            {user.attributes.position}
                        </li>
                        <li>
                            {user.attributes.email}
                        </li>
                    </ul>
                )) : null}
            </div>
        </div>
    );
};

ListFreelancers.propTypes = {
    setFreelancer: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    setMessages: PropTypes.func.isRequired,
    adminData: PropTypes.array.isRequired,
};


export default ListFreelancers;