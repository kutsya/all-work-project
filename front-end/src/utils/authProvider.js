import axios from "axios";
import { HttpError } from "react-admin";
import { BASE_URL } from '../constants';

export const authProvider = {
    login: async ({ username, password }) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/local`, {
                identifier: username,
                password: password,
            });
            const token = response?.data?.jwt;
            const role = response?.data?.user?.username;
            const id = response?.data?.user?.id;
            sessionStorage.setItem('jwt', token);
            sessionStorage.setItem('role', role);
            sessionStorage.setItem('id', id);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(
                new HttpError("Unauthorized", 401, {
                    message: `Invalid username or password, ${error}`,
                })
            );
        }
    },
    logout: () => {
        sessionStorage.clear();
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        sessionStorage.getItem("jwt") ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(undefined),
    getIdentity: () => {
        const persistedUser = sessionStorage.getItem("user");
        const user = persistedUser ? JSON.parse(persistedUser) : null;
        return Promise.resolve(user);
    },
};

export default authProvider;
