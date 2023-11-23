import Decimal from "decimal.js";

export const toCurrency = function (value: Decimal) {
  return value
    .toNumber()
    .toLocaleString("it-IT", { style: "currency", currency: "EUR" });
};

export const DateUtils = {
  getToday: function () {
    const now = new Date();
    return new Date(now.toISOString().slice(0, 10));
  },
  toDate: function (value: string) {
    return new Date(`${value}T00:00:00Z`);
  },
  toISO: function (value: Date) {
    return value.toISOString().slice(0, 10);
  },
};
