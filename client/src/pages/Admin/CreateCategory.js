import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm.js";

import {Modal} from 'antd';
import { set } from "mongoose";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName] = useState("");
  
  const [visible,setVisible] = useState(false);
  const [selected,setSelected] = useState(null);
  const [updatedName,setUpdatedName]=useState("");

  // handle form
  const handleSubmit = async(e) =>{
    e.preventDefault();

    try{
       const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {name,});
       if(data.success)
       {
         toast.success(`${data.name} is created`)
         getAllCategory();
       }
       else{
        
        toast.error("Something went wrong in category creation")
      }
    }
    catch(error)
    {
      console.log(error);

      toast.error("Something went wrong in input form")
    }
  }

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/categories`);
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

// update category
  const handleUpdate = async(e)=>{
    e.preventDefault();

    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatedName})      

      if(data?.success)
      {
        toast.success("Category updated successfully")
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {

      console.log(error);
      toast.error("Something went wrong")
      
    }
  }

  // delete category
  const handleDelete = async(pid)=>{

    try {
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`)      

      if(data.success)
      {
        toast.success("Category deleted successfully")
        getAllCategory();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {

      console.log(error);
      toast.error("Something went wrong")
      
    }
  }
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row text-center">
          <div className="col-md-3 p-3">
            <AdminMenu />
          </div>
          <div className="col-md-6">
            <div className="">
              <h2>Manage category</h2>
              <div className="p-3">
                   <CategoryForm handleSubmit={handleSubmit} value={name} 
                   setValue={setName}/>
              </div>
              <div className="m-3">
                <table className="table">
                  <thead>
                    <tr>
                     
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {categories?.map(c =>(
                    <>
                    <tr>
                    <td key={c._id} className="w-75">{c.name}</td>
                   <td >  <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button></td>
                    <td > <button className="btn btn-danger ms-1"  onClick={() => {
                             handleDelete(c._id)
                            }}>Delete</button></td>
                    </tr>
                    </>
                    
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
