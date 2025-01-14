import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none">
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
