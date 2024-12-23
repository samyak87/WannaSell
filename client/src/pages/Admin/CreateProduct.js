import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'

const { Option } = Select;


const CreateProduct = () => {
  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [quantity,setQuantity] = useState("");
  const [shipping,setShipping] = useState("");


   // get all categories
   const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/categories`);
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


  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
       <div className='row text-center'>
           <div className='col-md-3 p-3'>
               <AdminMenu/>
           </div>
           <div className='col-md-9'>
             <div className='m-3'>
               <h2>All products </h2>
               <div className='m-1'>
                
               </div>
              </div>
            </div>
       </div>
    </div>
 </Layout>  

  )
}

export default CreateProduct