import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import { CurrencyContext } from "../Currency/CurrencyContext";
import css from "./ShippingPage.module.css";

const ShippingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;

  const { cartItems } = useContext(CartContext);
  const { currency, convertPrice } = useContext(CurrencyContext);

  const [shippingMethod, setShippingMethod] = useState("standard");

  const shippingCost = shippingMethod === "express" ? 4.99 : 0;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + convertPrice(item.price) * item.quantity,
    0
  );

  return (
    <div className={css.shippingPage}>
      <div className={css.steps}>
        <span className={css.step}>Cart</span> &gt;{" "}
        <span className={css.step}>Details</span> &gt;{" "}
        <strong className={css.stepActive}>Shipping</strong> &gt;{" "}
        <span className={css.step}>Payment</span>
      </div>

      <div className={css.mainContent}>
        <div className={css.left}>
          <div className={css.infoBox}>
            <div className={css.contactRow}>
              <strong>Contact</strong>
              <span>{formData?.email || "email@example.com"}</span>
            </div>
            <div className={css.contactRow}>
              <strong>Ship to</strong>
              <span>
                {formData?.address || "Address"}, {formData?.city || "City"},{" "}
                {formData?.postalCode || "00000"},{" "}
                {formData?.country || "Country"}
              </span>
            </div>
          </div>
          <h3>Shipping method</h3>
          <div className={css.shippingOptions}>
            <label
              className={`${css.methodCard} ${
                shippingMethod === "standard" ? css.active : ""
              }`}
            >
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={shippingMethod === "standard"}
                onChange={() => setShippingMethod("standard")}
              />
              <div>
                <strong>Standard Shipping</strong>
                <span>Free</span>
              </div>
            </label>

            <label
              className={`${css.methodCard} ${
                shippingMethod === "express" ? css.active : ""
              }`}
            >
              <input
                type="radio"
                name="shipping"
                value="express"
                checked={shippingMethod === "express"}
                onChange={() => setShippingMethod("express")}
              />
              <div>
                <strong>Express Shipping</strong>
                <span>4.99$</span>
              </div>
            </label>
          </div>

          <div className={css.navButtons}>
            <button
              onClick={() => navigate("/details")}
              className={css.backBtn}
            >
              Back to details
            </button>
            <button
              onClick={() =>
                navigate("/payment", {
                  state: {
                    formData: formData,
                    shippingMethod: shippingMethod,
                  },
                })
              }
              className={css.nextBtn}
            >
              Go to payment
            </button>
          </div>
        </div>

        <div className={css.right}>
          {cartItems.map((item, i) => (
            <div key={i} className={css.summaryItem}>
              <div className={css.imageWrapper}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={css.itemImage}
                />
                <div className={css.qtyBubble}>{item.quantity}</div>
              </div>
              <div>
                <p className={css.itemName}>{item.name}</p>
                <p className={css.itemPrice}>
                  {currency}
                  {convertPrice(item.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className={css.totalBox}>
            <div className={css.totalRow}>
              <span>Subtotal</span>
              <span>
                {currency}
                {subtotal.toFixed(2)}
              </span>
            </div>
            <div className={css.totalRow}>
              <span>Shipping</span>
              <span>
                {shippingCost === 0
                  ? "Free Shipping"
                  : `${currency}${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className={css.totalRowTotal}>
              <strong>Total</strong>
              <strong>
                {currency}
                {(subtotal + convertPrice(shippingCost)).toFixed(2)}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
