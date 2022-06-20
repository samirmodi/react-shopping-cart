import React, { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, filterReducer } from "./Reducers";

const CartContext = createContext();

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.fashion(200, 170, true),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 9]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [filterState, filterDispatcher] = useReducer(filterReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(products);
  return (
    <CartContext.Provider
      value={{ state, dispatch, filterState, filterDispatcher }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(CartContext);
};
