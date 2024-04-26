
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
import React, { useEffect, useState } from "react";
import { STATISTICS_URL } from "../utils/constants";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function StackedBarChart() {
  const axiosPrivate = useAxiosPrivate();
  const [statistics,setStatistics] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      axiosPrivate
        .get(STATISTICS_URL)
        .then((resp) => {
          setStatistics(resp?.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          //navigate("/login", { state: { from: location }, replace: true });

        });
    }, 500);
  }, []);
    return (
        <ResponsiveContainer width={800} height={350}>
          {statistics &&
        <BarChart
        width={500}
        height={300}
        data={statistics.data}
        margin={{
          top: 20,
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
          <Bar dataKey="Վճարված" stackId="a" fill="#8884d8" />
          <Bar dataKey="Զեղչ" stackId="a" fill="#82ca9d" />
        </BarChart>
        }
        </ResponsiveContainer>
      );
}

export default StackedBarChart
  