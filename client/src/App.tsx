import Login from "./components/login";
import Cart from "./components/cart";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

function App():JSX.Element {
  return (
        <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart /> } />
       </Routes>
    </>
  )
}

export default App;
