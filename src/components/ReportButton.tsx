import jsPDF from "jspdf";

interface ReportButtonProps {
  depositAmount: number;
  interestRate: number;
  tenure: number;
  frequency: string;
  maturityAmount: number;
  interestEarned: number;
}

function ReportButton({
  depositAmount,
  interestRate,
  tenure,
  frequency,
  maturityAmount,
  interestEarned,
}: ReportButtonProps) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("FD INVESTMENT REPORT", 20, 20);

    // Divider
    doc.line(20, 30, 190, 30);

    // Body
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(
      `Deposit Amount : Rs. ${depositAmount.toLocaleString("en-IN")}`,
      20,
      50
    );

    doc.text(
      `Interest Rate : ${interestRate}%`,
      20,
      65
    );

    doc.text(
      `Tenure : ${tenure} Years`,
      20,
      80
    );

    doc.text(
      `Compound Frequency : ${
        frequency.charAt(0).toUpperCase() + frequency.slice(1)
      }`,
      20,
      95
    );

    // Divider
    doc.line(20, 105, 190, 105);

    doc.setFont("helvetica", "bold");

    doc.text(
      `Interest Earned : Rs. ${interestEarned.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`,
      20,
      125
    );

    doc.text(
      `Maturity Amount : Rs. ${maturityAmount.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`,
      20,
      145
    );

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(
      `Generated On: ${new Date().toLocaleDateString("en-IN")}`,
      20,
      180
    );

    // Open PDF in New Tab
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");
  };

  return (
    <button
      className="pdf-btn"
      onClick={generatePDF}
    >
      View FD Report
    </button>
  );
}

export default ReportButton;