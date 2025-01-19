
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewDetail from './view.user.detail';
const UserTable = (props) => {
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataView, setDataView] = useState(null);
    const [open, setOpen] = useState(false);
    const { dataUser, loadUser } = props;
    const columns = [
        {
            title: 'ID',
            render: (_, record) => {
                return (
                    <div onClick={() => {
                        setDataView(record);
                        setOpen(true);
                    }}>{record.id}</div>
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
                        <EditOutlined
                            onClick={() => {
                                setDataUpdate(record);
                                setIsModalUpdateOpen(true)
                            }}
                            style={{ color: 'orange' }} />
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
            <UpdateUserModal
                loadUser={loadUser}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
            />
            <ViewDetail
                dataView={dataView}
                setDataView={setDataView}
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}

export default UserTable;