import axios from './axios.customize';
const createUserAPI = (fullName, email, phone, password) => {
    const URL_Backend = "api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        phone: phone,
        password: password
    }
    return axios.post(URL_Backend, data);
}
//hihi an tet
const registerUserAPI = (fullName, email, phone, password) => {
    const URL_Backend = "api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        phone: phone,
        password: password
    }
    return axios.post(URL_Backend, data);
}
//mong 1 tet
const loginAPI = (email, password) => {
    const URL_Backend = "api/v1/auth/login";
    const data = {
        username: email,
        password: password,
        delay: 2000
    }
    return axios.post(URL_Backend, data);
}
const updateUserAPI = (_id, fullName, email, phone) => {
    const URL_Backend = "api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        phone: phone,
        _id: _id
    }
    return axios.put(URL_Backend, data);
}
const deleteUserAPI = (_id) => {
    const URL_Backend = `api/v1/user/${_id}`;
    return axios.delete(URL_Backend);
}
const fetchAllUser = (current, pageSize) => {
    const URL_Backend = `api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_Backend);
}
const fetchAllBook = (current, pageSize) => {
    const URL_Backend = `api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_Backend);
}
const getAccountAPI = () => {
    const URL_Backend = "/api/v1/auth/account";
    return axios.get(URL_Backend);
}
const logoutAPI = () => {
    const URL_Backend = "/api/v1/auth/logout";
    return axios.post(URL_Backend);
}
const handleUploadFile = (file, folder) => {
    const URL_Backend = "api/v1/file/upload";
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file)
    return axios.post(URL_Backend, bodyFormData, config)
}
const updateUserAvatarAPI = (_id, avatar, fullName, phone) => {
    const URL_Backend = "api/v1/user";
    const data = {
        avatar: avatar,
        fullName: fullName,
        phone: phone,
        _id: _id
    }
    return axios.put(URL_Backend, data);
}
const updateBookAvatarAPI = (_id, avatar, fullName, phone) => {
    const URL_Backend = "api/v1/user";
    const data = {
        avatar: avatar,
        fullName: fullName,
        phone: phone,
        _id: _id
    }
    return axios.put(URL_Backend, data);
}
export {
    deleteUserAPI,
    createUserAPI,
    updateUserAPI,
    fetchAllUser,
    handleUploadFile,
    updateUserAvatarAPI,
    registerUserAPI,
    loginAPI,
    getAccountAPI,
    logoutAPI,
    fetchAllBook, updateBookAvatarAPI
}