import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button, Checkbox,Radio } from "antd";
import {Prices} from '../components/Prices.js'
const HomePage = () => {
  

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(0);

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

 // get filtered product (from backend)
 const filterProduct = async() =>{
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`,{checked,radio});
    setProducts(data?.products);
    
  } catch (error) {
    console.log(error);
    
  }
}

//getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(checked.length===0 && radio.length===0) getAllProducts();
  }, [checked.length,radio.length]);

  useEffect(() => {
    if(checked.length>0  || radio.length>0) filterProduct();
  }, [checked,radio]);


  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
    getTotal();
  }, []);

  // handle filter by category
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
   <div className="d-flex flex-column ms-1 mt-3">

   <Button className="fw-bold" onClick={()=>(window.location.reload())}>Clear Filters</Button>
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
                      <p className="card-text text-center">{p.description.substring(0,3)}</p>
                      <p className="card-text text-center">${p.price}</p>

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
            <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
