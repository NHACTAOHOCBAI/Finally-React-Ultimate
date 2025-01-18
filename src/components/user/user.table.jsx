
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import UpdateUserModal from './update.user.modal';

const UserTable = (props) => {
    const { dataUser } = props;
    const columns = [
        {
            title: 'ID',
            render: (_, record) => {
                return (
                    <a href='adad'>{record.id}</a>
                )
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Body',
            dataIndex: 'body',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', gap: "20px" }}>
                        <EditOutlined style={{ color: 'orange' }} />
                        <DeleteOutlined style={{ color: "red" }} />
                    </div>
                )
            }
        },
    ];
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUser}
            />
            <UpdateUserModal />
        </>
    )
}

export default UserTable;