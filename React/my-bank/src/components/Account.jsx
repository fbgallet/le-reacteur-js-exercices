import Button from "./Button";

function formatNumber(number) {
  return number.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function Account({ name, balance, color, operations }) {
  return (
    <>
      <div
        className={
          "account-title " + (color === "#1976D2" ? "blue-bg" : "red-bg")
        }
      >
        <div>{name}</div>
        <div className="value">{formatNumber(balance)} €</div>
      </div>
      <div className="operations">
        {operations.map((operation, index) => {
          const { date, description, amount } = operation;
          return (
            <div className={"line " + (index % 2 ? "grey-bg" : "white-bg")}>
              <div>{date}</div>
              <div>{description}</div>
              <div className="value">{formatNumber(amount)} €</div>
            </div>
          );
        })}
      </div>
      <div className="btn-more">
        <Button />
      </div>
    </>
  );
}

export default Account;
