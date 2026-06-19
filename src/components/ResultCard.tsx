interface ResultCardProps {
  depositAmount: number;
  maturityAmount: number;
  interestEarned: number;
}

function ResultCard({
  depositAmount,
  maturityAmount,
  interestEarned,
}: ResultCardProps) {
  return (
    <div className="result-card">
      <h2>FD Summary</h2>

      <div className="result-row">
        <span>Deposit Amount</span>
        <strong>
          ₹
          {depositAmount.toLocaleString("en-IN")}
        </strong>
      </div>

      <div className="result-row">
        <span>Interest Earned</span>
        <strong>
          ₹
          {interestEarned.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}
        </strong>
      </div>

      <div className="result-row total">
        <span>Maturity Amount</span>
        <strong>
          ₹
          {maturityAmount.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}
        </strong>
      </div>
    </div>
  );
}

export default ResultCard;