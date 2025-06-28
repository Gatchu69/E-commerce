import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import { CurrencyContext } from "../Currency/CurrencyContext";
import css from "./ShippingInfoPage.module.css";

const ShippingInfoPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { currency, convertPrice } = useContext(CurrencyContext);

  const total = cartItems.reduce(
    (sum, item) => sum + convertPrice(item.price) * item.quantity,
    0
  );

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    note: "",
    city: "",
    postalCode: "",
    province: "",
    country: "Italy",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/shipping", { state: form }); // ✅ Pass form data to Shipping page
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <p className={css.breadcrumb}>
          Cart &gt; <strong>Details</strong> &gt; Shipping &gt; Payment
        </p>

        <h2>Contact</h2>
        <input
          type="email"
          name="email"
          placeholder="Email or mobile phone number"
          value={form.email}
          onChange={handleChange}
          required
        />

        <h2>Shipping Address</h2>
        <div className={css.nameRow}>
          <input
            type="text"
            name="firstName"
            placeholder="Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Second Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Address and number"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="note"
          placeholder="Shipping note (optional)"
          value={form.note}
          onChange={handleChange}
        />

        <div className={css.cityRow}>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={handleChange}
            required
          />
          <select
            name="province"
            value={form.province}
            onChange={handleChange}
            required
          >
            <option value="">Province</option>
            <option value="Tbilisi">Tbilisi</option>
            <option value="Kutaisi">Kutaisi</option>
          </select>
        </div>

        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          required
        >
          <option value="Georgia">Georgia</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
        </select>

        <label className={css.checkbox}>
          <input
            type="checkbox"
            name="saveInfo"
            checked={form.saveInfo}
            onChange={handleChange}
          />
          Save this information for a future fast checkout
        </label>

        <div className={css.buttonRow}>
          <button
            type="button"
            className={css.back}
            onClick={() => navigate("/cart")}
          >
            Back to cart
          </button>
          <button type="submit" className={css.next}>
            Go to shipping
          </button>
        </div>
      </form>

      <div className={css.summary}>
        {cartItems.map((item, index) => (
          <div key={index} className={css.itemRow}>
            <img src={item.imageUrl} alt={item.name} className={css.itemImg} />
            <div>
              <p className={css.itemName}>{item.name}</p>
              <p className={css.itemPrice}>
                {currency}
                {convertPrice(item.price).toFixed(2)}
              </p>
            </div>
            <span className={css.itemQty}>{item.quantity}</span>
          </div>
        ))}
        <hr />
        <p className={css.total}>
          Subtotal:{" "}
          <span>
            {currency}
            {total.toFixed(2)}
          </span>
        </p>
        <p className={css.shippingInfo}>
          Shipping: Calculated at the next step
        </p>
        <p className={css.total}>
          Total:{" "}
          <strong>
            {currency}
            {total.toFixed(2)}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default ShippingInfoPage;
