import { Button, Input, notification, Modal, Select, InputNumber } from 'antd';
import { useState } from 'react';
import { createBookAPI, handleUploadFile } from '../../services/api.service';
const BookForm = (props) => {
    const { loadBook } = props;
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState()
    const handleClickBtn = () => {
        setIsModalOpen(true)
    }
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
    const handleClickOK = async () => {
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            const res = await createBookAPI(newAvatar, mainText, author, price, quantity, category)
            if (res.data) {
                setIsModalOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadBook();
                notification.success({
                    message: "create book successfully",
                })
            }
            else {
                notification.error({
                    message: "failed create",
                    description: JSON.stringify(res.message)
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
    const resetAndCloseModal = () => {
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile("");
        setPreview("");
        setIsModalOpen(false);
    }
    return (
        <div className='book-form' style={{ margin: "20px 0" }}>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button
                    onClick={() => handleClickBtn()}
                    type='primary'> Create Book</Button>
            </div>
            <Modal title="Create Book"
                open={isModalOpen}
                onOk={() => handleClickOK()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
            >
                <div style={{ display: "flex", gap: '15px', flexDirection: 'column' }}>
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
                        <br />
                        <InputNumber
                            onChange={(event) => { setPrice(event) }}
                            value={price}
                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <br />
                        <InputNumber
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
                                width: 200,
                                margin: 10
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
        </div>
    )
}
export default BookForm;