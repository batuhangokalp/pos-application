import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
      <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
      <Form layout="vertical">
        <Form.Item
          label="E-mail"
          name={"email"}
          rules={[
            {
              required: true,
              message: "E-mail Alanı Boş Bırakılamaz!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Şifre"
          name={"password"}
          rules={[
            {
              required: true,
              message: "Şifre Alanı Boş Bırakılamaz!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name={"remember"} valuePropName="checked">
          <div className="flex justify-between items-center">
            <Checkbox>Remember me</Checkbox>
            <Link>Forgot Password?</Link>
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            size="large"
          >
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-center absolute left-0 bottom-10 w-full">
        Henüz bir hesabınız yok mu?&nbsp;
        <Link to="/register" className="text-blue-600">
          Şimdi kaydol
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
