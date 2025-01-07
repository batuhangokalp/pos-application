import { Badge, Input } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Header = () => {
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <a href="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </a>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input
            size="large"
            placeholder="Ürün Ara.."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
          />
        </div>
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 left-0 md:w-auto w-full bg-white md:bg-transparent md:border-t-0 border-t md:px-0 px-4 py-1">
          <a
            href="/"
            className="flex flex-col items-center hover:text-[#40a9ff] transition-all"
          >
            <HomeOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs ">Ana Sayfa</span>
          </a>
          <Badge count="5" className="md:flex hidden">
            <a
              href="/"
              className="flex flex-col items-center hover:text-[#40a9ff] transition-all"
            >
              <ShoppingCartOutlined className="text-xl md:text-2xl" />
              <span className="text-[10px] md:text-xs ">Sepet</span>
            </a>
          </Badge>

          <a
            href="/"
            className="flex flex-col items-center hover:text-[#40a9ff] transition-all"
          >
            <CopyOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs ">Faturalar</span>
          </a>
          <a
            href="/"
            className="flex flex-col items-center hover:text-[#40a9ff] transition-all"
          >
            <UserOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs ">Müşteriler</span>
          </a>
          <a
            href="/"
            className="flex flex-col items-center hover:text-[#40a9ff] transition-all"
          >
            <BarChartOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs ">İstatistikler</span>
          </a>
          <a
            href="/"
            className="flex flex-col items-center hover:text-[#40a9ff] transition-all"
          >
            <LogoutOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs ">Çıkış</span>
          </a>
        </div>
        <Badge count="5" className="md:hidden flex">
          <a
            href="/"
            className="flex flex-col items-center hover:text-[#40a9ff] transition-all"
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="text-[10px] md:text-xs ">Sepet</span>
          </a>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
