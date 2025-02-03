import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useState } from "react";
import ViewBookDetail from "./view.book.detail";

const BookTable = (props) => {
    const [dataView, setDataView] = useState(null);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const { dataUser, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;
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
            render: () => {
                return (
                    <div style={{ display: 'flex', gap: "20px" }}>
                        <EditOutlined />
                        <DeleteOutlined
                            style={{ color: "red" }} />
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
            <ViewBookDetail
                loadUser={loadUser}
                dataView={dataView}
                setDataView={setDataView}
                isModalDetailOpen={isModalDetailOpen}
                setIsModalDetailOpen={setIsModalDetailOpen}
            />
        </>
    )
}
export default BookTable