import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function useCheckout() {
  return useContext(CheckoutContext);
}

export const CheckoutProvider = ({ children }) => {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [card, setCard] = useState({
    name: "",
    number: "",
  });

  const value = {
    info,
    setInfo,
    card,
    setCard,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
