import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { BookOutlined, HomeOutlined, LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { AuthContext } from '../context/auth.context';
const Header = () => {
    const [current, setCurrent] = useState('home');
    const { user } = useContext(AuthContext);
    const onClick = (e) => {
        setCurrent(e.key);
    };
    const items = [
        {
            label: <Link to={'/'}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={'/users'}>User</Link>,
            key: 'user',
            icon: <UserOutlined />,
        },
        {
            label: <Link to={'/books'}>Book</Link>,
            key: 'book',
            icon: <BookOutlined />,
        },
        ...(!user.id ? [{
            label: <Link to={'/login'}>Login</Link>,
            key: 'login',
            icon: <LoginOutlined />
        }] : [
            {
                label: `Welcome ${user.fullName}`,
                key: 'setting',
                icon: <SettingOutlined />,
                children: [

                    {
                        label: 'Log Out',
                        key: 'logout',
                    },
                ],
            },
        ]),
    ];
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}
export default Header