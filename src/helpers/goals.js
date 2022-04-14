export const calculateCompletionDate = (
  contributionAmount,
  contributionFrequency,
  targetAmount,
  currentAmount
) => {
  const amountRemaining = targetAmount - currentAmount;
  const timeToComplete = amountRemaining / contributionAmount;
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
      Date.now() + timeToComplete * 30.5 * 24 * 60 * 60 * 1000
    );
  } else {
    completionDate = new Date(
      Date.now() + timeToComplete * 12 * 30.5 * 24 * 60 * 60 * 1000
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
