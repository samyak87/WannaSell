import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js"
import Pagenotfound from "./pages/Pagenotfound.js"
function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={ <HomePage/> }/>
        <Route path="*" element= {<Pagenotfound/> }/>

      </Routes>
    </>
  );
}
export default App;
