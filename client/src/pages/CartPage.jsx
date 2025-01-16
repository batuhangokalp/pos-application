import { Button, Card, Table } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import CreateBill from "../components/Cart/CreateBill";
import CalculateQuantity from "../components/Products/CalculateQuantity";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (img) => (
        <img src={img} alt="img" className="w-full h-16 object-cover" />
      ),
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toFixed(2)} ₺`,
    },
    {
      title: "Ürün Miktarı",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => <CalculateQuantity record={record} />,
    },
  ];

  const getTotalPrice = () => {
    return cartItems?.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const KDV = (getTotalPrice() * 8) / 100;
  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          rowKey={(record) => record._id}
          dataSource={cartItems}
          columns={columns}
          bordered
          pagination={false}
        />
      </div>
      <div className="cart-total flex justify-end mt-4">
        <Card className="w-72">
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
          <Button
            className="mt-4 w-full"
            type="primary"
            size="large"
            onClick={() => setIsModalOpen(true)}
            disabled={cartItems.length < 1}
          >
            Sipariş Oluştur
          </Button>
        </Card>
      </div>
      <CreateBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        getTotalPrice={getTotalPrice}
        KDV={KDV}
      />
    </>
  );
};

export default CartPage;
