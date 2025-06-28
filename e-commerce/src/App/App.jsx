import React from "react";
import NavBar from "../NavBar/NavBar";
import css from "./App.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WomanPage from "../Pages/WomanPage";
import MenPage from "../Pages/MenPage";
import KidsPage from "../Pages/KidsPage";
import CurrencyProvider from "../Currency/CurrencyContext";
import CartProvider from "../Cart/CartContext";
import CartOverlay from "../Cart/CartOverlay";
import ProductDetail from "../Product Details/ProductDetail";
import CartPage from "../Cart/CartPage";
import ShippingInfoPage from "../Shipping Page/ShippingInfoPage";
import ShippingPage from "../Shipping Page/ShippingPage";
import PaymentPage from "../Payment/PaymentPage";
import ConfirmationPage from "../Confirmation/ConfirmationPage";

const App = () => {
  return (
    <CartProvider>
      <CurrencyProvider>
        <Router>
          <NavBar />
          <CartOverlay />
          <Routes>
            <Route path="/" element={<WomanPage />} />
            <Route path="/women" element={<WomanPage />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/kids" element={<KidsPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/details" element={<ShippingInfoPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </Router>
      </CurrencyProvider>
    </CartProvider>
  );
};

export default App;
