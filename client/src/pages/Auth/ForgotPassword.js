import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";

// import { toast } from "react-hot-toast";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/auth";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );

      if (res && res.data.success) {
        toast.success(res.data.message);

        // navigated to login page after successfully registered
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password"}>
      <div className="login">
        <div className="login">
          <h1>Forgot Password?</h1>
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
              <label htmlFor="exampleInputPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputAnswer" className="form-label">
                Question
              </label>
              <input
                type="text"
                value={answer}
                placeholder="Your Besfriend?"
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputAnswer"
                required
              />
            </div>

            <div className="text-center">
              <div className="mb-1">
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
