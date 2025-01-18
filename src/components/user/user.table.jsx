
import { Table } from 'antd';

const UserTable = (props) => {
    const { dataUser } = props;
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
    return (
        <Table
            columns={columns}
            dataSource={dataUser}
        />
    )
}

export default UserTable;