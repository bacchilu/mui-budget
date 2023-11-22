import Decimal from "decimal.js";

export const toCurrency = function (value: Decimal) {
  return value
    .toNumber()
    .toLocaleString("it-IT", { style: "currency", currency: "EUR" });
};

export const getToday = function () {
  const now = new Date();
  return new Date(now.toISOString().slice(0, 10));
};
