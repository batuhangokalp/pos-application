import { Button, Spin, Table } from "antd";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import PrintBill from "../components/Bills/PrintBill";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billsData, setBillsData] = useState([]);
  const [customerBill, setCustomerBill] = useState();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR");
  };

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

  const openPrintBill = (lineItem) => {
    setIsModalOpen(true);
    setCustomerBill(lineItem);
  };

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
    {
      title: "Ödeme Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (render) => formatDate(render),
    },
    {
      title: "İşlem",
      dataIndex: "action",
      key: "action",
      render: (text, render) => {
        return (
          <Button
            type="link"
            className="pl-0"
            onClick={() => openPrintBill(render)}
          >
            Yazdır
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Header />
      {billsData.length > 0 ? (
        <div className="px-6 overflow-y-auto max-h-[calc(100vh_-_300px)] border-b">
          <h1 className="text-4xl font-bold text-center mb-4">Faturalar</h1>
          <Table
            rowKey={(record) => record._id}
            dataSource={billsData}
            columns={columns}
            bordered
            pagination={false}
            scroll={{
              x: 1000,
              y: 300,
            }}
          />
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}

      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customerBill={customerBill}
      />
    </>
  );
};

export default BillPage;
