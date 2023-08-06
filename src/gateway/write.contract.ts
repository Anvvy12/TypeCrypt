import { ethers } from "ethers";
import BigNumber from "bignumber.js";

const INFURA_ID = "2283b16e9bbc47c8bb27ac359d446f4a";
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${INFURA_ID}`
);

const privateKey1 =
  "67c4ad7e11e934b2359aa1363526c9bbe72348419a4a2945cac64010ab5fef4f"; // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider);

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint)",
];

const address = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const writeContract = async (
  fromWallet: string,
  toWallet: string,
  value: string
) => {
  const balance = await contract.balanceOf(fromWallet);
  const decimals = await contract.decimals();
  console.log("decimals", parseInt(decimals._hex, 16));

  console.log(`\nReading from ${address}\n`);
  console.log(`Balance of sender: ${balance}\n`);

  const contractWithWallet = contract.connect(wallet);
  const finalValue = BigNumber(value).times(10 ** decimals);

  const tx = await contractWithWallet.transfer(toWallet, `${finalValue}`);
  await tx.wait();

  console.log(tx);

  const balanceOfSender = await contract.balanceOf(fromWallet);
  const balanceOfReciever = await contract.balanceOf(toWallet);

  console.log(`\nBalance of sender: ${balanceOfSender}`);
  console.log(`Balance of reciever: ${balanceOfReciever}\n`);
};

export default writeContract;
