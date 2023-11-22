import Decimal from "decimal.js";
import React from "react";

import { LocalStore } from "../libs/local-store";
import { getToday } from "../libs/utils";

const BudgetData = (function () {
  const storeData = LocalStore.get();
  let current_budget = storeData.current_budget;
  let last_recharge = storeData.last_recharge;

  return {
    getCurrentBudget: () => current_budget,
    setCurrentBudget: function (value: Decimal) {
      current_budget = value;
      LocalStore.set({ current_budget, last_recharge });
    },
    getLastRecharge: () => last_recharge,
    setLastRecharge: function (value: Date) {
      last_recharge = value;
      LocalStore.set({ current_budget, last_recharge });
    },
  };
})();

export const useBudget = function () {
  const [currentBudget, setCurrentBudget] = React.useState(
    BudgetData.getCurrentBudget()
  );
  React.useEffect(() => {
    BudgetData.setCurrentBudget(currentBudget);
  }, [currentBudget]);

  return {
    currentBudget,
    lastRecharge: BudgetData.getLastRecharge(),
    addToCurrentBudget: (value: Decimal) =>
      setCurrentBudget(currentBudget.sub(value)),
    recharge: function (value: Decimal) {
      BudgetData.setLastRecharge(getToday());
      setCurrentBudget(currentBudget.add(value));
    },
  };
};

// export const evalRechargeValue = function (lastRecharge: Date, today: Date) {
//   return new Decimal("0");
// };
