import { Button, Input } from 'antd';
import { useState } from 'react';
import axios from 'axios';
const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const handleClickBtn = () => {
        const URL_Backend = "https://jsonplaceholder.typicode.com/posts";
        const data = {
            fullName: fullName,
            email: email,
            phone: phone,
            password: password
        }
        axios.post(URL_Backend, data);
        console.log({ fullName, email, phone, password });
    }
    return (
        <div className='user-form' style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: '15px', flexDirection: 'column' }}>
                <div>
                    <span>Full Name</span>
                    <Input
                        onChange={(event) => { setFullName(event.target.value) }}
                        value={fullName}
                    />
                </div>
                <div>
                    <span>Email</span>
                    <Input
                        onChange={(event) => { setEmail(event.target.value) }}
                        value={email}
                    />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password
                        onChange={(event) => { setPassword(event.target.value) }}
                        value={password}
                    />
                </div>
                <div>
                    <span>Phone Number</span>
                    <Input
                        onChange={(event) => { setPhone(event.target.value) }}
                        value={phone}
                    />
                </div>
                <div>
                    <Button
                        onClick={() => handleClickBtn()}
                        type='primary'> Create User</Button>
                </div>
            </div>
        </div>
    )
}
export default UserForm;