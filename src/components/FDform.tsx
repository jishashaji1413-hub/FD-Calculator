import { useState } from "react";
import ResultCard from "./ResultCard";
import ReportButton from "./ReportButton";

interface FDResult {
  maturityAmount: number;
  interestEarned: number;
}

const FDForm = () => {
  const [depositAmount, setDepositAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [tenure, setTenure] = useState<number>(5);
  const [frequency, setFrequency] = useState<string>("yearly");

  const [result, setResult] = useState<FDResult | null>(null);

  const getCompoundFrequency = () => {
    switch (frequency) {
      case "monthly":
        return 12;
      case "quarterly":
        return 4;
      case "half-yearly":
        return 2;
      default:
        return 1;
    }
  };

  const calculateFD = () => {
    const n = getCompoundFrequency();

    const maturityAmount =
      depositAmount *
      Math.pow(1 + interestRate / 100 / n, n * tenure);

    const interestEarned = maturityAmount - depositAmount;

    setResult({
      maturityAmount,
      interestEarned,
    });
  };

  return (
    <div className="fd-container">
      <h1>FD Calculator</h1>

      <div className="form-group">
        <label>Deposit Amount (₹)</label>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Interest Rate (%)</label>
        <input
          type="number"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Tenure (Years)</label>
        <input
          type="number"
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Compound Frequency</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="yearly">Yearly</option>
          <option value="half-yearly">Half-Yearly</option>
          <option value="quarterly">Quarterly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <button onClick={calculateFD}>
        Calculate FD
      </button>

      {result && (
        <>
          <ResultCard
            depositAmount={depositAmount}
            maturityAmount={result.maturityAmount}
            interestEarned={result.interestEarned}
          />

          <ReportButton
            depositAmount={depositAmount}
            interestRate={interestRate}
            tenure={tenure}
            frequency={frequency}
            maturityAmount={result.maturityAmount}
            interestEarned={result.interestEarned}
          />
        </>
      )}
    </div>
  );
};

export default FDForm;