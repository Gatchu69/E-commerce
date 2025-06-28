import React, { useContext } from "react";
import { CartContext } from "../Cart/CartContext";
import { CurrencyContext } from "../Currency/CurrencyContext";
import { useNavigate } from "react-router-dom";
import css from "./CartPage.module.css";

const CartPage = () => {
  const { cartItems, increaseQty, decreaseQty } = useContext(CartContext);
  const { currency, convertPrice } = useContext(CurrencyContext);

  const total = cartItems.reduce(
    (sum, item) => sum + convertPrice(item.price) * item.quantity,
    0
  );
  const navigate = useNavigate();

  return (
    <div className={css.cartPage}>
      <h1 className={css.title}>Cart</h1>

      {cartItems.map((item, index) => (
        <div key={index} className={css.cartItem}>
          <div className={css.itemDetails}>
            <h2 className={css.itemName}>{item.name}</h2>
            <p className={css.price}>
              {currency}
              {convertPrice(item.price).toFixed(2)}
            </p>

            <div className={css.sizes}>
              {["XS", "S", "M", "L"].map((size) => (
                <button
                  key={size}
                  className={`${css.sizeBtn} ${
                    item.size === size ? css.active : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={css.qtyImage}>
            <div className={css.qtyControls}>
              <button
                className={css.qtyBtn}
                onClick={() => increaseQty(item.id, item.size)}
              >
                +
              </button>
              <span className={css.qty}>{item.quantity}</span>
              <button
                className={css.qtyBtn}
                onClick={() => decreaseQty(item.id, item.size)}
              >
                −
              </button>
            </div>
            <img src={item.imageUrl} alt={item.name} className={css.image} />
          </div>
        </div>
      ))}

      <div className={css.totalSection}>
        <p>Total</p>
        <p>
          {currency}
          {total.toFixed(2)}
        </p>
      </div>

      <button className={css.orderBtn} onClick={() => navigate("/details")}>
        Continue
      </button>
    </div>
  );
};

export default CartPage;
