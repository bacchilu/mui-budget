import Decimal from "decimal.js";
import React from "react";

import { LocalStore } from "../libs/local-store";

const CurrentBudget = (function () {
  const storeData = LocalStore.get();
  let current_budget = storeData.current_budget;
  const last_recharge = storeData.last_recharge;

  return {
    get: function () {
      return current_budget;
    },
    set: function (value: Decimal) {
      current_budget = value;
      LocalStore.set({ current_budget, last_recharge });
    },
  };
})();

export const useBudget = function (): [Decimal, (value: Decimal) => void] {
  const [currentBudget, setCurrentBudget] = React.useState(CurrentBudget.get());
  React.useEffect(() => {
    CurrentBudget.set(currentBudget);
  }, [currentBudget]);

  return [
    currentBudget,
    (value: Decimal) => setCurrentBudget(currentBudget.sub(value)),
  ];
};
