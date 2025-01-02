import React from 'react';

const HomeCard = ({ homes }) => {
  return (
    <div className="grid gap-4">
      {homes.map((home, index) => {
        const {
          address,
          city,
          state,
          zip_code,
          house_value,
          estimated_rent,
          bedrooms,
          bathrooms,
          square_feet,
        } = home.home_details;

        const {
          down_payment,
          interest_rate,
          loan_term_years,
          analysis_year,
          apprentice_rate,
        } = home.calculation_metrics;

        const {
          principle_loan_amount,
          estimated_mortgage,
          estimated_rent_income,
          estimated_appreciation,
          estimated_roi,
        } = home.results;

        return (
          <div key={index} className="border border-gray-300 rounded-md p-4 shadow-md">
            <div className="text-lg font-semibold">
              {address}, {city}, {state} {zip_code}
            </div>
            <div className="mt-4">
              <h4 className="font-bold">Home Details</h4>
              {[
                { label: 'House Value', value: `$${house_value}` },
                { label: 'Estimated Rent', value: `$${estimated_rent.toFixed(2)}` },
                { label: 'Bedrooms', value: bedrooms },
                { label: 'Bathrooms', value: bathrooms },
                { label: 'Square Feet', value: square_feet },
              ].map(({ label, value }) => (
                <p key={label}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>

            <div className="mt-4">
              <h4 className="font-bold">Calculation Metrics</h4>
              {[
                { label: 'Down Payment', value: `$${down_payment}` },
                { label: 'Interest Rate', value: `${interest_rate}%` },
                { label: 'Loan Term (Years)', value: loan_term_years },
                { label: 'Analysis Year', value: analysis_year },
                { label: 'Apprentice Rate', value: `${apprentice_rate}%` },
              ].map(({ label, value }) => (
                <p key={label}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>

            <div className="mt-4">
              <h4 className="font-bold">Results</h4>
              {[
                { label: 'Principle Loan Amount', value: `$${principle_loan_amount.toFixed(2)}` },
                { label: 'Estimated Mortgage', value: `$${estimated_mortgage.toFixed(2)}` },
                { label: 'Estimated Rent Income', value: `$${estimated_rent_income.toFixed(2)}` },
                { label: 'Estimated Appreciation', value: `$${estimated_appreciation.toFixed(2)}` },
                { label: 'Estimated ROI', value: `${estimated_roi.toFixed(2)}%` },
              ].map(({ label, value }) => (
                <p key={label}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeCard;
