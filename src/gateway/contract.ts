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

  // const balance = await contract.balanceOf(
  //   "0x88D1B6c1c6Ee73e7F4dDdfAC2BFa39e70bC92BB0"
  // );

  // console.log(`Balance Returned: ${balance}`);
  // console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}\n`);

  return symbol;
};

export default readContract;