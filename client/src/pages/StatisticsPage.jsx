import Header from "../components/Header/Header";
import StatisticCard from "../components/Statistics/StatisticCard";
import { Area, Pie } from "@ant-design/plots";

const StatisticsPage = () => {
  const config = {
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/aapl.json",
    },
    xField: (d) => new Date(d.date),
    yField: "close",
  };

  const config2 = {
    data: [
      { type: "分类一", value: 27 },
      { type: "分类二", value: 25 },
      { type: "分类三", value: 18 },
      { type: "分类四", value: 15 },
      { type: "分类五", value: 10 },
      { type: "其他", value: 5 },
    ],
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return (
    <>
      <Header />
      <div className="px-6 md:pb-0 pb-20">
        <h1 className="text-4xl font-bold text-center mb-4">İstatistikler</h1>
        <div>
          <h2 className="text-lg">
            Hoş geldin <span className="text-green-700 font-bold">Admin!</span>
          </h2>
        </div>
        <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
          <StatisticCard
            title={"Toplam Müşteri"}
            amount={"10"}
            img={"images/user.png"}
          />
          <StatisticCard
            title={"Toplam Kazanç"}
            amount={"660.96 ₺"}
            img={"images/money.png"}
          />
          <StatisticCard
            title={"Toplam Satış"}
            amount={"6"}
            img={"images/sale.png"}
          />
          <StatisticCard
            title={"Toplam Ürün"}
            amount={"28"}
            img={"images/product.png"}
          />
        </div>
        <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
          <div className="lg:w-1/2 lg:h-full h-72">
            <Area {...config} />
          </div>
          <div className="lg:w-1/2 lg:h-full h-72">
            <Pie {...config2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsPage;
