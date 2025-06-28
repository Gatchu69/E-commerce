import React from "react";
import ProductGrid from "../Product Grid/ProductGrid";
import MenProducts from "../Data/MenProducts";

function MenPage() {
  return <ProductGrid title="Men Page" products={MenProducts} />;
}

export default MenPage;
