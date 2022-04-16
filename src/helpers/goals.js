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
  let contributionAmount =
    amountRemaining /
    Math.ceil((parseInt(completionDate) - Date.now()) / (60 * 60 * 1000 * 24));
  return formatMoneyString(contributionAmount.toFixed(2));
};
