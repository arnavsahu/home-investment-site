import React from 'react';

const HomeCard = ({ homes }) => (
  <div className="grid gap-4">
    {homes.map((home, index) => {
      const { home_details = {}, calculation_metrics = {}, results = {} } = home;

      const renderDetails = (title, data) => (
        <div className="mt-4">
          <h4 className="font-bold">{title}</h4>
          {data.map(({ label, value, isDollar, isPercent }) => (
            <p key={label}>
              <strong>{label}:</strong>{" "}
              {value !== undefined
                ? `${isDollar ? formatCurrency(value) : formatNumber(value)}${isPercent ? '%' : ''}`
                : 'N/A'}
            </p>
          ))}
        </div>
      );

      const formatNumber = (value) =>
        value !== null && value !== undefined
          ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
          : null;

      const formatCurrency = (value) =>
        value !== null && value !== undefined
          ? `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`
          : null;

      return (
        <div key={index} className="border border-gray-300 rounded-md p-4 shadow-md">
          <div className="text-lg font-semibold">
            {`${home_details.address || ''}, ${home_details.city || ''}, ${home_details.state || ''} ${home_details.zip_code || ''}`}
          </div>
          {renderDetails('Home Details', [
            { label: 'House Value', value: home_details.house_value, isDollar: true },
            { label: 'Estimated Rent', value: home_details.estimated_rent, isDollar: true },
            { label: 'Bedrooms', value: home_details.bedrooms },
            { label: 'Bathrooms', value: home_details.bathrooms },
            { label: 'Square Feet', value: home_details.square_feet },
          ])}
          {renderDetails('Calculation Metrics', [
            { label: 'Down Payment', value: calculation_metrics.down_payment, isDollar: true },
            { label: 'Interest Rate', value: calculation_metrics.interest_rate, isPercent: true },
            { label: 'Loan Term (Years)', value: calculation_metrics.loan_term_years },
            { label: 'Analysis Year', value: calculation_metrics.analysis_year },
            { label: 'Apprentice Rate', value: calculation_metrics.apprentice_rate, isPercent: true },
          ])}
          {renderDetails('Results', [
            { label: 'Principle Loan Amount', value: results.principle_loan_amount, isDollar: true },
            { label: 'Estimated Mortgage', value: results.estimated_mortgage, isDollar: true },
            { label: 'Estimated Rent Income', value: results.estimated_rent_income, isDollar: true },
            { label: 'Estimated Appreciation', value: results.estimated_appreciation, isDollar: true },
            { label: 'Estimated ROI', value: results.estimated_roi, isPercent: true },
          ])}
        </div>
      );
    })}
  </div>
);

export default HomeCard;
