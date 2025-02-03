import { useState } from "react";
import { handleUploadFile, updateBookAvatarAPI } from "../../services/api.service";
import { Button, Drawer, notification } from "antd";

const ViewBookDetail = (props) => {
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
            const resUpdateAvatar = await updateBookAvatarAPI(dataView._id, newAvatar, dataView.fullName, dataView.phone)
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
                    <p>{`Tiêu đề :${dataView.mainText}`}</p>
                    <p>{`Tác giả :${dataView.author}`}</p>
                    <p>{`Thể loại :${dataView.category}`}</p>
                    <p>{`Giá :${new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }).format(dataView.price)}`}</p>
                    <p>{`Số lượng :${dataView.quantity}`}</p>
                    <p>{`Đã bán :${dataView.sold}`}</p>
                    <div>
                        <img
                            width={100}
                            height={100}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataView.thumbnail}`} />
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
export default ViewBookDetail