import { Button, Form, Input, notification } from "antd"
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await registerUserAPI(values.fullName, values.email, values.phone, values.password)
        if (res.data) {
            notification.success({
                message: "register account",
                description: "Đăng ký thành công"
            })
            navigate("/login")
        }
    }
    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
        >
            <div style={{
                margin: "50px"
            }}>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/\d+/g),
                            message: "Wrong format!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <div>
                    <Button
                        type='primary'
                        onClick={() => form.submit()}
                    >Register</Button>
                </div>
            </div>
        </Form>
    )
}
export default RegisterPage