"use client";
import "./wallet-form.scss";
import { useEffect, useState } from "react";
import connectToMetaMask from "@/gateway/conect.wallet";
import transfer from "@/gateway/transaction";
import Input from "../input/Input";
import Info from "../info/Info";

interface InputsData {
  toWallet: string;
  fromWallet: string;
  value: string;
}
interface WalletData {
  address: string;
  balance: string;
  symbol: string;
}

const WalletForm: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData>({
    address: "",
    balance: "",
    symbol: "ETH",
  });

  const [inputsData, setInputsData] = useState<InputsData>({
    toWallet: "",
    fromWallet: "",
    value: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputsData({ ...inputsData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    transfer(inputsData.fromWallet, inputsData.toWallet, inputsData.value);
    setInputsData({ ...inputsData, value: "" });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const walletDataFetch = await connectToMetaMask().then((data) => data);

        setWalletData({
          ...walletData,
          address: walletDataFetch?.walletAddress || "",
          balance: walletDataFetch?.walletBalance || "",
        });
        setInputsData({
          ...inputsData,
          fromWallet: walletDataFetch?.walletAddress || "",
        });
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="main">
      <form className="form" onSubmit={handleSubmit}>
        {walletData.address === "" ? (
          <div className="conect">
            <strong>Please Conect your MetaMask wallet</strong>
          </div>
        ) : (
          <Info
            address={walletData.address}
            symbol={walletData.symbol}
            balance={walletData.balance}
          />
        )}

        <div className="input-container">
          <label htmlFor="from" className="label">
            From
          </label>
          <Input
            handleChange={handleChange}
            value={inputsData.fromWallet}
            placeholder={"from (adress)"}
            name="fromWallet"
          />
        </div>
        <div className="input-container">
          <label htmlFor="to" className="label">
            To
          </label>
          <Input
            handleChange={handleChange}
            value={inputsData.toWallet}
            placeholder={"to (adress)"}
            name="toWallet"
          />
        </div>
        <div className="input-container">
          <label htmlFor="count" className="label">
            Value <span className="uint">(uint256)</span>
          </label>
          <Input
            handleChange={handleChange}
            value={inputsData.value}
            placeholder={"value"}
            name="value"
          />
        </div>
        <button className="button" type="submit">
          Send
        </button>
      </form>
    </main>
  );
};

export default WalletForm;
