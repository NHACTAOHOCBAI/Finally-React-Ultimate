import { Link } from 'react-router-dom'
import { useState } from 'react';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const Header = () => {
    const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        setCurrent(e.key);
    };
    const items = [
        {
            label: <Link to={'/'}>Home</Link>,
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: <Link to={'/users'}>User</Link>,
            key: 'user',
            icon: <MailOutlined />,
        },
        {
            label: <Link to={'/books'}>Book</Link>,
            key: 'book',
            icon: <MailOutlined />,
        },
        {
            label: 'Setting',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={'/login'}>Login</Link>,
                    key: 'login',
                },
                {
                    label: 'Log Out',
                    key: 'logout',
                },
            ],
        },
    ];
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}
export default Header