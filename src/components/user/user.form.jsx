import { Button, Input, notification, Modal } from 'antd';
import { useState } from 'react';
import { createUserAPI } from '../../services/api.service';
const UserForm = (props) => {
    const { loadUser } = props;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleClickBtn = () => {
        setIsModalOpen(true)
    }
    //new user
    const handleClickOK = async () => {
        const res = await createUserAPI(fullName, email, phone, password)
        if (res.data) {
            notification.success({
                message: "create user",
                description: "Tạo mới người dùng thành công"
            })
            await loadUser();
        }
        resetAndCloseModal();
    }
    //
    // set empty
    const resetAndCloseModal = () => {
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setIsModalOpen(false);
    }
    //
    return (
        <div className='user-form' style={{ margin: "20px 0" }}>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button
                    onClick={() => handleClickBtn()}
                    type='primary'> Create User</Button>
            </div>
            <Modal title="Create User"
                open={isModalOpen}
                onOk={() => handleClickOK()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
            >
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
                </div>
            </Modal>
        </div>
    )
}
export default UserForm;