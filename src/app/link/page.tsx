"use client";
import { useEffect, useState } from "react";

import readContract from "@/gateway/read.contract";
import connectToMetaMask from "@/gateway/conect.wallet";
import writeContract from "@/gateway/write.contract";
import Input from "../input/Input";
import Info from "../info/Info";
import "../wallet-form/wallet-form.scss";
import Link from "next/link";

interface InputsData {
  toWallet: string;
  fromWallet: string;
  value: string;
}
interface WalletData {
  address: string;
  balance: string;
  symbol: string;
  decimal: number;
}

const LinkForm: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData>({
    address: "",
    balance: "",
    symbol: "",
    decimal: 0,
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
    writeContract(inputsData.fromWallet, inputsData.toWallet, inputsData.value);
    setInputsData({ ...inputsData, value: "" });
  };

  //

  useEffect(() => {
    async function fetchData() {
      try {
        const walletDataFetch = await connectToMetaMask().then((data) => data);

        setWalletData({
          ...walletData,
          address: walletDataFetch?.walletAddress || "",
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

  useEffect(() => {
    async function fetchData() {
      const contractData = await readContract(walletData.address).then(
        (data) => data
      );
      setWalletData({
        ...walletData,
        balance: "" + contractData?.balance,
        symbol: contractData?.symbol,
        decimal: contractData.decimal,
      });
    }

    fetchData();
  }, [walletData.address]);

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
          <label htmlFor="fromWallet" className="label">
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
          <label htmlFor="toWallet" className="label">
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
          <label htmlFor="value" className="label">
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
        <Link legacyBehavior={true} href="/">
          <a>Перейти на сторінку ETH</a>
        </Link>
      </form>
    </main>
  );
};

export default LinkForm;
