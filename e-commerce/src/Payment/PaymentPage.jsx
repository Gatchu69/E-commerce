import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import { CurrencyContext } from "../Currency/CurrencyContext";
import css from "./PaymentPage.module.css";
import Card from "../Images/creditCard.svg";

const PaymentPage = () => {
  const { cartItems } = useContext(CartContext);
  const { currency, convertPrice } = useContext(CurrencyContext);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};
  const shippingMethod = location.state?.shippingMethod || "standard";

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const shippingCost = shippingMethod === "express" ? convertPrice(4.99) : 0;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + convertPrice(item.price) * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  const validate = () => {
    const newErrors = {};
    if (!cardData.number || cardData.number.length < 12)
      newErrors.number = "Invalid card number";
    if (!cardData.name) newErrors.name = "Cardholder name required";
    if (!cardData.expiry) newErrors.expiry = "Expiry date required";
    if (!cardData.cvv || cardData.cvv.length !== 3)
      newErrors.cvv = "Invalid CVV";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    navigate("/confirmation", { state: { formData, shippingMethod } });
  };

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  return (
    <div className={css.paymentPage}>
      <div className={css.steps}>
        <span>Cart</span> &gt; <span>Details</span> &gt; <span>Shipping</span>{" "}
        &gt; <strong>Payment</strong>
      </div>

      <div className={css.mainContent}>
        {/* LEFT SIDE */}
        <div className={css.left}>
          <div className={css.infoBox}>
            <div>
              <strong>Contact:</strong> {formData.email}
            </div>
            <div>
              <strong>Ship to:</strong> {formData.address}, {formData.city},{" "}
              {formData.postalCode}, {formData.country}
            </div>
            <div>
              <strong>Method:</strong>{" "}
              {shippingMethod === "express"
                ? `Express Shipping - ${currency}${convertPrice(4.99).toFixed(
                    2
                  )}`
                : "Standard Shipping - FREE"}
            </div>
          </div>

          <form className={css.paymentForm} onSubmit={handleSubmit}>
            <h3>Payment method</h3>
            <div className={css.cardBox}>
              <img src={Card} alt="card" className="creditCard" />
              <label>Card Number</label>
              <input
                type="text"
                name="number"
                value={cardData.number}
                onChange={handleChange}
                className={errors.number && css.error}
              />
              {errors.number && (
                <span className={css.errorText}>{errors.number}</span>
              )}

              <label>Holder Name</label>
              <input
                type="text"
                name="name"
                value={cardData.name}
                onChange={handleChange}
                className={errors.name && css.error}
              />
              {errors.name && (
                <span className={css.errorText}>{errors.name}</span>
              )}

              <div className={css.row}>
                <div>
                  <label>Expiration (MM/YY)</label>
                  <input
                    type="text"
                    name="expiry"
                    value={cardData.expiry}
                    onChange={handleChange}
                    className={errors.expiry && css.error}
                  />
                  {errors.expiry && (
                    <span className={css.errorText}>{errors.expiry}</span>
                  )}
                </div>
                <div>
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardData.cvv}
                    onChange={handleChange}
                    className={errors.cvv && css.error}
                  />
                  {errors.cvv && (
                    <span className={css.errorText}>{errors.cvv}</span>
                  )}
                </div>
              </div>
            </div>

            <div className={css.actions}>
              <button type="button" onClick={() => navigate("/shipping")}>
                Back to shipping
              </button>
              <button type="submit" className={css.payBtn}>
                Pay now
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className={css.right}>
          {cartItems.map((item, i) => (
            <div key={i} className={css.summaryItem}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className={css.itemImage}
              />
              <div>
                <p className={css.itemName}>{item.name}</p>
                <p className={css.itemPrice}>
                  {currency}
                  {convertPrice(item.price).toFixed(2)}
                </p>
              </div>
              <div className={css.qtyBubble}>{item.quantity}</div>
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
                {total.toFixed(2)}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
