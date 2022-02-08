export const standardizeMoney = (moneyArray, selectedFrequency) => {
  return moneyArray?.map((money) => {
    var newMoneyObj;
    switch (selectedFrequency) {
      case "Daily":
        switch (money.frequency) {
          case "Daily":
            return {
              ...money,
              amount: parseFloat(money.amount).toFixed(2),
            };
          case "Weekly":
            newMoneyObj = {
              ...money,
              amount: (parseFloat(money.amount) / 7).toFixed(2),
            };
            break;
          case "Monthly":
            newMoneyObj = {
              ...money,
              amount: (parseFloat(money.amount) / 30.5).toFixed(2),
            };
            break;
          case "Yearly":
            newMoneyObj = {
              ...money,
              amount: (parseFloat(money.amount) / 365).toFixed(2),
            };
            break;
          default:
            break;
        }
        break;
      case "Weekly":
        switch (money.frequency) {
          case "Daily":
            newMoneyObj = {
              ...money,
              amount: (parseFloat(money.amount) * 7).toFixed(2),
            };
            break;
          case "Weekly":
            return {
              ...money,
              amount: parseFloat(money.amount).toFixed(2),
            };
          case "Monthly":
            newMoneyObj = {
              ...money,
              amount: (parseFloat(money.amount) / 4.34524).toFixed(2),
            };
            break;
          case "Yearly":
            newMoneyObj = {
              ...money,
              amount: (parseFloat(money.amount) / 52).toFixed(2),
            };
            break;
          default:
            break;
        }
        break;
      case "Monthly":
        switch (money.frequency) {
          case "Daily":
            newMoneyObj = {
              ...money,
              amount: (parseFloat(money.amount) * 30.5).toFixed(2),
            };
            break;
          case "Weekly":
            return {
              ...money,
              amount: (parseFloat(money.amount) * 4.34524).toFixed(2),
            };
          case "Monthly":
            newMoneyObj = {
              ...money,
              amount: parseFloat(money.amount).toFixed(2),
            };
            break;
          case "Yearly":
            newMoneyObj = {
              ...money,
              amount: (parseFloat(money.amount) / 12).toFixed(2),
            };
            break;
          default:
            break;
        }
        break;
      case "Yearly":
        switch (money.frequency) {
          case "Daily":
            newMoneyObj = {
              ...money,
              amount: (parseFloat(money.amount) * 365).toFixed(2),
            };
            break;
          case "Weekly":
            return {
              ...money,
              amount: (parseFloat(money.amount) * 52).toFixed(2),
            };
          case "Monthly":
            newMoneyObj = {
              ...money,
              amount: (parseFloat(money.amount) * 12).toFixed(2),
            };
            break;
          case "Yearly":
            newMoneyObj = {
              ...money,
              amount: parseFloat(money.amount).toFixed(2),
            };
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    return newMoneyObj;
  });
};

export const formatMoneyString = (money) => {
  let moneyString = money?.toString();
  if (moneyString !== undefined) {
    let moneyStringSplit = moneyString.split(".");
    // add commas
    moneyStringSplit[0] = moneyStringSplit[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
    moneyString = moneyStringSplit.join(".");
    // add dollar sign
    moneyString = "$" + moneyString;
    // move negative sign infront of dollar sign
    if (moneyString[1] === "-") {
      let stringArray = moneyString.split("");
      stringArray[0] = "-";
      stringArray[1] = "$";
      moneyString = stringArray.join("");
    }
    return moneyString;
  }

};
