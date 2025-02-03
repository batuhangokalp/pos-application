import { useState } from "react";
import axios from "axios";
import { Form, message, Modal, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CategoryForm from "./CategoryForm";

const API_URL = process.env.REACT_APP_API_URL;

const Categories = ({
  categoriesData,
  setCategoriesData,
  categoryName,
  setCategoryName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("add");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      if (type === "add") {
        const response = await axios.post(`${API_URL}/api/categories`, {
          title: values.categoryName,
        });
        if (response.status === 201) {
          message.success("Kategori başarıyla oluşturuldu");
          form.resetFields();
          setIsModalOpen(false);
          setCategoriesData((prev) => [...prev, response.data]);
        }
      } else if (type === "edit") {
        const response = await axios.put(
          `${API_URL}/api/categories/${currentCategory._id}`,
          { title: values.categoryName }
        );
        if (response.status === 200) {
          message.success("Kategori başarıyla güncellendi");
          form.resetFields();
          setIsModalOpen(false);
          setCategoriesData((prev) =>
            prev.map((category) =>
              category._id === currentCategory._id ? response.data : category
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/categories/${categoryId}`
      );

      if (response.status === 200) {
        message.success("Kategori başarıyla silindi");
        setCategoriesData((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId)
        );
      }
      setCategoryName("Tümü");
    } catch (error) {
      console.error("Silme işlemi sırasında hata oluştu:", error);
    }
  };
  const handleEditCategory = (category) => {
    setType("edit");
    setCurrentCategory(category);
    form.setFieldsValue({ categoryName: category.title });
    setIsModalOpen(true);
  };
  const handleAddCategory = () => {
    setType("add");
    form.resetFields();
    setIsModalOpen(true);
  };
  return (
    <>
      <ul className="flex md:flex-col gap-4 text-lg">
        <li
          className={`category-button ${
            categoryName === "Tümü" ? "selected" : ""
          }`}
          onClick={() => setCategoryName("Tümü")}
        >
          <span>Tümü</span>
        </li>
        <li
          className={`category-button ${
            categoryName === "Favoriler" ? "selected-fav" : ""
          }`}
          onClick={() => setCategoryName("Favoriler")}
        >
          <span>Favoriler</span>
        </li>
        {categoriesData?.length > 0 &&
          categoriesData.map((category) => (
            <li
              key={category._id}
              className={`category-button ${
                category.title === categoryName ? "selected" : ""
              } group relative`}
              onClick={() => setCategoryName(category.title)}
            >
              <span>{category.title}</span>
              <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
                <button
                  className="update-button"
                  onClick={() => handleEditCategory(category)}
                >
                  <EditOutlined />
                </button>
                <Popconfirm
                  title={`Kategoriyi Sil - ${category?.title}`}
                  description="Kategoriyi silmek istediğinize emin misiniz?"
                  okText="Evet"
                  cancelText="Hayır"
                  onConfirm={() => handleDeleteCategory(category._id)}
                >
                  <button className="delete-button">
                    <DeleteOutlined />
                  </button>
                </Popconfirm>
              </div>
            </li>
          ))}

        <li className="category-button" onClick={handleAddCategory}>
          <PlusOutlined />
        </li>
      </ul>
      <Modal
        title={type === "add" ? "Kategori Oluştur" : "Kategori Düzenle"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <CategoryForm onFinish={onFinish} form={form} type={type} />
      </Modal>
    </>
  );
};

export default Categories;
