import { useEffect, useState } from "react";
import { Input, notification, Modal, InputNumber, Select, Form, Row, Col } from 'antd';
import { handleUploadFile, updateBookAPI } from "../../services/api.service";
import { Option } from "antd/es/mentions";

const UncontrolledUpdateBookModal = (props) => {
    const [form] = Form.useForm();
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
            form.setFieldsValue({
                _id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category,

            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
            setSelectedFile(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])
    const onFinish = async (values) => {
        let resUpload = dataUpdate.thumbnail;
        if (selectedFile !== `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`) {
            resUpload = await handleUploadFile(selectedFile, "book");
            resUpload = resUpload.data.fileUploaded;
        }
        const { _id, mainText, author, price, quantity, category } = values
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
        form.resetFields();
        setPreview("")
        setSelectedFile("")
        setIsModalUpdateOpen(false);
        setDataUpdate(null);
    }
    return (
        <Modal title="Update User"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                style={{ margin: "10px" }}
            >
                <Row justify={"center"}>
                    <Col xs={24} md={24}>
                        <Form.Item
                            label="ID"
                            name="_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input book's id!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={24}>
                        <Form.Item
                            label="Tiêu đề"
                            name="mainText"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input book's title!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={24}>
                        <Form.Item
                            label="Tác giả"
                            name="author"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input book's author",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={24}>
                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input book's price",
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={24}>
                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input book's quantity",
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={24}>
                        <Form.Item
                            label="Danh mục"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input book's category",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                            >
                                <Option value="Arts">Arts</Option>
                                <Option value="Business">Business</Option>
                                <Option value="Comics">Comics</Option>
                                <Option value="Cooking">Cooking</Option>
                                <Option value="Entertainment">Entertainment</Option>
                                <Option value="History">History</Option>
                                <Option value="Music">Music</Option>
                                <Option value="Sports">Sports</Option>
                                <Option value="Teen">Teen</Option>
                                <Option value="Travel">Travel</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
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
            </Form >
        </Modal>
    )
}
export default UncontrolledUpdateBookModal