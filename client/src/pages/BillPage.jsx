import { Button, Input, Space, Spin, Table } from "antd";
import Header from "../components/Header/Header";
import { useEffect, useRef, useState } from "react";
import PrintBill from "../components/Bills/PrintBill";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const API_URL = process.env.REACT_APP_API_URL;

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billsData, setBillsData] = useState([]);
  const [customerBill, setCustomerBill] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch("", confirm, dataIndex);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Müşteri İsmi",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName"),

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
      sorter: (a, b) => a.totalAmount - b.totalAmount,

    },
    {
      title: "Ödeme Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (render) => formatDate(render),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
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
