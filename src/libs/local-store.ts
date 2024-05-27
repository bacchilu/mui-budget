import Decimal from 'decimal.js';

import {DateUtils} from './utils';

export const CurrentBudget = (function () {
    const KEY = 'current_budget';
    const initData = new Decimal('0');

    const get = function () {
        const rowData = localStorage.getItem(KEY);
        const data = rowData !== null ? rowData : null;
        return data === null ? null : new Decimal(data);
    };

    const set = function (value: Decimal) {
        localStorage.setItem(KEY, value.toString());
    };

    if (get() === null) set(initData);

    return {
        get: function () {
            return get()!;
        },
        set,
    };
})();

export const LastRecharge = (function () {
    const KEY = 'last_recharge';
    const initData = DateUtils.getToday();

    const get = function () {
        const rowData = localStorage.getItem(KEY);
        const data = rowData !== null ? rowData : null;
        return data === null ? null : DateUtils.toDate(data);
    };

    const set = function (value: Date) {
        localStorage.setItem(KEY, DateUtils.toISO(value));
    };

    if (get() === null) set(initData);

    return {
        get: function () {
            return get()!;
        },
        set,
    };
})();
