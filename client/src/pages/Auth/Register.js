import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";

const Register = () => {
 
  // useState 

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [number,setNumber] = useState("")
  const [address,setAddress] = useState("")

  // function to handle the form submission
  const handleSubmit = (e) =>{
    
    // changing the default behaviour (refreshing in submission)
    e.preventDefault();
    
    
  }
  return (
    <Layout title="Registration">
      <div className="register">
        <h1>Registration page</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control" 
            id="exampleInputName"
            required
             />
          </div>
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
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              required

            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
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
    </Layout>
  );
};

export default Register;
