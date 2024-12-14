import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Helmet} from "react-helmet";
// import { Helmet,HelmetProvider } from "react-helmet-async";

import { ToastContainer, Toaster } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'; 

const Layout = ({children, title, description, author, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author}/>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main  style={{ minHeight: "80vh" }}>
      <ToastContainer/>
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps={
  title:"WannaShop",
  description:"shopping website",
  author:'samyak',
  keywords:"buy, shop"

}

export default Layout;
