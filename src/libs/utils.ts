import Decimal from "decimal.js";

export const toCurrency = function (value: Decimal) {
  return value
    .toNumber()
    .toLocaleString("it-IT", { style: "currency", currency: "EUR" });
};
