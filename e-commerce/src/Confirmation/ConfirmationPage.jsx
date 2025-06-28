import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import { CurrencyContext } from "../Currency/CurrencyContext";
import css from "./ConfirmationPage.module.css";
import check from "../Images/checkLogo.svg";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, setCartItems } = useContext(CartContext);
  const { currency, convertPrice } = useContext(CurrencyContext);

  const { email, address, city, postalCode, country, shippingMethod } =
    location.state || {};

  const subtotal = cartItems.reduce(
    (sum, item) => sum + convertPrice(item.price) * item.quantity,
    0
  );

  const shippingCost = shippingMethod === "express" ? 4.99 : 0;
  const total = subtotal + shippingCost;

  const handleBackToShop = () => {
    setCartItems([]); // clear cart
    navigate("/");
  };

  return (
    <div className={css.confirmationPage}>
      <div className={css.left}>
        <div className={css.breadcrumb}>
          <span>Cart</span> &gt; <span>Details</span> &gt; <span>Shipping</span>{" "}
          &gt; <strong>Payment</strong>
        </div>

        <div className={css.confirmIcon}>
          <img src={check} alt="Checked" className={css.fillImg} />
        </div>
        <h2>Payment Confirmed</h2>
        <button className={css.shopBtn} onClick={handleBackToShop}>
          Back to shopping
        </button>
      </div>

      <div className={css.right}>
        {cartItems.map((item, index) => (
          <div key={index} className={css.itemRow}>
            <div className={css.imgBox}>
              <img src={item.imageUrl} alt={item.name} />
              <div className={css.qty}>{item.quantity}</div>
            </div>
            <div className={css.itemDetails}>
              <p className={css.itemName}>{item.name}</p>
              <p className={css.itemPrice}>
                {currency}
                {convertPrice(item.price).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
        <hr />
        <div className={css.summary}>
          <p>
            Subtotal:{" "}
            <span>
              {currency}
              {subtotal.toFixed(2)}
            </span>
          </p>
          <p>
            Shipping:{" "}
            <span>
              {shippingCost > 0
                ? `${currency}${shippingCost.toFixed(2)}`
                : "Free Shipping"}
            </span>
          </p>
          <p className={css.total}>
            Paid:{" "}
            <strong>
              {currency}
              {total.toFixed(2)}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
