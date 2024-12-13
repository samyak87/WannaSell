import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js"
import Pagenotfound from "./pages/Pagenotfound.js"
import Register from "./pages/Auth/Register.js";
import Login from "./pages/Auth/Login.js";
function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={ <HomePage/> }/>
        <Route path="*" element= {<Pagenotfound/> }/>
        <Route path="/register" element= {<Register/> }/>
        <Route path="/login" element= {<Login/> }/>

      </Routes>
    </>
  );
}
export default App;
