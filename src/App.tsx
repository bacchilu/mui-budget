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

const useBudget = function () {
  const [currentBudget, setCurrentBudget] = React.useState(
    LocalStore.get().current_budget
  );
  React.useEffect(() => {
    LocalStore.set({ current_budget: currentBudget, last_update: new Date() });
  }, [currentBudget]);

  return [
    currentBudget,
    (value: Decimal) => setCurrentBudget(currentBudget.sub(value)),
  ] as [Decimal, (value: Decimal) => void];
};

const App = function () {
  const [budget, addToCurrentBudget] = useBudget();
  const [currentValue, setCurrentValue] = React.useState("");

  const onChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      addToCurrentBudget(new Decimal(currentValue));
      setCurrentValue("");
    } catch (e) {
      console.log("Error!");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h1">Budget</Typography>
        <Typography variant="h2">
          {budget
            .toNumber()
            .toLocaleString("it-IT", { style: "currency", currency: "EUR" })}
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel>Amount</InputLabel>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              inputProps={{ type: "number", step: "0.01" }}
              label="Amount"
              autoFocus={true}
              value={currentValue}
              onChange={onChange}
              autoComplete="off"
            />
          </FormControl>
        </form>
      </Container>
    </>
  );
};

export default App;
