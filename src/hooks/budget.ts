import Decimal from 'decimal.js';
import React from 'react';

import {CurrentBudget, LastRecharge} from '../libs/local-store';
import {DateUtils} from '../libs/utils';

export const useBudget = function () {
    const [currentBudget, setCurrentBudget] = React.useState(CurrentBudget.get());
    React.useEffect(() => {
        CurrentBudget.set(currentBudget);
    }, [currentBudget]);

    return {
        currentBudget,
        lastRecharge: LastRecharge.get(),
        addToCurrentBudget: (value: Decimal) => setCurrentBudget(currentBudget.sub(value)),
        recharge: function (value: Decimal) {
            LastRecharge.set(DateUtils.getToday());
            setCurrentBudget(currentBudget.add(value));
        },
    };
};

// export const evalRechargeValue = function (lastRecharge: Date, today: Date) {
//   return new Decimal("0");
// };
