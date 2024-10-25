import './Login.css';
import { useLogin, useNotify } from 'react-admin';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';

const Login = ({ setUserRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (!username || !password) {
                alert("Please fill in both username and password");
                return Promise.resolve();
            } else {
                await login({ username, password });
                setUserRole(username);
            }
        } catch {
            notify('Invalid username or password');
        }
    };

    return (
        <form onSubmit={submit} className='login_wrap'>
            <div>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button type="submit" sx={
                {
                    width: '150px',
                    backgroundColor: '#1fa61f',
                    color: 'white',
                    marginTop: '5px',
                    outline: 'none'
                }
            }>Login</Button>
        </form>
    );
};

Login.propTypes = {
    setUserRole: PropTypes.func.isRequired,
};

export default Login;
