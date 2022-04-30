import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./components/common/GlobalStyles";
import MainLayout from "./layout/MainLayout";
import Home from "./views/home/Home";
import "./App.css";
import Mall from "./views/mall/Mall";
import Product from "./views/product/Product";
import Cart from "./views/cart/Cart";
import Login from "./views/user/Login";
import Register from "./views/user/Register";
import Dashboard from "./views/user/Dashboard";

const App = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/mall" element={<Mall />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/product/:id" element={<Product />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/#/paysuccess" element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <GlobalStyles />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

export default App;
