import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { BookOutlined, HomeOutlined, LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';
const Header = () => {
    const [current, setCurrent] = useState('home');
    const { user, setUser } = useContext(AuthContext);
    const onClick = (e) => {
        setCurrent(e.key);
    };
    const navigate = useNavigate();
    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            localStorage.removeItem("access_token");
            message.success("logout thành công");
            navigate("/");
        }
    }
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
                        label: <span onClick={() => handleLogout()}> Log out</span>,
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