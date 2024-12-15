import React from 'react'
import Layout from '../components/Layout/Layout'

import { useAuth } from '../context/auth'

const HomePage = () => {
  const [auth, setAuth] =useAuth();

  return (
    <Layout>
        <h1>homepage</h1>
        <pre> 
          {JSON.stringify(auth,null,5)}
        </pre>
    </Layout>
 )
}

export default HomePage