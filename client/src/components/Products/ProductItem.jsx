import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const ProductItem = ({ product, quantity }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const body = {
      ...product,
    };
    body.quantity = quantity + 1;

    dispatch(addToCart(body));
  };

  return (
    <div
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
      onClick={handleAddToCart}
    >
      <div className="product-img h-40 w-full">
        <img
          src={product?.img}
          alt={product?.title || "Product"}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="product-info flex flex-col p-3 border-t">
        <span className="font-bold">{product?.title}</span>
        <span>{product?.price?.toFixed(2)} ₺</span>
      </div>
    </div>
  );
};

export default ProductItem;
