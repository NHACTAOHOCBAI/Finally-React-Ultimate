import UserForm from "../components/user/user.form"
import UserTable from "../components/user/user.table"
import { fetchAllUser } from '../services/api.service';
import { useEffect, useState } from 'react';

const UserPage = () => {
    const [dataUser, setDataUser] = useState([])
    useEffect(() => {
        loadUser();
    }, [])
    // chay 1 lan khi giao dien da load xong
    const loadUser = async () => {
        const res = await fetchAllUser();
        setDataUser(res.data)
    }
    return (
        <div style={{ padding: '20px' }}>
            <UserForm
                loadUser={loadUser}
            />
            <UserTable
                dataUser={dataUser}
                loadUser={loadUser}
            />
        </div>
    )
}
export default UserPage