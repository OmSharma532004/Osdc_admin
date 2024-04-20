import React, { useState } from 'react';

function FinancialCalculator() {
  const [capital, setCapital] = useState(2500000);
  const [investmentYears, setInvestmentYears] = useState(5); // Example: 5-year investment

  const handleSliderChange = (event) => {
    setCapital(Number(event.target.value));
  };

  // Placeholder for number-to-words conversion logic
  const numberToWords = (num) => {
    // You'll need a proper library or utility function to convert numbers to words
    return "Twenty Five lakh"; // Example placeholder
  };

  // Dummy calculation logic
  const calculateFinancials = (capital, year) => {
    const rentalIncome = capital * 0.05 * year;
    const profitAmount = rentalIncome * 0.65; // Replace with actual calculation logic
    const total = capital + rentalIncome - profitAmount; // Replace with actual calculation logic

    return { rentalIncome, profitAmount, total };
  };

  const financials = calculateFinancials(capital, investmentYears);

  return (
    <div className="financial-calculator">
      <input
        type="text"
        value={`₹ ${capital.toLocaleString()}`}
        readOnly
      />
      <p>{numberToWords(capital)}</p>
      <input
        type="range"
        min="100000"
        max="10000000"
        step="50000"
        value={capital}
        onChange={handleSliderChange}
      />
      <div>
        <p>Profit Amount: ₹ {financials.profitAmount.toLocaleString()}</p>
        <p>Rental Income: ₹ {financials.rentalIncome.toLocaleString()}</p>
        <p>Total: ₹ {financials.total.toLocaleString()}</p>
      </div>
      {/* Render a dynamic table here based on financials */}
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Rental Income</th>
            <th>Profit Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(investmentYears).keys()].map(year => {
            const yearFinancials = calculateFinancials(capital, year + 1);
            return (
              <tr key={year}>
                <td>Year {year + 1}</td>
                <td>₹ {yearFinancials.rentalIncome.toLocaleString()}</td>
                <td>₹ {yearFinancials.profitAmount.toLocaleString()}</td>
                <td>₹ {yearFinancials.total.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FinancialCalculator;
