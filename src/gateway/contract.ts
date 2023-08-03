import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

const INFURA_ID = "2283b16e9bbc47c8bb27ac359d446f4a";
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];

const address = "0x2Cdaa8a351DFc17657C69cd79024a0d2ad504d39"; // DAI Contract

const contract = new ethers.Contract(address, ERC20_ABI, provider);

const readContract = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();

  // console.log(`\nReading from ${address}\n`);
  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total Supply: ${totalSupply}\n`);

  return symbol;
};

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

// console.log(
//   "fetchData: ",
//   fetchDataABI(addressETH).then((data) => data.result)
// );

export default readContract;
