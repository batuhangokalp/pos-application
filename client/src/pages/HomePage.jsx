import Header from "../components/Header/Header";
import CartTotals from "../components/Cart/CartTotals";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-20">
        <div className="categories min-w-[150px] overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
          <Categories />
        </div>
        <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_112px)] pb-10">
          <Products />
        </div>
        <div className="cart-totals min-w-[300px] border">
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default HomePage;
