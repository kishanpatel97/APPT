import { BrowserRouter, Routes, Route } from "react-router-dom";
import Redirect from "./components/redirect";
import Login from "./components/login";
import Register from "./components/register";
import NavBar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Redirect/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
