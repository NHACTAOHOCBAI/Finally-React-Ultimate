import { Button, Drawer, notification } from "antd"
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewDetail = (props) => {
    const { loadUser, setDataView, dataView, isModalDetailOpen, setIsModalDetailOpen } = props
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState()

    const handleOnChangeFile = async (event) => {
        if (!event.target.files || event.target.files.length == 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }
    const handleUpdateAvatar = async () => {
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(dataView._id, newAvatar, dataView.fullName, dataView.phone)
            if (resUpdateAvatar.data) {
                setIsModalDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();
                notification.success({
                    message: "Update user avatar",
                    description: JSON.stringify(resUpload.message)
                })
            }
            else {
                notification.error({
                    message: "Error update file",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        }
        else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }
    return (
        <Drawer title="Basic Drawer"
            open={isModalDetailOpen}
            onClose={() => {
                setSelectedFile(null);
                setPreview(null);
                setDataView(null);
                setIsModalDetailOpen(false)
            }}>
            {dataView ?
                <>
                    <p>{`ID :${dataView._id}`}</p>
                    <p>{`Full Name :${dataView.fullName}`}</p>
                    <p>{`Email :${dataView.email}`}</p>
                    <div>
                        <img
                            width={100}
                            height={100}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataView.avatar}`} />
                    </div>
                    <div>
                        <label htmlFor="btnUpload">Up Load file</label>
                        <input type="file"
                            hidden id='btnUpload'
                            onChange={handleOnChangeFile}
                        // nhung tham so dau vao cua onchange se tu dong vao ham kia
                        />
                    </div>
                    {
                        preview &&
                        <div>
                            <img
                                width={100}
                                height={100}
                                src={preview} />
                            <br />
                            <Button
                                onClick={() => handleUpdateAvatar()}
                                type="primary">Save</Button>
                        </div>

                    }
                </>
                :
                <>
                    <p> have no data</p>
                </>}
        </Drawer>
    )
}
export default ViewDetail