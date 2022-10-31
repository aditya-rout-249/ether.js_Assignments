import { React, useState } from "react";
import { ethers } from "ethers";
import { Button } from "@material-ui/core";
import TransactionForm from "./transactionForm";

function WalletDetails() {
  //Settting up state Variables
 
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();
  const [walletBalance, setWalletBalance] = useState();
  const [receiverAddress, setRecieverAddress] = useState();
  const [amount, setAmount] = useState();
  const [disableMessage, setdisableMessage] = useState(false);

  // Setting up Metamask Account details with ether.js Provider
  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const account = await provider.send("eth_requestAccounts");
      setAccount(account[0]); // Setting account state to current selected account
      const currentSigner = provider.getSigner();
      setSigner(currentSigner);
      const balance = await provider.getBalance(account[0]);
      setWalletBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      alert(error);
    }
  }

  //onChange eventlisterners For transaction form
  const onAddressChange= async (event) => {
    setRecieverAddress(event.target.value);
  }

  const onAmountChange = async (event) => {
    setAmount(event.target.value);
  }

  //function to process payment transaction
  const  processPayment = async() => {

    setdisableMessage(true);// disabling pay button until transanctioni executed
    
    try {
      ethers.utils.getAddress(receiverAddress);// Validating if reciever's address is Valid or Not
    } catch (error) {
      return alert(error);
    }

    try {
      const transaction = await signer.sendTransaction({
        to: receiverAddress,
        value: ethers.utils.parseEther(amount),
      }); // Sending Transaction  request

      console.log(transaction);
    } catch (error) {
      alert(error);
    }
    setdisableMessage(false); // enabling pay button  after transaction is executed
  }

  //if account is connected then only payment form and ether balance component renders
  return account ? (
    <div>
      <div style={{ height: 100 }}>{walletBalance}:ETH</div>
      <form>
        <TransactionForm
          disableMessage={disableMessage}
          processPayment={processPayment}
          walletBalance={walletBalance}
          onAddressChange={onAddressChange}
          onAmountChange={onAmountChange}
        />
      </form>
    </div>
  ) : (
    <Button variant="contained" onClick={connectWallet}>
      Connect To Wallet
    </Button>
  );
}

export default WalletDetails;
