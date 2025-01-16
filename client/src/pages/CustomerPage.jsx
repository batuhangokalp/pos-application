import { Table } from "antd";
import Header from "../components/Header/Header";

const CustomerPage = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <>
      <Header />
      <div className="px-6 md:pb-0 pb-20 overflow-y-auto max-h-[calc(100vh_-_120px)]">
        <h1 className="text-4xl font-bold text-center mb-4">Müşteriler</h1>
        <Table
          dataSource={dataSource}
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
