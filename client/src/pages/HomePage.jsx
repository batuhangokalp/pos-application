import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import CartTotals from "../components/Cart/CartTotals";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";

const HomePage = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/products"),
        ]);

        setCategoriesData(categoriesResponse.data);
        setProductsData(productsResponse.data);
      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-20">
        <div className="categories min-w-[150px] overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
          <Categories
            categoriesData={categoriesData}
            setCategoriesData={setCategoriesData}
          />
        </div>
        <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_112px)] pb-10">
          <Products
            productsData={productsData}
            setProductsData={setProductsData}
          />
        </div>
        <div className="cart-totals min-w-[300px] border">
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default HomePage;
