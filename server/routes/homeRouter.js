const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/homes", async (req, res) => {
  try {
    const roiCalculationMetrics = [
      "down_payment",
      "interest_rate",
      "loan_term_years",
      "analysis_year",
      "apprentice_rate",
    ];
    const stringColumns = ["id", "address", "city", "state", "zip_code"];
    const numericalColumns = [
      "house_value",
      "estimated_rent",
      "bedrooms",
      "bathrooms",
      "square_feet",
    ];

    const metrics = validateROIMetrics(req, roiCalculationMetrics);
    const homes = await filterHomes(req, stringColumns, numericalColumns);

    const updatedHomes = homes.map((home) => ({
      home_details: extractHomeDetails(home),
      calculation_metrics: metrics,
      results: addEstimatedMetrics(home, metrics),
    }));

    res.json(updatedHomes);
  } catch (err) {
    console.error("Error retrieving homes:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function validateROIMetrics(req, metricsList) {
  const metrics = {};
  metricsList.forEach((metric) => {
    if (req.query[metric] !== undefined) {
      metrics[metric] = parseFloat(req.query[metric]);
    } else {
      metrics[metric] = null;
    }
  });
  return metrics;
}

async function filterHomes(req, stringColumns, numericalColumns) {
  const conditions = [];
  const queryParams = [];

  stringColumns.forEach((column) =>
    addCondition(req.query[column], `${column} = $`, queryParams, conditions),
  );
  numericalColumns.forEach((column) => {
    addCondition(
      req.query[`min_${column}`],
      `${column} >= $`,
      queryParams,
      conditions,
    );
    addCondition(
      req.query[`max_${column}`],
      `${column} <= $`,
      queryParams,
      conditions,
    );
    addCondition(req.query[column], `${column} = $`, queryParams, conditions);
  });

  const query = `SELECT * FROM rentals${conditions.length ? " WHERE " + conditions.join(" AND ") : ""}`;
  const result = await pool.query(query, queryParams);
  return result.rows;
}

function addCondition(value, conditionTemplate, queryParams, conditions) {
  if (value) {
    queryParams.push(value);
    conditions.push(conditionTemplate.replace("$", `$${queryParams.length}`));
  }
}

const calculationConfig = {
  principle_loan_amount: ({ home, metrics }) => {
    const { down_payment } = metrics;
    if (down_payment == undefined) return null;
    return home.house_value - down_payment;
  },

  estimated_mortgage: ({ home, metrics }) => {
    const { down_payment, interest_rate, loan_term_years } = metrics;
    if (
      down_payment == undefined ||
      interest_rate == undefined ||
      loan_term_years == undefined
    )
      return null;

    const principalLoanAmount = home.house_value - down_payment;
    const r = (interest_rate * 0.01) / 12;
    const n = loan_term_years * 12;
    return (
      (principalLoanAmount * (r * Math.pow(1 + r, n))) /
      (Math.pow(1 + r, n) - 1)
    );
  },

  estimated_rent_income: ({ home, metrics }) => {
    const { analysis_year, down_payment, interest_rate, loan_term_years } =
      metrics;
    if (
      down_payment == undefined ||
      interest_rate == undefined ||
      loan_term_years == undefined ||
      analysis_year == undefined
    )
      return null;

    const principalLoanAmount = home.house_value - down_payment;
    const r = (interest_rate * 0.01) / 12;
    const n = loan_term_years * 12;
    const estimatedMortgage =
      (principalLoanAmount * (r * Math.pow(1 + r, n))) /
      (Math.pow(1 + r, n) - 1);
    const mortgageYears =
      loan_term_years > analysis_year ? analysis_year : loan_term_years;
    return (
      home.estimated_rent * (analysis_year * 12) -
      estimatedMortgage * (mortgageYears * 12)
    );
  },

  estimated_mortgage_left: ({ home, metrics }) => {
    const { analysis_year, down_payment, interest_rate, loan_term_years } =
      metrics;
    if (
      down_payment == undefined ||
      interest_rate == undefined ||
      loan_term_years == undefined ||
      analysis_year == undefined
    )
      return null;

    const principalLoanAmount = home.house_value - down_payment;
    const r = (interest_rate * 0.01) / 12;
    const n = loan_term_years * 12;
    const estimatedMortgage =
      (principalLoanAmount * (r * Math.pow(1 + r, n))) /
      (Math.pow(1 + r, n) - 1);
    const mortgageYears =
      loan_term_years > analysis_year ? analysis_year : loan_term_years;
    return (loan_term_years - mortgageYears) * 12 * estimatedMortgage;
  },

  mortgage_period_losses: ({ home, metrics }) => {
    const { analysis_year, down_payment, interest_rate, loan_term_years } =
      metrics;
    if (
      down_payment == undefined ||
      interest_rate == undefined ||
      loan_term_years == undefined ||
      analysis_year == undefined
    )
      return null;

    const principalLoanAmount = home.house_value - down_payment;
    const r = (interest_rate * 0.01) / 12;
    const n = loan_term_years * 12;
    const estimatedMortgage =
      (principalLoanAmount * (r * Math.pow(1 + r, n))) /
      (Math.pow(1 + r, n) - 1);
    const mortgageYears =
      loan_term_years > analysis_year ? analysis_year : loan_term_years;
    const mortgagePeriod =
      home.estimated_rent * (mortgageYears * 12) -
      estimatedMortgage * (mortgageYears * 12);
    return mortgagePeriod > 0 ? 0 : mortgagePeriod;
  },

  total_investment: ({ home, metrics }) => {
    const { analysis_year, down_payment, interest_rate, loan_term_years } =
      metrics;
    if (
      down_payment == undefined ||
      interest_rate == undefined ||
      loan_term_years == undefined ||
      analysis_year == undefined
    )
      return null;

    const principalLoanAmount = home.house_value - down_payment;
    const r = (interest_rate * 0.01) / 12;
    const n = loan_term_years * 12;
    const estimatedMortgage =
      (principalLoanAmount * (r * Math.pow(1 + r, n))) /
      (Math.pow(1 + r, n) - 1);
    const mortgageYears =
      loan_term_years > analysis_year ? analysis_year : loan_term_years;
    const mortgagePeriod =
      home.estimated_rent * (mortgageYears * 12) -
      estimatedMortgage * (mortgageYears * 12);
    const mortgagePeriodLosses = mortgagePeriod > 0 ? 0 : mortgagePeriod;
    return down_payment + -mortgagePeriodLosses;
  },

  estimated_appreciation: ({ home, metrics }) => {
    const { apprentice_rate, analysis_year } = metrics;
    if (apprentice_rate == undefined || analysis_year == undefined) return null;
    return (
      home.house_value * Math.pow(1 + apprentice_rate * 0.01, analysis_year)
    );
  },

  estimated_roi: ({ home, metrics }) => {
    const {
      down_payment,
      apprentice_rate,
      analysis_year,
      interest_rate,
      loan_term_years,
    } = metrics;
    if (
      down_payment == undefined ||
      interest_rate == undefined ||
      loan_term_years == undefined ||
      apprentice_rate == undefined ||
      analysis_year == undefined
    )
      return null;

    const principalLoanAmount = home.house_value - down_payment;
    const r = (interest_rate * 0.01) / 12;
    const n = loan_term_years * 12;
    const estimatedMortgage =
      (principalLoanAmount * (r * Math.pow(1 + r, n))) /
      (Math.pow(1 + r, n) - 1);
    const estimatedRentIncome =
      home.estimated_rent * (analysis_year * 12) - estimatedMortgage * n;
    const estimatedAppreciation =
      home.house_value * Math.pow(1 + apprentice_rate * 0.01, analysis_year);
    const mortgageYears =
      loan_term_years > analysis_year ? analysis_year : loan_term_years;
    const mortgagePeriod =
      home.estimated_rent * (mortgageYears * 12) -
      estimatedMortgage * (mortgageYears * 12);
    const mortgagePeriodLosses = mortgagePeriod > 0 ? 0 : mortgagePeriod;
    const totalInvestment = down_payment + -mortgagePeriodLosses;
    return (
      ((estimatedAppreciation - down_payment + estimatedRentIncome) /
        totalInvestment) *
      100
    );
  },
};

function addEstimatedMetrics(home, metrics) {
  const finalResults = {};
  for (const [key, formulaFn] of Object.entries(calculationConfig)) {
    finalResults[key] = formulaFn({ home, metrics });
  }
  return finalResults;
}

function extractHomeDetails(home) {
  const {
    id,
    address,
    city,
    state,
    zip_code,
    house_value,
    estimated_rent,
    bedrooms,
    bathrooms,
    square_feet,
  } = home;
  return {
    id,
    address,
    city,
    state,
    zip_code,
    house_value,
    estimated_rent,
    bedrooms,
    bathrooms,
    square_feet,
  };
}

module.exports = router;
