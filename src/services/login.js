import axios from "axios";

export const loginUser = async ({username, password}) => {
    const urlApi = `https://dummyjson.com/auth/login`;
    const response = await axios({
        method: 'post',
        url: urlApi,
        data: {
            username: username,
            password: password
        },
        headers: { 'Content-Type': 'application/json' }
    });
    return (response.status === 200 || response.status === 400) ? response.data : {};
}