import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate ,useParams} from "react-router-dom";
import slugify from "slugify";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");


  // get single product
  const getSingleProduct = async() =>{
       try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)                  
        setName(data.product.name);
        setDescription(data.product.description);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setCategory(data.product.category._id);
       } catch (error) {
        console.log(error);
       }
  }

  useEffect(()=>{
      getSingleProduct();
    },[])


  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/categories`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // handling updation of product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,productData);
      
      if (data?.success) {
        toast.success("Product updated successfully");
        navigate('/dashboard/admin/products');
      } else {
        toast.error("Error in updating product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // handling deleting of product
   //delete a product
   const handleDelete = async () => {
    try {
      let answer = window.confirm("Are You Sure want to delete this product ? ");
      // if (!answer) return;
      const { data } = await axios.delete(`
        ${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row text-center">
          <div className="col-md-3 p-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="m-3">
              <h1>Update Product </h1>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3 "
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                <div className="mb-3">
                  <label className="btn btn-outline-primary col-md-12 mb-3">
                    {photo ? photo.name : "Change Photo"}
                    <input
                      type="file"
                      name="photo"
                      value={photo}
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    ></input>
                  </label>
                  <div className="mb-3">
                    {photo ? (
                      <div className="text-center ">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product-photo"
                          height={"200px"}
                          className="img img-responsive"
                        ></img>
                      </div>
                    ) :  <div className="text-center ">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="product-photo"
                      height={"200px"}
                      className="img img-responsive"
                    ></img>
                  </div>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      required
                      value={name}
                      placeholder="Enter name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      required
                      value={description}
                      placeholder="Enter description"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      required
                      value={price}
                      placeholder="Enter price"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    ></input>
                  </div>{" "}
                  <div className="mb-3">
                    <input
                      type="number"
                      required
                      value={quantity}
                      placeholder="Enter quantity"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-3">
                    <Select
                      bordered={false}
                      placeholder="Select Shipping"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                      value={shipping ? "Yes" : "No"}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary m-2" onClick={handleUpdate}>
                      UPDATE PRODUCT
                    </button>
                    <button className="btn btn-primary m-2" onClick={handleDelete}>
                      DELETE PRODUCT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
