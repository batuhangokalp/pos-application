import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { clearCartAsync, fetchCartAsync } from "../../redux/cartSlice";
import { ClearOutlined } from "@ant-design/icons";
import CalculateQuantity from "../Products/CalculateQuantity";

const CartTotals = () => {
  const dispatch = useDispatch();

  const storedAuth = JSON.parse(localStorage.getItem("storedUser"));
  const userId = storedAuth._id;
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartAsync(userId));
    }
  }, [dispatch, userId]);

  const handleClearCart = () => {
    dispatch(clearCartAsync(userId));
  };
  const getTotalPrice = () => {
    return cartItems?.reduce((total, item) => {
      return total + item?.price * item.quantity;
    }, 0);
  };

  const KDV = (getTotalPrice() * 8) / 100;

  return (
    <div className="cart-totals-wrapper h-full max-h-[calc(100vh_-_110px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-wrap font-bold text-white tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cartItems?.length > 0 ? (
          cartItems?.map((cartItem) => (
            <li className="cart-item flex justify-between" key={cartItem._id}>
              <div className="flex items-center">
                <img
                  src={cartItem?.productId?.img}
                  alt={cartItem?.productId?.title}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col ml-2">
                  <b>{cartItem?.productId?.title}</b>
                  <span>
                    {(cartItem?.price * cartItem?.quantity).toFixed(
                      2
                    )}{" "}
                    ₺
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-red-700 text-[15px]">
                  Stok: {cartItem?.productId?.stock}
                </span>
                <CalculateQuantity record={cartItem} userId={userId} />
              </div>
            </li>
          ))
        ) : (
          <h2>Sepette ürün yok..</h2>
        )}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{getTotalPrice()?.toFixed(2)} ₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %8</b>
            <span className="text-red-700">+{KDV.toFixed(2)} ₺</span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-lg text-green-500">Genel Toplam</b>
            <span className="text-xl">
              {(getTotalPrice() + KDV).toFixed(2)} ₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cartItems?.length < 1}
          >
            <Link to="/cart">Sepete Git</Link>
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2"
            danger
            icon={<ClearOutlined />}
            disabled={cartItems?.length < 1}
            onClick={handleClearCart}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
