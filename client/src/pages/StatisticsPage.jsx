import { useEffect, useState } from "react";
import { Area, Pie } from "@ant-design/plots";
import axios from "axios";
import Header from "../components/Header/Header";
import StatisticCard from "../components/Statistics/StatisticCard";
import { Spin } from "antd";

const API_URL = process.env.REACT_APP_API_URL;
const storedAuth = JSON.parse(localStorage.getItem("storedUser"));

const StatisticsPage = () => {
  const [productData, setProductData] = useState([]);
  const [billsData, setBillsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, billsResponse] = await Promise.all([
          axios.get(`${API_URL}/api/products`),
          axios.get(`${API_URL}/api/bills`),
        ]);

        setProductData(productsResponse.data);
        setBillsData(billsResponse.data);
      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    };

    fetchData();
  }, []);

  const handleCalculateTotalEarn = () => {
    const totalEarn = billsData?.reduce(
      (acc, billData) => acc + billData.totalAmount,
      0
    );
    return totalEarn.toFixed(2);
  };

  // const handleFindTotalCustomer = () => {
  //   const totalCustomers = [];
  //   billsData?.forEach((billData) => {
  //     if (!totalCustomers.includes(billData.customerName)) {
  //       totalCustomers.push(billData.customerName);
  //     }
  //   });
  //   return totalCustomers;
  // };

  const handleFindTotalCustomer = () => {
    const totalCustomers = new Set();
    billsData?.forEach((billData) => {
      totalCustomers.add(billData.customerName);
    });
    return Array.from(totalCustomers);
  };
  const uniqueCustomers = handleFindTotalCustomer();

  const config = {
    data: billsData,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data: billsData,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeğer",
      },
    },
  };
  return (
    <>
      <Header />

      {productData.length > 0 && billsData.length > 0 ? (
        <div className="px-6 md:pb-0 pb-20 overflow-y-auto max-h-[calc(100vh_-_120px)]">
          <h1 className="text-4xl font-bold text-center mb-4">İstatistikler</h1>
          <div>
            <h2 className="text-lg">
              Hoş geldin{" "}
              <span className="text-green-700 font-bold">
                {storedAuth.username}!
              </span>
            </h2>
          </div>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={uniqueCustomers.length}
              img={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={`${handleCalculateTotalEarn()} ₺`}
              img={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={billsData.length}
              img={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={productData?.length}
              img={"images/product.png"}
            />
          </div>
          <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
            <div className="lg:w-1/2 lg:h-full h-72">
              <Area {...config} />
            </div>
            <div className="relative lg:w-1/2 lg:h-full h-72 flex items-center justify-center">
              <Pie {...config2} />
            </div>
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
};

export default StatisticsPage;
