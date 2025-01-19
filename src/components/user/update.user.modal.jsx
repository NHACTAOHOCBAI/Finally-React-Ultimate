import { useEffect, useState } from "react";
import { Input, notification, Modal } from 'antd';
import { updateUserAPI } from "../../services/api.service";
const UpdateUserModal = (props) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props
    useEffect(() => {
        if (dataUpdate) {
            setFullName(dataUpdate.userId)
            setEmail(dataUpdate.id)
            setPhone(dataUpdate.title)
            setPassword(dataUpdate.body)
        }
        console.log(dataUpdate);
    }, [dataUpdate])
    const handleClickOK = async () => {
        const res = await updateUserAPI(fullName, email, phone, password)
        console.log(res.data);
        if (res.data) {
            notification.success({
                message: "Update user",
                description: "Update user successfully"
            })
            await loadUser();
        }
        resetAndCloseModal();
    }
    const resetAndCloseModal = () => {
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setIsModalUpdateOpen(false);
        setDataUpdate(null);
    }
    return (
        <Modal title="Update User"
            open={isModalUpdateOpen}
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