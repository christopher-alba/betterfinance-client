import { useQuery } from "@apollo/client";
import React from "react";
import { INCOMES } from "../../graphql/queries";

const Incomes = () => {
  const profileID = localStorage.getItem("profileID");
  const { loading, error, data } = useQuery(INCOMES, {
    variables: {
      profileID,
    },
  });
  if (loading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <h1>Incomes</h1>
      {data?.getAllUserIncomes.map((userIncome) => {
        return (
          <div>
            <p>{userIncome.name}</p>
            <p>{userIncome.amount}</p>
            <p>{userIncome.frequency}</p>
          </div>
        );
      })}
    </>
  );
};

export default Incomes;
