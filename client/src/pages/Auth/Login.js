import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";

// import { toast } from "react-hot-toast";
import axios from "axios";
import { toast } from "react-toastify";
import  {useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth,setAuth] =useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      if (res && res.data.success) {
        toast.success(res.data.message);
                // navigated to login page after successfully registered
                navigate('/');
        setAuth({
          ...auth,
          user: res.data.user,
          token : res.data.token,

        });

        localStorage.setItem('auth',JSON.stringify(res.data));



      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login">
      <div className="login">
        <div className="login">
          <h1>Login Page</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn   btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
