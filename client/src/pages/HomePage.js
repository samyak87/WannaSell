import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Checkbox,Radio } from "antd";
import {Prices} from '../components/Prices.js'
const HomePage = () => {
  

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio,setRadio] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // handle filter
  const handleFilter = (value, id) => {
    // all checked values in (all)
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all.filter((c) => c !== id);
    }

    setChecked(all);
  
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      
      <div className="row mt-4">
        <div className="col-md-3">
          <h4 className="ms-3 mt-4">Filter by Category</h4>
          <div className="d-flex flex-column ms-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="mb-1"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>


{/* price filter  */}
          <h4 className="ms-3 mt-4">Filter by Price</h4>
          <div className="d-flex flex-column ms-3">
           <Radio.Group onChange={e => setRadio(e.target.value)}>
          {Prices?.map(p =>(
            <div key={p._id}>
              <Radio value={p.array}>{p.name}</Radio>
            </div>
          ))}
           </Radio.Group>
          </div>

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
                      <button className="btn btn-primary m-2">
                        More Details
                      </button>
                      <button className="btn btn-secondary m-2">
                        Add to Cart
                      </button>
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
