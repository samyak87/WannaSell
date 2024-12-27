import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";
const Search = () => {
  const [values, setValues] = useSearch();
  const [products, setProducts] = useState([]);

  return (
    <Layout title={"Search-Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.result.length < 1
              ? "No Products found"
              : `Found ${values?.result.length} product(s)`}
          </h6>
          <div className="d-flex flex-wrap">
            <div className="d-flex flex-wrap">
              {values?.result.map((p) => (
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
                      <p className="card-text text-center">
                        {p.description.substring(0, 3)}
                      </p>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
