import { Badge, Input, Popconfirm } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const Header = ({ setSearchProducts }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("storedUser");
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to={"/"}>
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Ürün Ara.."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearchProducts(e.target.value)}
          />
        </div>
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 left-0 md:w-auto w-full bg-white md:bg-transparent md:border-t-0 border-t md:px-0 px-4 py-1">
          <Link
            to={"/"}
            className={`header-link ${
              pathname === "/" && "active-header-link"
            }`}
          >
            <HomeOutlined className="header-link-icon" />
            <span className="header-link-span ">Ana Sayfa</span>
          </Link>
          <Badge count={cartItems?.length} className="md:flex hidden">
            <Link
              to={"/cart"}
              className={`header-link ${
                pathname === "/cart" && "active-header-link"
              }`}
            >
              <ShoppingCartOutlined className="header-link-icon" />
              <span className="header-link-span ">Sepet</span>
            </Link>
          </Badge>

          <Link
            to={"/bills"}
            className={`header-link ${
              pathname === "/bills" && "active-header-link"
            }`}
          >
            <CopyOutlined className="header-link-icon" />
            <span className="header-link-span ">Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className={`header-link ${
              pathname === "/customers" && "active-header-link"
            }`}
          >
            <UserOutlined className="header-link-icon" />
            <span className="header-link-span ">Müşteriler</span>
          </Link>
          <Link
            to={"/statistics"}
            className={`header-link ${
              pathname === "/statistics" && "active-header-link"
            }`}
          >
            <BarChartOutlined className="header-link-icon" />
            <span className="header-link-span ">İstatistikler</span>
          </Link>
          <Popconfirm
            title="Çıkış Yap"
            description="Çıkış yapmak istediğinize emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={handleExit}
          >
            <div className="header-link cursor-pointer">
              <LogoutOutlined className="header-link-icon" />
              <span className="header-link-span ">Çıkış</span>
            </div>
          </Popconfirm>
        </div>
        <Badge count={cartItems?.length} className="md:hidden flex">
          <Link to={"/cart"} className="header-link">
            <ShoppingCartOutlined className="text-2xl" />
            <span className="header-link-span ">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
