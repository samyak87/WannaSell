import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setProducts(data.product);

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(()=>{
    getAllProducts();
  },[])

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row mt-4">
        <div className="col-md-3">
          <h4 className="text-center">Filter by Category</h4>
        </div>
        <div className="col-md-9">
          <h1 className="text-center"> All Products</h1>
          <div className="d-flex flex-wrap">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                to={`/dashboard/admin/product/${p.slug}`}
                key={p._id}
                className="product-link "
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{p.name}</h5>
                    <p className="card-text text-center">{p.description}</p>
                    <button className="btn btn-primary m-2">More Details</button>
                    <button className="btn btn-secondary m-2">Add to Cart</button>
                  
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
