import { Button } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCartAsync, decreaseFromCartAsync } from "../../redux/cartSlice";

const CalculateQuantity = ({ record, userId }) => {
  const dispatch = useDispatch();
  const storedAuth = JSON.parse(localStorage.getItem("storedUser"));

  const handleAddToCart = () => {
    const body = {
      ...record?.productId,
      quantity: 1,
      userId: storedAuth._id,
    };
    dispatch(addToCartAsync(body));
  };

  const handleRemoveFromCart = (cartItem) => {
    const body = {
      userId,
      quantity: cartItem.quantity,
      productId: cartItem.productId._id,
    };
    dispatch(decreaseFromCartAsync(body));
  };

  return (
    <div className="flex items-center gap-x-1">
      <Button
        type="primary"
        size="small"
        className="w-full flex items-center justify-center !rounded-full"
        icon={<MinusCircleOutlined />}
        onClick={() => handleRemoveFromCart(record)}
      />
      <span className="font-bold w-6 inline-block text-center">
        {record.quantity}
      </span>
      <Button
        type="primary"
        size="small"
        className="w-full flex items-center justify-center !rounded-full"
        icon={<PlusCircleOutlined />}
        onClick={() => handleAddToCart(record)}
      />
    </div>
  );
};

export default CalculateQuantity;
