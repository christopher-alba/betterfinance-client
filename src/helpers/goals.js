import { formatMoneyString } from ".";

export const calculateCompletionDate = (
  contributionAmount,
  contributionFrequency,
  targetAmount,
  currentAmount
) => {
  const amountRemaining = targetAmount - currentAmount;
  if (amountRemaining <= 0) {
    return "Goal Reached";
  }

  let timeToComplete = Math.ceil(amountRemaining / contributionAmount);

  let completionDate;
  if (contributionFrequency === "Daily") {
    completionDate = new Date(
      Date.now() + timeToComplete * 24 * 60 * 60 * 1000
    );
  } else if (contributionFrequency === "Weekly") {
    completionDate = new Date(
      Date.now() + timeToComplete * 7 * 24 * 60 * 60 * 1000
    );
  } else if (contributionFrequency === "Monthly") {
    completionDate = new Date(
      Date.now() + Math.ceil(timeToComplete * 30.5 * 24 * 60 * 60 * 1000)
    );
  } else {
    completionDate = new Date(
      Date.now() + Math.ceil(timeToComplete * 12 * 30.5 * 24 * 60 * 60 * 1000)
    );
  }

  return String(
    completionDate.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
};

export const calculateContributionAmount = (
  currentAmount,
  targetAmount,
  completionDate
) => {
  let amountRemaining = targetAmount - currentAmount;
  if (amountRemaining <= 0) {
    return "Goal Reached";
  }
  let daysRemaining = Math.ceil(
    (parseInt(completionDate) - Date.now()) / (60 * 60 * 1000 * 24)
  );
  if (daysRemaining <= 0 && amountRemaining > 0) {
    return "Target completion date reached, you need to select a later date to achieve this goal.";
  } else if (daysRemaining <= 0) {
    return "Target completion date reached.";
  }
  let contributionAmount = amountRemaining / daysRemaining;

  return formatMoneyString(contributionAmount.toFixed(2));
};

export const getGoalsPercentageArray = (goals) => {
  return goals.map((goal) => ({
    name: goal.name,
    amount:
      goal.currentAmount / goal.targetAmount <= 1
        ? ((goal.currentAmount / goal.targetAmount) * 100).toFixed(2)
        : (100).toFixed(2),
  }));
};

export const findLargestAmount = (chartData) => {
  let largestNumber = 0;
  for (let i = 0; i < chartData?.length; i++) {
    if (largestNumber < parseFloat(chartData[i].amount)) {
      largestNumber = chartData[i].amount;
    }
  }
  return Math.floor(largestNumber * 1.3);
};
