"use client";
import "./index.scss";
import { useEffect, useState } from "react";
import { connectToMetaMask } from "@/gateway/conect.wallet";
import readContract from "../gateway/contract";
import transfer from "@/gateway/transaction";
import Input from "./input/Input";
import Info from "./info/Info";

interface InputsData {
  toWallet: string;
  fromWallet: string;
  value: string;
}
interface walletData {
  address: string;
  balance: string;
  symbol: string;
}

export default function Home() {
  const [walletData, setWalletData] = useState<walletData>({
    address: "",
    balance: "",
    symbol: "",
  });

  const [inputsData, setInputsData] = useState<InputsData>({
    toWallet: "",
    fromWallet: "",
    value: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputsData({ ...inputsData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    transfer(inputsData.fromWallet, inputsData.toWallet, inputsData.value);
  };

  //

  useEffect(() => {
    async function fetchData() {
      try {
        const [walletData, symbol] = await Promise.all([
          connectToMetaMask(),
          readContract(),
        ]).then((data) => data);

        setWalletData({
          address: walletData?.walletAddress || "",
          balance: walletData?.walletBalance || "",
          symbol: symbol,
        });
        setInputsData({
          ...inputsData,
          fromWallet: walletData?.walletAddress || "",
        });
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    }

    fetchData();
  }, []);

  console.log(inputsData);

  return (
    <main className="main">
      <section className="section">
        <Info
          address={walletData.address}
          symbol={walletData.symbol}
          balance={walletData.balance}
        />

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
        <button className="button" type="submit" onClick={handleSubmit}>
          Send
        </button>
      </section>
    </main>
  );
}
