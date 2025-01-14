const Products = ({ productsData, setProductsData }) => {
  return (
    <div className="product-wrapper grid grid-cols-card gap-4">
      {productsData?.length > 0 &&
        productsData?.map((product) => (
          <div
            className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
            key={product?._id}
          >
            <div className="product-img h-40 w-full">
              <img
                src={product?.img}
                alt={product?.title || "Product"}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="product-info flex flex-col p-3">
              <span className="font-bold">{product?.title}</span>
              <span>{product?.price?.toFixed(2)} ₺</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
