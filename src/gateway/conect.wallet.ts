import { ethers, Contract } from "ethers";
import { Web3Provider } from "@ethersproject/providers";

// Функція для підключення до MetaMask і отримання адреси гаманця та балансу

interface CustomWindow extends Window {
  ethereum?: any;
}

declare const window: CustomWindow;

const chainChangetHandler = () => {
  window.location.reload();
};
async function connectToMetaMask() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress().then((value) => value);
    const network = await provider.getNetwork();
    console.log(network);

    const balance = await provider.getBalance(walletAddress);
    const walletBalance = ethers.utils.formatEther(balance._hex);
    window.ethereum.on("accountsChanged", chainChangetHandler);
    window.ethereum.on("chainChanged", chainChangetHandler);

    return { walletAddress, walletBalance };
  } else {
  }
}

export default connectToMetaMask;
