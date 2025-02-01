import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { AuthContext } from '../context/auth.context';
const Header = () => {
    const [current, setCurrent] = useState('home');
    const { user } = useContext(AuthContext);
    const onClick = (e) => {
        setCurrent(e.key);
    };
    console.log(user);
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