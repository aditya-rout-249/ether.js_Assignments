import { React } from "react";
import { FormControl, Button, TextField } from "@material-ui/core";

const TransactionForm = ({
  processPayment,
  walletBalance,
  onAddressChange,
  onAmountChange,
  disableMessage
}) => {
  return (
    <div>
      <h1>Send ETH payment</h1>
      <FormControl style={{ widht: 400 }}>
        <TextField
          onChange={onAddressChange}
          placeholder="Reciever's Address"
        />
        <TextField
          onChange={onAmountChange}
          placeholder={`Amount in Ethers should be less than ${walletBalance}`}
        />
        <br />
        <Button disabled={disableMessage} variant="contained" onClick={processPayment}>
          Pay
        </Button>
      </FormControl>
    </div>
  );
};

export default TransactionForm;
