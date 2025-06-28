import React from "react";
import ProductGrid from "../Product Grid/ProductGrid";
import WomenProducts from "../Data/WomenProducts";

function WomanPage() {
  return <ProductGrid title="Women Page" products={WomenProducts} />;
}

export default WomanPage;
