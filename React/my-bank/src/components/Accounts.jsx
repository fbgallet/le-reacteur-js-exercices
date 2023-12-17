import Account from "./Account";

function Accounts({ accounts }) {
  return (
    <div className="main">
      {accounts.map((account, index) => {
        return (
          <div className="account" key={index}>
            <Account {...account} />
          </div>
        );
      })}
    </div>
  );
}

export default Accounts;
