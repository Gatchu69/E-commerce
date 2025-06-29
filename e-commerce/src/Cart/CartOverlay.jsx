import { useContext } from "react";
import { CartContext } from "./CartContext";
import { CurrencyContext } from "../Currency/CurrencyContext";
import { useNavigate } from "react-router-dom";

import css from "./CartOverlay.module.css";

const CartOverlay = () => {
  const { cartItems, setCartOpen, cartOpen, increaseQty, decreaseQty } =
    useContext(CartContext);

  const { currency, convertPrice } = useContext(CurrencyContext);

  const navigate = useNavigate();

  if (!cartOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + convertPrice(item.price) * item.quantity,
    0
  );

  return (
    <div className={css.cartOverlay}>
      <div className={css.cartContent}>
        <h3>
          My Bag, <strong>{cartItems.length}</strong> items
        </h3>

        {cartItems.map((item, index) => (
          <div key={index} className={css.cartItem}>
            <div className={css.itemDetails}>
              <p className={css.itemName}>{item.name}</p>
              <p className={css.itemPrice}>
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

            <div className={css.itemControls}>
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

            <img src={item.imageUrl} alt={item.name} className={css.itemImg} />
          </div>
        ))}

        <div className={css.totalRow}>
          <span>Total</span>
          <span>
            {currency}
            {total.toFixed(2)}
          </span>
        </div>

        <div className={css.cartButtons}>
          <button
            className={css.viewBag}
            onClick={() => {
              navigate("/cart");
              setCartOpen(false);
            }}
          >
            VIEW BAG
          </button>
          <button
            className={css.checkout}
            onClick={() => {
              setCartOpen(false);
              navigate("/details");
            }}
          >
            CHECK OUT
          </button>
        </div>
      </div>

      <div className={css.overlayBg} onClick={() => setCartOpen(false)} />
    </div>
  );
};

export default CartOverlay;
