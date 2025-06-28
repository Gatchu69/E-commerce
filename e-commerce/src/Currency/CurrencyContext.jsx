import React, { createContext, useState } from "react";

export const CurrencyContext = createContext();

const rates = {
  $: 1,
  "€": 0.93,
  "¥": 157,
};

const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("$");

  const convertPrice = (usdPrice) => {
    const rate = rates[currency] || 1;
    return usdPrice * rate;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
