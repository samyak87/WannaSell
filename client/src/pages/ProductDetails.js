import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const ProductDetails = () => {
  // get product
  const params= useParams();
  const [product,setProduct] = useState({});
  
  useEffect(() =>{
    if(params?.slug) getProduct();
  },[params?.slug])


  const getProduct = async() =>{
    try {
       const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
       setProduct(data?.product);
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
          <h4>Category: {product.category}</h4>

         

          </div>
      </div>
      <div className='row'>
        Similiar Products
      </div>
     </Layout>
  )
}

export default ProductDetails