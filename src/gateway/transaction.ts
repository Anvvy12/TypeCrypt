import { ethers } from "ethers";

const INFURA_ID = "23942b814e664e96b6f50745dd46418e";
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${INFURA_ID}`
);

// const account1 = "0x88D1B6c1c6Ee73e7F4dDdfAC2BFa39e70bC92BB0"; // Your account address 1
// const account2 = "0xAD9B32A67d7eB833204b7F5969995Dab890f6B0F"; // Your account address 2

const privateKey1 =
  "67c4ad7e11e934b2359aa1363526c9bbe72348419a4a2945cac64010ab5fef4f"; // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider);

const transfer = async (
  fromEallet: string,
  toWallet: string,
  value: string
) => {
  const senderBalanceBefore = await provider.getBalance(fromEallet);
  const recieverBalanceBefore = await provider.getBalance(toWallet);

  console.log(
    `\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`
  );
  console.log(
    `reciever balance before: ${ethers.utils.formatEther(
      recieverBalanceBefore
    )}\n`
  );

  const tx = await wallet.sendTransaction({
    to: toWallet,
    value: ethers.utils.parseEther(value),
  });

  await tx.wait();
  console.log(tx);

  const senderBalanceAfter = await provider.getBalance(fromEallet);
  const recieverBalanceAfter = await provider.getBalance(toWallet);

  console.log(
    `\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`
  );
  console.log(
    `reciever balance after: ${ethers.utils.formatEther(
      recieverBalanceAfter
    )}\n`
  );
};

export default transfer;
