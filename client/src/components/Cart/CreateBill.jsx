import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCartAsync } from "../../redux/cartSlice";

const API_URL = process.env.REACT_APP_API_URL;

const CreateBill = ({
  isModalOpen,
  setIsModalOpen,
  getTotalPrice,
  KDV,
  cartItems,
  userId,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/api/bills`, {
        customerName: values.customerName,
        phoneNumber: values.phoneNumber,
        paymentMethod: values.paymentMethod,
        cartItems: cartItems,
        subTotal: getTotalPrice(),
        tax: KDV,
        totalAmount: getTotalPrice() + KDV,
      });
      if (response.status === 201) {
        message.success("Sipariş başarıyla oluşturuldu");
        form.resetFields();
        setIsModalOpen(false);
        dispatch(clearCartAsync(userId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Müşteri Adı"
          name="customerName"
          rules={[
            {
              required: true,
              message: "Müşteri adı zorunlu",
            },
          ]}
        >
          <Input placeholder="Müşteri Adını Girin" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Telefon numarası alanı zorunlu",
            },
          ]}
          name="phoneNumber"
          label="Telefon Numarası"
        >
          <Input placeholder="Telefon Numarasını Girin" maxLength={11} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Ödeme yöntemi alanı zorunlu",
            },
          ]}
          label="Ödeme Yöntemi"
          name="paymentMethod"
        >
          <Select placeholder="Ödeme Yöntemini Seçin">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>{getTotalPrice()?.toFixed(2)} ₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %8</span>
            <span className="text-red-600">+{KDV.toFixed(2)} ₺</span>
          </div>
          <div className="flex justify-between">
            <b>Toplam</b>
            <b> {(getTotalPrice() + KDV).toFixed(2)} ₺</b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cartItems.length < 1}
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};
export default CreateBill;
