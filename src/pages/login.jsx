import { Button, Col, Divider, Form, Input, Row } from "antd"
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values)
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
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Button
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
        </Form>
    )
}
export default LoginPage