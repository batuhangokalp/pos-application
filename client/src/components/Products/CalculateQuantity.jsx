import { Button } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

const CalculateQuantity = ({ record }) => {
  console.log(record);
  const dispatch = useDispatch();

  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
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
