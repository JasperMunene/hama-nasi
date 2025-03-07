"use client";

import dynamic from "next/dynamic";
import { Dropdown } from "../elements/dropdown/Dropdown";
import { EllipsisVertical } from "lucide-react";
import { useState, useEffect } from "react";
import { DropdownItem } from "../elements/dropdown/DropdownItem";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function QuoteSummary() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Set a monthly target for total quote amount (example: KES 20K)
  const monthlyTarget = 1000000;

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("/api/quote", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch quotes");
        }
        const data = await response.json();
        setQuotes(data.quotes || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  // Compute metrics from the quotes data
  const totalQuotes = quotes.length;
  const totalAmount = quotes.reduce((acc, quote) => acc + (quote.quote_amount || 0), 0);
  const averageQuote = totalQuotes > 0 ? totalAmount / totalQuotes : 0;
  // Compute progress as a percentage of the monthly target
  const progressPercentage = Math.min((totalAmount / monthlyTarget) * 100, 100);

  // Radial chart configuration
  const series = [parseFloat(progressPercentage.toFixed(2))];
  const options = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  if (loading) return <div>Loading quotes data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Quote Summary
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Overview of your quotes for the month.
            </p>
          </div>
          <div className="relative inline-block">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              <EllipsisVertical className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
            <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
              <DropdownItem
                tag="a"
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View More
              </DropdownItem>
              <DropdownItem
                tag="a"
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        <div className="relative ">
          <div className="max-h-[330px]">
            <ReactApexChart options={options} series={series} type="radialBar" height={330} />
          </div>
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            {progressPercentage.toFixed(2)}%
          </span>
        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          Total quote amount is KES {totalAmount.toFixed(2)} this month, which is {progressPercentage.toFixed(2)}% target for new movers.
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Total Quotes
          </p>
          <p className="flex items-center justify-center text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {totalQuotes}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Total Amount
          </p>
          <p className="flex items-center justify-center text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            KES {totalAmount.toFixed(2)}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Average Quote
          </p>
          <p className="flex items-center justify-center text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            KES {averageQuote.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
