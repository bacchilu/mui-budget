import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import Decimal from "decimal.js";
import React from "react";

import { LocalStore } from "./libs/local-store";
import { toCurrency } from "./libs/utils";

const useBudget = function () {
  const [currentBudget, setCurrentBudget] = React.useState(
    LocalStore.get().current_budget
  );
  React.useEffect(() => {
    LocalStore.set({
      current_budget: currentBudget,
      last_recharge: new Date(),
    });
  }, [currentBudget]);

  return [
    currentBudget,
    (value: Decimal) => setCurrentBudget(currentBudget.sub(value)),
  ] as [Decimal, (value: Decimal) => void];
};

const Amount: React.FC<{ value: string; setValue: (v: string) => void }> =
  function ({ value, setValue }) {
    const onChange = function (e: React.ChangeEvent<HTMLInputElement>) {
      setValue(e.target.value);
    };

    return (
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel>Amount</InputLabel>
        <OutlinedInput
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
          inputProps={{ type: "number", step: "0.01" }}
          label="Amount"
          autoFocus={true}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
      </FormControl>
    );
  };

const AmountForm: React.FC<{ onSubmit: (v: Decimal) => void }> = function ({
  onSubmit,
}) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      onSubmit(new Decimal(value));
      setValue("");
    } catch (e) {
      console.log("Error!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Amount value={value} setValue={setValue} />
    </form>
  );
};

const App = function () {
  const [budget, addToCurrentBudget] = useBudget();

  return (
    <Container maxWidth="sm">
      <Typography variant="h1">Budget</Typography>
      <Typography variant="h2">{toCurrency(budget)}</Typography>
      <AmountForm onSubmit={addToCurrentBudget} />
    </Container>
  );
};

export default App;
