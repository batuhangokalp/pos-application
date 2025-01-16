import { Button, Card, Table } from "antd";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import PrintBill from "../components/Bills/PrintBill";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billsData, setBillsData] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(`${API_URL}bills`);
        setBillsData(response.data);
      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    };

    fetchBills();
  }, []);

  const columns = [
    {
      title: "Müşteri İsmi",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Ödeme Tutarı",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (render) => `${render.toFixed(2)} ₺`,
    },
  ];
  return (
    <>
      <Header />
      <div className="px-6 overflow-y-auto max-h-[calc(100vh_-_300px)] border-b">
        <h1 className="text-4xl font-bold text-center mb-4">Faturalar</h1>
        <Table
          rowKey={(record) => record._id}
          dataSource={billsData}
          columns={columns}
          bordered
          pagination={false}
        />
      </div>
      <div className="cart-total flex justify-end mt-4 fixed bottom-0 right-0">
        <Card className="w-72">
          <Button
            className="mt-4 w-full"
            type="primary"
            size="large"
            onClick={() => setIsModalOpen(true)}
          >
            Yazdır
          </Button>
        </Card>
      </div>
      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default BillPage;
