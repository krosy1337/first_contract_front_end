import { TonConnectButton } from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";
import { fromNano } from "ton-core";
import "./App.css";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";

WebApp.showAlert("Hey there");

function App() {
  const {
    contract_address,
    counter_value,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();
  const { connected } = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert("Hey there!");
  };
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
          <b>{WebApp.platform}</b>
          <b>Our contract Address</b>
          <div className="Hint">{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          {contract_balance && (
            <div className="Hint">{fromNano(contract_balance)}</div>
          )}
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>
        <a
          onClick={() => {
            showAlert();
          }}
        >
          Show Alert
        </a>

        <br />
        {connected && (
          <a
            onClick={() => {
              sendIncrement(5);
            }}
          >
            Increment
          </a>
        )}
        <br />
        {connected && (
          <a
            onClick={() => {
              sendDeposit(1);
            }}
          >
            Send Deposit
          </a>
        )}
        <br />
        {connected && (
          <a
            onClick={() => {
              sendWithdrawalRequest(1);
            }}
          >
            Withdraw
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
