import React from "react";
import "./ProductGrid.css";
import { CurrencyContext } from "../Currency/CurrencyContext";
import { useContext } from "react";
import { CartContext } from "../Cart/CartContext";
import { Link } from "react-router-dom";
import cartIcon from "../Images/cartIcon.svg";

function ProductGrid({ title, products }) {
  const { currency, convertPrice } = useContext(CurrencyContext);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="container">
      <h1 className="category-title"> {title}</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img
                src={product.imageUrl}
                alt={product.name}
                className={`product-image ${
                  product.outOfStock ? "product-out-of-stock" : ""
                }`}
              />

              {product.outOfStock && (
                <span className="out-of-stock-text">OUT OF STOCK</span>
              )}
            </Link>

            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">
                {currency}
                {convertPrice(product.price).toFixed(2)}
              </p>
            </div>

            {!product.outOfStock && (
              <button
                className="cart-button"
                onClick={() => addToCart(product)}
              >
                <img src={cartIcon} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductGrid;
