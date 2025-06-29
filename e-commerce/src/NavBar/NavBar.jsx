import React from "react";
import { Link } from "react-router-dom";
import css from "./NavBar.module.css";
import logo from "../Images/logo.svg";
import cartIcons from "../Images/cartIcon.svg";
import { CurrencyContext } from "../Currency/CurrencyContext";
import { CartContext } from "../Cart/CartContext";
import { useContext } from "react";

const NavBar = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);
  const { cartItems, setCartOpen } = useContext(CartContext);

  return (
    <nav className={css.navbar}>
      <div className={css.navLink}>
        <Link to="/women" className={css.gender}>
          Women
        </Link>
        <Link to="/men" className={css.gender}>
          Men
        </Link>
        <Link to="/kids" className={css.gender}>
          Kids
        </Link>
      </div>

      <div className={css.logoContainer}>
        <img src={logo} alt="logo" className={css.logo} />
      </div>

      <div className={css.currencyContainer}>
        <div className="relative">
          <select
            className={css.currencySelector}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="$">$ USD</option>
            <option value="€">€ EUR</option>
            <option value="¥">¥ JPY</option>
          </select>

          <div className={css.cartIcon}>
            <button
              onClick={() => setCartOpen((prev) => !prev)}
              className={css.cartButton}
            >
              <img src={cartIcons} alt="cart" className={css.cartImgBtn} />
              {cartItems.length > 0 && (
                <span className={css.badge}>{cartItems.length}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
