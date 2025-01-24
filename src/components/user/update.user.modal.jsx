import { useEffect, useState } from "react";
import { Input, notification, Modal } from 'antd';
import { updateUserAPI } from "../../services/api.service";
const UpdateUserModal = (props) => {
    const [_id, set_id] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props
    useEffect(() => {
        if (dataUpdate) {
            setFullName(dataUpdate.fullName)
            setEmail(dataUpdate.email)
            setPhone(dataUpdate.phone)
            set_id(dataUpdate._id)
        }
    }, [dataUpdate])
    const handleClickOK = async () => {
        const res = await updateUserAPI(_id, fullName, email, phone)
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
        set_id("");
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
                    <span>ID</span>
                    <Input
                        onChange={(event) => { set_id(event.target.value) }}
                        value={_id}
                    />
                </div>
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