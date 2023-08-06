import "./info.scss";

interface InfoInterface {
  symbol: string;
  address: string;
  balance: string;
}

const Info: React.FC<InfoInterface> = ({ address, balance, symbol }) => {
  return (
    <div className="info-container">
      <div className="section-container">
        <strong className="head">Wallet Adress: </strong>
        <address className="address">{address}</address>
      </div>
      <div className="section-container">
        <strong className="label">Balance: </strong>
        {balance ? (
          <span id="balance" className="address">
            {`${balance}  ${symbol}`}
          </span>
        ) : (
          <span className="loader">Loading ...</span>
        )}
      </div>
    </div>
  );
};

export default Info;
