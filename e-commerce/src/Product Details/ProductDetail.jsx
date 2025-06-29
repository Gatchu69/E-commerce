import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import { CurrencyContext } from "../Currency/CurrencyContext";
import Products from "../Data/AllProducts";

import css from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart, setCartOpen } = useContext(CartContext);
  const { currency, convertPrice } = useContext(CurrencyContext);

  const product = Products.find((p) => p.id === parseInt(productId));
  const images = [product.imageUrl];
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }

    addToCart({ ...product }, selectedSize);
    setCartOpen(true);
    setError("");
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className={css.productDetail}>
      <div className={css.imageColumn}>
        <div className={css.thumbnails}></div>
        <img src={selectedImage} alt="Main" className={css.mainImage} />
      </div>

      <div className={css.infoColumn}>
        <h2>{product.name}</h2>
        <p className={css.price}>
          {currency}
          {convertPrice(product.price).toFixed(2)}
        </p>

        <h4>Select Size:</h4>
        <div className={css.sizes}>
          {["XS", "S", "M", "L"].map((size) => (
            <button
              key={size}
              className={`${css.sizeBtn} ${
                selectedSize === size ? css.active : ""
              }`}
              onClick={() => {
                setSelectedSize(size);
                setError("");
              }}
            >
              {size}
            </button>
          ))}
        </div>
        {error && <p className={css.error}>{error}</p>}

        <button className={css.addBtn} onClick={handleAddToCart}>
          ADD TO CART
        </button>

        <p className={css.description}>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
