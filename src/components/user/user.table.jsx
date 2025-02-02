
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Popconfirm, notification } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';
const UserTable = (props) => {
    const [dataUpdate, setDataUpdate] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataView, setDataView] = useState(null);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const { dataUser, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;
    const handleClickDelete = async (_id) => {
        const res = await deleteUserAPI(_id)
        if (res.data) {
            notification.success({
                message: "Delete user",
                description: "Delete user successfully"
            })
            await loadUser();
        }
    }
    const onChange = (pagination) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    }
    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>{index + 1 + pageSize * (current - 1)}</>
                )
            }
        },
        {
            title: 'ID',
            render: (_, record) => {

                return (
                    <div onClick={() => {
                        setDataView(record);
                        setIsModalDetailOpen(true);
                    }}>{record._id}</div>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
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
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this user?"
                            onConfirm={() => { handleClickDelete(record._id) }}
                            onCancel={() => { }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined
                                style={{ color: "red" }} />
                        </Popconfirm>
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
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => {
                            return (
                                <div> {range[0]}-{range[1]} trên {total} rows</div>
                            )
                        }
                    }
                }
                onChange={onChange}
            />
            <UpdateUserModal
                loadUser={loadUser}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
            />
            <ViewDetail
                loadUser={loadUser}
                dataView={dataView}
                setDataView={setDataView}
                isModalDetailOpen={isModalDetailOpen}
                setIsModalDetailOpen={setIsModalDetailOpen}
            />
        </>
    )
}

export default UserTable;