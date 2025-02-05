import { useEffect, useState } from "react";
import { Input, notification, Modal, InputNumber, Select } from 'antd';
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookModal = (props) => {
    const [_id, set_id] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState()
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadBook } = props
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
    useEffect(() => {
        if (dataUpdate) {
            setMainText(dataUpdate.mainText)
            setAuthor(dataUpdate.author)
            setPrice(dataUpdate.price)
            setQuantity(dataUpdate.quantity)
            setCategory(dataUpdate.category)
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
            setSelectedFile(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
            set_id(dataUpdate._id)
        }
    }, [dataUpdate])
    const handleClickOK = async () => {
        let resUpload = dataUpdate.thumbnail;
        if (selectedFile !== `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`) {
            resUpload = await handleUploadFile(selectedFile, "book");
            resUpload = resUpload.data.fileUploaded;
        }
        const res = await updateBookAPI(_id, mainText, author, price, quantity, category, resUpload)
        if (res.data) {
            notification.success({
                message: "Update user",
                description: "Update user successfully"
            })
            await loadBook();
        }
        else {
            notification.error({
                message: "error",
                description: JSON.stringify(res.message)
            })
        }
        resetAndCloseModal();
    }
    const resetAndCloseModal = () => {
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setPreview("")
        setSelectedFile("")
        set_id("")
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
                        value={_id}
                    />
                </div>
                <div>
                    <span>Tiêu đề</span>
                    <Input
                        onChange={(event) => { setMainText(event.target.value) }}
                        value={mainText}
                    />
                </div>
                <div>
                    <span>Tác giả</span>
                    <Input
                        onChange={(event) => { setAuthor(event.target.value) }}
                        value={author}
                    />
                </div>
                <div>
                    <span>Giá</span>
                    <InputNumber
                        style={{ width: "100%" }}
                        onChange={(event) => { setPrice(event) }}
                        value={price}
                    />
                </div>
                <div>
                    <span>Số lượng</span>
                    <InputNumber
                        style={{ width: "100%" }}
                        onChange={(event) => { setQuantity(event) }}
                        value={quantity}
                    />
                </div>
                <div>
                    <span>Danh mục</span>
                    <Select
                        value={category}
                        onChange={(event) => { setCategory(event) }}
                        style={{
                            width: "100%"
                        }}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },
                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' }]}
                    />
                </div>
                <div>
                    <label htmlFor="btnUpload">Ảnh thumbnail</label>
                    <input type="file"
                        hidden id='btnUpload'
                        onChange={handleOnChangeFile}
                        onClick={(event) => event.target.value = null}
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
                    </div>
                }
            </div>
        </Modal>
    )
}
export default UpdateBookModal