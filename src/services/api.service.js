import axios from './axios.customize';
const createUserAPI = (fullName, email, phone, password) => {
    const URL_Backend = "/posts";
    const data = {
        fullName: fullName,
        email: email,
        phone: phone,
        password: password
    }
    return axios.post(URL_Backend, data);
}
const fetchAllUser = () => {
    const URL_Backend = "/posts";
    return axios.get(URL_Backend);
}
export {
    createUserAPI,
    fetchAllUser
}