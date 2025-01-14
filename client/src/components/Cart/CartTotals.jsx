import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import {
  ClearOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

const CartTotals = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  console.log(cartItems);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const KDV = (getTotalPrice() * 8) / 100;
  console.log(KDV);

  return (
    <div className="cart-totals-wrapper h-full max-h-[calc(100vh_-_110px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-wrap font-bold text-white tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cartItems?.length > 0 &&
          cartItems?.map((cartItem) => (
            <li className="cart-item flex justify-between" key={cartItem._id}>
              <div className="flex items-center">
                <img
                  src={cartItem?.img}
                  alt={cartItem?.title}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col ml-2">
                  <b>{cartItem?.title}</b>
                  <span>
                    {(cartItem?.price * cartItem?.quantity).toFixed(2)} ₺
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-1">
                <Button
                  type="primary"
                  size="small"
                  className="w-full rounded-full items-center justify-center"
                  onClick={() => handleRemoveFromCart(cartItem)}
                  icon={<MinusCircleOutlined />}
                />
                <span className="font-bold px-2">
                  <span>{cartItem?.quantity}</span>
                </span>
                <Button
                  type="primary"
                  size="small"
                  className="w-full rounded-full items-center justify-center"
                  onClick={() => handleAddToCart(cartItem)}
                  icon={<PlusCircleOutlined />}
                />
              </div>
            </li>
          ))}
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
          <Button type="primary" size="large" className="w-full">
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2"
            danger
            icon={<ClearOutlined />}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
