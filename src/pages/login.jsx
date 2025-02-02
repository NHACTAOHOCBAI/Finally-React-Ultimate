import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd"
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const onFinish = async (values) => {
        setLoading(true);
        const res = await loginAPI(values.email, values.password)
        if (res.data) {
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/");
        }
        else {
            notification.error({
                message: "failed"
            });
        }
        setLoading(false)
    }
    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
            style={{ margin: "10px" }}
        >
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
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
                        <Input.Password onKeyDown={(event) => {
                            if (event.key === 'Enter')
                                form.submit();
                        }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Button
                        loading={loading}
                        type='primary'
                        onClick={() => form.submit()}
                    >Login</Button>
                    <Link to='/'>
                        <span>Go to homepage</span>
                    </Link>
                    <Divider />
                    <div>Bạn chưa có tài khoản?<Link to='/register'>Đăng ký tại đây</Link></div>
                </Col>
            </Row>
        </Form >
    )
}
export default LoginPage