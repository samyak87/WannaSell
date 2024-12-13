import React from 'react'
import Layout from '../components/Layout/Layout'
import {Link} from 'react-router-dom'
const Pagenotfound = () => {
  return (
    <Layout title={"not found"} description={"go back"}>
      <div className='pnf'>
        <h1 >404</h1>
        <h2 >Oops! Page Not Found</h2>
        <Link to='/' className='pnf-btn'>Home</Link>
      </div>
    </Layout>
  )
}

export default Pagenotfound