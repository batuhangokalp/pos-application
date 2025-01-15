import { Button, Form, Input } from "antd";

const CategoryForm = ({ onFinish, form, type }) => {
  return (
    <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
      <Form.Item
        label="Kategori İsmi"
        name="categoryName"
        rules={[
          {
            required: true,
            message: "Kategori alanı boş bırakılamaz",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          {type === "add" ? "Oluştur" : "Güncelle"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
