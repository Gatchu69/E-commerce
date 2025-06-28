import React from "react";
import ProductGrid from "../Product Grid/ProductGrid";
import KidsProduct from "../Data/KidsProduct";

function KidsPage() {
  return <ProductGrid title="Kids Page" products={KidsProduct} />;
}

export default KidsPage;
