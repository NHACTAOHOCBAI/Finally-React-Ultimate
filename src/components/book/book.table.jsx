import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Table } from "antd";
import { useState } from "react";
import ViewBookDetail from "./view.book.detail";
import UpdateBookModal from "./update.book";
import { deleteBookAPI } from "../../services/api.service";
import UncontrolledUpdateBookModal from "./update.book.uncontrolled";

const BookTable = (props) => {
    const [dataView, setDataView] = useState(null);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const { dataUser, loadBook, current, pageSize, total, setCurrent, setPageSize } = props;
    const handleClickDelete = async (_id) => {
        const res = await deleteBookAPI(_id)
        if (res.data) {
            notification.success({
                message: "Delete book",
                description: "Delete book successfully"
            })
            await loadBook();
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
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text) => {
                if (text)
                    return new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }).format(text)
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
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
            <UncontrolledUpdateBookModal
                loadBook={loadBook}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
            />
            <ViewBookDetail
                dataView={dataView}
                setDataView={setDataView}
                isModalDetailOpen={isModalDetailOpen}
                setIsModalDetailOpen={setIsModalDetailOpen}
            />
        </>
    )
}
export default BookTable