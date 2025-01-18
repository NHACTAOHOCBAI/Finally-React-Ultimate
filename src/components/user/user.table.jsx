
import { Space, Table, Tag } from 'antd';
import { fetchAllUser } from '../../services/api.service';
import { useEffect, useState } from 'react';

const UserTable = () => {
    const [dataUser, setDataUser] = useState([])
    useEffect(() => {
        loadUser();
    }, [])
    // chay 1 lan khi giao dien da load xong
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Body',
            dataIndex: 'body',
        }
    ];
    const loadUser = async () => {
        const res = await fetchAllUser();
        setDataUser(res.data)
    }
    return (
        <Table
            columns={columns}
            dataSource={dataUser}
        />
    )
}

export default UserTable;