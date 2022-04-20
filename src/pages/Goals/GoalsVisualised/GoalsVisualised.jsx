import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getGoalsPercentageArray,
} from "../../../helpers/goals";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { ChartDiv } from "./styled";

const GoalsVisualised = ({ goals }) => {
  const [chartData, setChartData] = useState(undefined);
  const windowWidth = useWindowWidth();
  useEffect(() => {
    setChartData(getGoalsPercentageArray(goals));
  }, [goals]);

  return (
    <ChartDiv>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{
            top: 10,
            right: 0,
            bottom: 10,
            left: windowWidth < 500 ? 50 : 100,
          }}
          barSize={50}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="name" type="category" />
          <XAxis type="number" domain={[0, 100]} />
          <Tooltip contentStyle={{ color: "black" }} />
          <Legend />
          <Bar dataKey="amount" fill="#02b191" scale />
        </BarChart>
      </ResponsiveContainer>
    </ChartDiv>
  );
};

export default GoalsVisualised;
