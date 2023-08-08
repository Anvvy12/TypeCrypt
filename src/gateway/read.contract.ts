import { Web3Provider } from "@ethersproject/providers";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";

let BN = BigNumber.clone();
BN.config({ DECIMAL_PLACES: 18 });

const INFURA_ID = "2283b16e9bbc47c8bb27ac359d446f4a";
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${INFURA_ID}`
);

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
  "function decimals() view returns (uint)",
];

// const address = "0x2Cdaa8a351DFc17657C69cd79024a0d2ad504d39"; // DAI Contract
const address = "0x779877A7B0D9E8603169DdbD7836e478b4624789"; // LINK Contract

const contract = new ethers.Contract(address, ERC20_ABI, provider);

const readContract = async (walletAddress: string) => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const contractBalance = await contract.balanceOf(walletAddress);
  const decimal = await contract.decimals();
  const balance = BigNumber("" + contractBalance).dividedBy(10 ** decimal);

  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total Supply: ${totalSupply}\n`);
  console.log(`balance: ${balance}\n`);
  console.log(`decimal: ${decimal}\n`);

  return { symbol, balance, decimal };
};

export default readContract;
