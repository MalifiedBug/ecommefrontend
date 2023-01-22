import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Signup from "./pages/SignUp";
import Login from "./pages/SignIn";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import ShoppingCategorie from "./pages/ShoppingCategories";
import SingleProduct from "./pages/SingleProduct";
import ShoppingCart from "./pages/ShoppingCart";

import { createContext } from "react";
import { useEffect, useState } from "react";
import { publicRequest } from "./request-methods";
import Navbar from "./layout/Navbar";


export const MainContext = createContext();
export const serverUrl = "http://localhost:4000"

function App() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");


  const getCategories = async () => {
    try {
      const url = category ? `/products/category/${category}` : "/products"; //For the Home Page
      const response = await publicRequest.get(url);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = useSelector((store) => store.auth.currentUser);
  const cart = useSelector((store) => store.cart);

  return (
    <MainContext.Provider
      value={{ category, categories, setCategories, setCategory, user, cart }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/categories/:category" element={<ShoppingCategorie />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          {user !== null?<>
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/orders" element={<Orders />} />
          </>: null}
          <Route path="/logout" element={<Home />} />
        </Routes>
      </div>
    </MainContext.Provider>
  );
}

export default App;
