import { Badge, Input } from "antd";
import { Link } from "react-router-dom";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to={"/"}>
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
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
          <Link
            to={"/"}
            className="header-link"
          >
            <HomeOutlined className="header-link-icon" />
            <span className="header-link-span ">Ana Sayfa</span>
          </Link>
          <Badge count={cartItems?.length} className="md:flex hidden">
            <Link
              to={"/cart"}
              className="header-link"
            >
              <ShoppingCartOutlined className="header-link-icon" />
              <span className="header-link-span ">Sepet</span>
            </Link>
          </Badge>

          <Link
            to={"/bills"}
            className="header-link"
          >
            <CopyOutlined className="header-link-icon" />
            <span className="header-link-span ">Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className="header-link"
          >
            <UserOutlined className="header-link-icon" />
            <span className="header-link-span ">Müşteriler</span>
          </Link>
          <Link
            to={"/statistics"}
            className="header-link"
          >
            <BarChartOutlined className="header-link-icon" />
            <span className="header-link-span ">İstatistikler</span>
          </Link>
          <Link
            to={"/cart"}
            className="header-link"
          >
            <LogoutOutlined className="header-link-icon" />
            <span className="header-link-span ">Çıkış</span>
          </Link>
        </div>
        <Badge count="5" className="md:hidden flex">
          <Link
            to={"/cart"}
            className="header-link"
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="header-link-span ">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
