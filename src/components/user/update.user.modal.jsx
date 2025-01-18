import { useState } from "react";
import { Input, notification, Modal } from 'antd';
import { createUserAPI } from "../../services/api.service";
const UpdateUserModal = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(true)
    const handleClickBtn = () => {
        setIsModalOpen(true)
    }
    const handleClickOK = async () => {
        const res = await createUserAPI(fullName, email, phone, password)
        console.log(res.data);
        if (res.data) {
            notification.success({
                message: "Update user",
                description: "Tạo mới người dùng thành công"
            })
            // await loadUser();
        }
        resetAndCloseModal();
    }
    const resetAndCloseModal = () => {
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setIsModalOpen(false);
    }
    return (
        <Modal title="Update User"
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
    )
}
export default UpdateUserModal