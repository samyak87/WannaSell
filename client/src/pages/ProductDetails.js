import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
const ProductDetails = () => {
  // get product
  const params= useParams();
  const [product,setProduct] = useState({});
  const [relatedProducts,setRelatedProducts] = useState([]);
  
  useEffect(() =>{
    if(params?.slug) getProduct();
  },[params?.slug])


  const getProduct = async() =>{
    try {
       const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
       setProduct(data?.product);
       getSimiliarProducts(data?.product._id,data?.product.category._id)
    } catch (error) {
      console.log(error);
      
    }
  }

  // related products
  const getSimiliarProducts = async(pid,cid) =>{
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
         setRelatedProducts(data?.products);
      } catch (error) {
        console.log(error);
        
      }
  }
  return (
     <Layout title={"Product Details"}>
      <div className='row container mt-4'>
        <div className='col-md-6'>
        <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
        </div>
        <div className='col-md-6 text-center'>
          <h2>Product Details</h2>
          <h4>Name: {product.name}</h4>
          <h4>Description: {product.description}</h4>
          <h4>Price: {product.price}</h4>
          <h4>Category: {product?.category?.name}</h4>
          <button className="btn btn-secondary m-2"> Add to Cart </button>
          </div>

      </div>
      <div className='row'>
        <h1>Similiar Products</h1>
        <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
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

                  </div>
                </div>
              </Link>
            ))}
          </div>      </div>
     </Layout>
  )
}

export default ProductDetails