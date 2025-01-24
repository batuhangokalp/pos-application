import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const LoginForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: values.email,
        password: values.password,
      });
      const user = response.data;
      if (response.status === 200) {
        message.success("Giriş başarılı");
        form.resetFields();
        localStorage.setItem("storedUser", JSON.stringify(user));
        window.location = "/";
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        message.error("Kullanıcı Bilgileri Yanlış");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
      <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
      <Spin
        spinning={loading}
        size="large"
        className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10"
      >
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="E-mail"
            name={"email"}
            className="w-full"
            rules={[
              {
                required: true,
                message: "E-mail Alanı Boş Bırakılamaz",
              },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            label="Şifre"
            name={"password"}
            className="w-full"
            rules={[
              {
                required: true,
                message: "Şifre Alanı Boş Bırakılamaz",
              },
            ]}
          >
            <Input.Password className="w-full" />
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
              loading={loading}
            >
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </Spin>
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
