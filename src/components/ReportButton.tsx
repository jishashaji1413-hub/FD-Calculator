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

    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);

    doc.text(
      "FIXED DEPOSIT REPORT",
      pageWidth / 2,
      20,
      { align: "center" }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(
      "Investment Summary & Maturity Projection",
      pageWidth / 2,
      28,
      { align: "center" }
    );

    doc.line(20, 35, 190, 35);

    // Summary Box
    doc.setDrawColor(150);
    doc.rect(20, 45, 170, 75);

    doc.setFontSize(12);

    doc.text("Deposit Amount", 30, 60);
    doc.text(
      `Rs. ${depositAmount.toLocaleString("en-IN")}`,
      125,
      60
    );

    doc.text("Interest Rate", 30, 75);
    doc.text(
      `${interestRate}%`,
      125,
      75
    );

    doc.text("Tenure", 30, 90);
    doc.text(
      `${tenure} Years`,
      125,
      90
    );

    doc.text("Compounding Frequency", 30, 105);
    doc.text(
      frequency.charAt(0).toUpperCase() +
        frequency.slice(1),
      125,
      105
    );

    // Return Summary
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);

    doc.text(
      "RETURN SUMMARY",
      20,
      140
    );

    doc.line(20, 145, 190, 145);

    doc.setFontSize(13);

    doc.text(
      "Interest Earned",
      30,
      165
    );

    doc.text(
      `Rs. ${interestEarned.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`,
      125,
      165
    );

    // Highlight Maturity Amount
    doc.setFillColor(230, 240, 255);
    doc.rect(20, 175, 170, 22, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);

    doc.text(
      "Maturity Amount",
      30,
      189
    );

    doc.text(
      `Rs. ${maturityAmount.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`,
      125,
      189
    );

    // Footer
    doc.line(20, 220, 190, 220);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(
      `Generated On: ${new Date().toLocaleDateString(
        "en-IN"
      )}`,
      20,
      230
    );

    doc.text(
      "This report is generated for informational purposes only.",
      pageWidth / 2,
      240,
      {
        align: "center",
      }
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