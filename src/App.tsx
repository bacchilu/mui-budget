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

import { useBudget } from "./hooks/budget";
import { DateUtils, toCurrency } from "./libs/utils";

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
  const { currentBudget, lastRecharge, addToCurrentBudget, recharge } =
    useBudget();
  React.useEffect(() => {
    if (DateUtils.getToday().getTime() > lastRecharge.getTime())
      recharge(new Decimal("0"));
  }, [lastRecharge, recharge]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h1">Budget</Typography>
      <Typography variant="h2">{toCurrency(currentBudget)}</Typography>
      <AmountForm onSubmit={addToCurrentBudget} />
    </Container>
  );
};

export default App;
