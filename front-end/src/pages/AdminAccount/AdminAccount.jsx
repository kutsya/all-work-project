import {useState, useEffect} from "react";
import {Card, CardContent, Avatar, Typography, TextField, Button} from "@mui/material";

const AdminAccountPage = () => {
    const [user, setUser] = useState({
        id: "",
        fullName: "",
        username: "",
        password: "",
        avatar: "",
        role: "",
    });

    const [initialUser, setInitialUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setInitialUser(storedUser);
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify(user));
        setInitialUser(user);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setUser(initialUser);
        setIsEditing(false);
    };

    if (!user) return null;

    return (
        <Card>
            <CardContent style={{display: "flex", alignItems: "center"}}>
                <Avatar
                    src={user.avatar}
                    alt={user.fullName}
                    style={{width: 80, height: 80, marginRight: 16}}
                />
                <div>
                    {isEditing ? (
                        <>
                            <TextField
                                label="Full Name"
                                name="fullName"
                                value={user.fullName}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                label="Username"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="text" color="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5">{user.fullName}</Typography>
                            <Typography variant="subtitle1">{user.role}</Typography>
                            <Typography variant="body1">Username: {user.username}</Typography>
                            <Button variant="contained" onClick={() => setIsEditing(true)}>
                                Edit
                            </Button>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminAccountPage;