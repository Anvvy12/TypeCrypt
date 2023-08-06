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

// Функція для отримання ціни WBT у доларах
// async function getEthPriceInUSD(): Promise<number | null> {
//   try {
//     const response = await axios.get(
//       "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
//     );
//     const ethPriceInUSD = response.data.ethereum.usd;

//     return ethPriceInUSD;
//   } catch (error) {
//     console.error("Помилка при отриманні ціни ETH:", error);
//     return null;
//   }
// }

// async function fetchDataABI(
//   address: string | undefined
// ): Promise<{ result?: string }> {
//   try {
//     const response = await fetch(
//       `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=1DVI5Q65BCXGSZ93JZ13GBIJB85QHIJ5V1`
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Помилка при отриманні ABI:", error);
//     return {};
//   }
// }

export default connectToMetaMask;
