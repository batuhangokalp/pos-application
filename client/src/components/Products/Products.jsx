import { useState } from "react";
import axios from "axios";
import { Form, message, Modal, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProductItem from "./ProductItem";
import ProductForm from "./ProductForm";

const API_URL = process.env.REACT_APP_API_URL;

const Products = ({
  productsData,
  setProductsData,
  categoriesData,
  quantity,
  setQuantity,
}) => {
  const [productModal, setProductModal] = useState(false);
  const [type, setType] = useState("add");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      if (type === "add") {
        const response = await axios.post(`${API_URL}products`, {
          title: values.title,
          img: values.img,
          price: values.price,
          category: values.category,
        });
        if (response.status === 201) {
          message.success("Ürün başarıyla oluşturuldu");
          form.resetFields();
          setProductModal(false);
          setProductsData((prev) => [...prev, response.data]);
        }
      } else if (type === "edit") {
        const response = await axios.put(
          `${API_URL}products/${currentProduct._id}`,
          {
            title: values.title,
            img: values.img,
            price: values.price,
            category: values.category,
          }
        );
        if (response.status === 200) {
          message.success("Ürün başarıyla güncellendi");
          form.resetFields();
          setProductModal(false);
          setProductsData((prev) =>
            prev.map((product) =>
              product._id === currentProduct._id ? response.data : product
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_URL}products/${productId}`);
      setProductsData((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Silme işlemi sırasında hata oluştu:", error);
    }
  };

  const handleEditProduct = (product) => {
    setType("edit");
    setCurrentProduct(product);
    form.setFieldsValue({
      title: product.title,
      img: product.img,
      price: product.price,
      category: product.category,
    });
    setProductModal(true);
  };

  const handleAddProduct = () => {
    setType("add");
    form.resetFields();
    setProductModal(true);
  };
  return (
    <>
      <div className="product-wrapper grid grid-cols-card gap-4">
        {productsData?.length > 0 &&
          productsData?.map((product) => (
            <div key={product?._id} className="relative group">
              <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
                <button
                  className="update-button"
                  onClick={() => handleEditProduct(product)}
                >
                  <EditOutlined />
                </button>
                <Popconfirm
                  title={`Ürünü Sil - ${product?.title}`}
                  description="Ürünü silmek istediğinize emin misiniz?"
                  okText="Evet"
                  cancelText="Hayır"
                  onConfirm={() => handleDeleteProduct(product._id)}
                >
                  <button className="delete-button">
                    <DeleteOutlined />
                  </button>
                </Popconfirm>
              </div>
              <ProductItem
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          ))}
        <div
          className="bg-cyan-700 px-6 py-10 text-white hover:cursor-pointer hover:bg-blue-700 transition-all text-center h-40 flex flex-col justify-between items-center"
          onClick={handleAddProduct}
        >
          <span>Ürün Ekle</span>
          <PlusOutlined />
        </div>
      </div>
      <Modal
        title={type === "add" ? "Ürün Oluştur" : "Ürünü güncelle"}
        open={productModal}
        onCancel={() => setProductModal(false)}
        footer={false}
      >
        <ProductForm
          onFinish={onFinish}
          form={form}
          type={type}
          categoriesData={categoriesData}
        />
      </Modal>
    </>
  );
};

export default Products;
