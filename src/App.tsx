import { FormControl, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Decimal from 'decimal.js';
import React from 'react';


interface StoreData {
  current_budget: Decimal;
  last_update: Date;
}


const Store = (function () {
  const KEY = 'budget';
  const initData = { current_budget: new Decimal('0'), last_update: new Date() } as StoreData;

  const get = function () {
    const rowData = localStorage.getItem(KEY);
    const data = rowData !== null ? JSON.parse(rowData) : null;
    return data === null ?
      null :
      { current_budget: new Decimal(data.current_budget), last_update: new Date(data.last_update + 'T00:00:00Z') } as StoreData;
  };

  const set = function (value: StoreData) {
    localStorage.setItem(
      KEY, JSON.stringify({ current_budget: value.current_budget.toString(), last_update: value.last_update.toISOString().slice(0, 10) })
    );
  };

  if (get() === null)
    set(initData);

  return {
    get: function () {
      return get()!;
    },
    set
  };
})();


const useBudget = function () {
  const [currentBudget, setCurrentBudget] = React.useState(Store.get().current_budget);
  React.useEffect(() => {
    Store.set({ current_budget: currentBudget, last_update: new Date() });
  }, [currentBudget]);

  return [currentBudget, (value: Decimal) => setCurrentBudget(currentBudget.sub(value))] as [Decimal, (value: Decimal) => void];
}


const App = function () {
  const [budget, addToCurrentBudget] = useBudget();
  const [currentValue, setCurrentValue] = React.useState('');

  const onChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      addToCurrentBudget(new Decimal(currentValue));
      setCurrentValue('');
    }
    catch (e) {
      console.log('Error!');
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h1">Budget</Typography>
        <Typography variant="h2">{budget.toNumber().toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">€</InputAdornment>} inputProps={{ type: "number", step: "0.01" }} label="Amount" autoFocus={true} value={currentValue} onChange={onChange} autoComplete="off" />
          </FormControl>
        </form>
      </Container>
    </>
  );
};

export default App
