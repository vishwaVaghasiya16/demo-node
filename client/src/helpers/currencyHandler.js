import { currency } from "./enum";

export const currencyHandler = (price = 0, symbol = true) => {
  const checkNumber = Number(price) || 0;
  if (symbol) {
    return currency + checkNumber.toLocaleString("en-IN");
  } else {
    return checkNumber.toLocaleString("en-IN");
  }
};
