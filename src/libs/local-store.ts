import Decimal from "decimal.js";

interface StoreData {
  current_budget: Decimal;
  last_recharge: Date;
}

export const LocalStore = (function () {
  const KEY = "budget";
  const initData = {
    current_budget: new Decimal("0"),
    last_recharge: new Date(),
  } as StoreData;

  const get = function () {
    const rowData = localStorage.getItem(KEY);
    const data = rowData !== null ? JSON.parse(rowData) : null;
    return data === null
      ? null
      : ({
          current_budget: new Decimal(data.current_budget),
          last_recharge: new Date(data.last_recharge + "T00:00:00Z"),
        } as StoreData);
  };

  const set = function (value: StoreData) {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        current_budget: value.current_budget.toString(),
        last_recharge: value.last_recharge.toISOString().slice(0, 10),
      })
    );
  };

  if (get() === null) set(initData);

  return {
    get: function () {
      return get()!;
    },
    set,
  };
})();
