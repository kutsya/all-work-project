import  './UserAccount.css'
import {Avatar, Button, FormControl, Input, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../constants.js";

function UserAccount() {
    const userId = sessionStorage.getItem('id')

    const [isEditing,setIsEditing] = useState(false)
    const [user,setUser] = useState({})

    const [status,setStatus] = useState('')

    const fetchUser = async() =>{
        const data = await axios.get(`${BASE_URL}/users/${userId}`);

        setUser(data.data)
        setStatus(data.data.status)
    }

    const updateUser = async() =>{
        await axios.put(`${BASE_URL}/users/${userId}`,{
            status
        })
        window.location.reload();
    }

    useEffect(() => {
        fetchUser()
    }, []);

    return (
        <div className="main">
            <div className="accountBlock">
                <Avatar src={user.avatar} sx={{width: '100px', height: '100px'}}/>

                    <div className="accountData">
                        <h1 style={{fontWeight: 'bold', fontSize: '30px', margin: '0px'}}>{user.position}</h1>
                        <p>Username: <span className="userInfo">{user.username}</span></p>
                        <p>Email: <span className="userInfo">{user.email}</span></p>
                        <p>Skills: <span className="userInfo">{user.skills}</span></p>

                        <FormControl variant="standard">
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                                labelId="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                label="Status"
                            >
                                <MenuItem value={'at work'}>At work</MenuItem>
                                <MenuItem value={'open to work'}>Open to work</MenuItem>
                            </Select>
                        </FormControl>
                        <Button onClick={updateUser}>Update status</Button>
                    </div>
            </div>
        </div>
    );
}

export default UserAccount;