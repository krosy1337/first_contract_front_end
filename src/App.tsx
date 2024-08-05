import { TonConnectButton } from "@tonconnect/ui-react";
import { fromNano } from "ton-core";
import "./App.css";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";

function App() {
  const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();
  const { connected } = useTonConnect();
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
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
