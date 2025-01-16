import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import Header from "../components/Header/Header";

const API_URL = process.env.REACT_APP_API_URL;

const CustomerPage = () => {
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

  const uniqueBillsData = billsData.filter(
    (value, index, self) =>
      self.findIndex((bill) => bill.customerName === value.customerName) === index
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR");
  };

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Oluşturulma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (render) => formatDate(render),
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6 overflow-y-auto max-h-[calc(100vh_-_100px)] border-b">
        <h1 className="text-4xl font-bold text-center mb-4">Müşteriler</h1>
        <Table
          rowKey={(record) => record._id}
          dataSource={uniqueBillsData}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1200,
            y: 300,
          }}
        />
      </div>
    </>
  );
};

export default CustomerPage;
