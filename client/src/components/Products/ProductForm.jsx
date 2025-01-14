import { Button, Form, Input, InputNumber, Select } from "antd";

const ProductForm = ({ onFinish, form, categoriesData, type }) => {
  return (
    <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
      <Form.Item
        label="Ürün Adı"
        name="title"
        rules={[
          {
            required: true,
            message: "Ürün adı alanı boş bırakılamaz!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ürün Görseli (Link)"
        name="img"
        rules={[
          {
            required: true,
            message: "Ürün görseli alanı boş bırakılamaz!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ürün Fiyatı"
        name="price"
        rules={[
          {
            required: true,
            message: "Ürün fiyatı alanı boş bırakılamaz!",
          },
        ]}
      >
        <InputNumber className="w-full" />
      </Form.Item>

      <Form.Item
        label="Ürün Kategorisi"
        name="category"
        rules={[
          {
            required: true,
            message: "Ürün kategorisi alanı boş bırakılamaz!",
          },
        ]}
      >
        <Select>
          {categoriesData?.map((category) => (
            <Select.Option key={category?._id} value={category?.title}>
              {category?.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          {type === "add" ? "Oluştur" : "Güncelle"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
