interface infoInterface {
  symbol: string;
  address: string;
  balance: string;
}

const Info: React.FC<infoInterface> = ({ address, balance, symbol }) => {
  return (
    <div className="info-container">
      <div className="section-container">
        <strong className="head">Wallet Adress: </strong>
        <address className="address">{address}</address>
      </div>
      <div className="section-container">
        <strong className="label">Balance: </strong>
        <span id="balance" className="address" placeholder="From">
          {`${balance}  ${symbol}`}
        </span>
      </div>
    </div>
  );
};

export default Info;
