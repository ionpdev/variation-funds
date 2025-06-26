"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Asset } from "@/lib/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AssetPieChartProps {
  assets: Asset[];
}

const AssetPieChart = ({ assets }: AssetPieChartProps) => {
  const data = {
    labels: assets.map((a) => a.label),
    datasets: [
      {
        data: assets.map((a) => a.value),
        backgroundColor: [
          "#60a5fa",
          "#34d399",
          "#fbbf24",
          "#f87171",
          "#a78bfa",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default AssetPieChart;
