import { Button, Input, notification, Modal, Select, InputNumber, Form, Row, Col } from 'antd';
import { useState } from 'react';
import { createBookAPI, handleUploadFile } from '../../services/api.service';
import { Option } from 'antd/es/mentions';
const UncontrolledBookForm = (props) => {
    const [form] = Form.useForm();
    const { loadBook } = props;
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
    const handleClickOK = () => {
        form.submit();
    }
    const onFinish = async (values) => {
        console.log(values);
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Hay nhap anh"
            })
            return;
        }
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            const res = await createBookAPI(newAvatar, values.mainText, values.author, values.price, values.quantity, values.category)
            if (res.data) {
                resetAndCloseModal();
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
        form.resetFields();
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
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                    style={{ margin: "10px" }}
                >
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
        </div>
    )
}
export default UncontrolledBookForm;