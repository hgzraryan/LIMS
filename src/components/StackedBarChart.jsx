import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { STATISTICS_URL } from "../utils/constants";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function StackedBarChart() {
  const axiosPrivate = useAxiosPrivate();
  const [statistics, setStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      axiosPrivate
        .get(STATISTICS_URL)
        .then((resp) => {
          setStatistics(resp?.data?.results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          //navigate("/login", { state: { from: location }, replace: true });

        });
    }, 500);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={statistics}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
        
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Վճարված" stackId="a" fill="#8884d8" barSize={30} />
        {/* <Bar dataKey="Զեղչ" stackId="a" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StackedBarChart;
