import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/AdminMenu'
const Users = () => {
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
       <div className='row text-center'>
           <div className='col-md-3 p-3'>
               <UserMenu/>
           </div>
           <div className='col-md-9'>
             <div className='m-3'>
               <h2>All users</h2>
              </div>
            </div>
       </div>
    </div>
 </Layout>  
  )
}

export default Users