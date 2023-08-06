import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { Dispatch } from "react";
import { SetStateAction } from "react";

Chart.register(ArcElement);

type Props = {
  expenses: ExpenseObj[];
  setFilter: Dispatch<SetStateAction<string>>;
};

export default function Graph({ expenses, setFilter }: Props) {
  if (expenses.length === 0) {
    const config = {
      data: {
        datasets: [
          {
            data: [0, 100],
            backgroundColor: ["#14a44d", "#424769"],
            borderColor: ["#14a44d", "#424769"],
            hoverOffset: 4,
            borderRadius: 20,
            spacing: 10,
          },
        ],
      },
      options: {
        cutout: 115,
      },
    };
    return (
      <div className="flex justify-content max-w-xs mx-auto">
        <div className="relative w-full p-5">
          <Doughnut {...config} className="w-full" />
          <div className="font-sansmed absolute inset-0 flex flex-col gap-2 items-center justify-center">
            <h3>هزینه ای وجود ندارد!</h3>
            <form className="flex items-center gap-2 text-xs">
              <h3>فیلتر براساس:</h3>
              <select
                className="bg-transparent text-main-primary"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="month">ماه جاری</option>
                <option value="day">امروز</option>
                <option value="year">سال جاری</option>
              </select>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const incomeAmount = expenses
    .filter((item) => item.type === "income")
    .map((item) => item.amount);
  let totalIncomeAmount;
  if (incomeAmount.length === 0) {
    totalIncomeAmount = 0;
  } else {
    totalIncomeAmount = incomeAmount.reduce((prev, next) => prev + next);
  }

  const outcomeAmount = expenses
    .filter((item) => item.type === "outcome")
    .map((item) => item.amount);
  let totalOutcomeAmount;
  if (outcomeAmount.length === 0) {
    totalOutcomeAmount = 0;
  } else {
    totalOutcomeAmount = outcomeAmount.reduce((prev, next) => prev + next);
  }

  const totalAmount = totalIncomeAmount - totalOutcomeAmount;

  const config = {
    data: {
      datasets: [
        {
          data: [totalIncomeAmount, totalOutcomeAmount],
          backgroundColor: ["#14a44d", "#dc4c64"],
          borderColor: ["#14a44d", "#dc4c64"],
          hoverOffset: 4,
          borderRadius: 20,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="relative w-full p-5">
        <Doughnut {...config} className="w-full" />
        <div className="font-sansmed absolute inset-0 flex flex-col gap-2 items-center justify-center">
          <h3 style={{ direction: "ltr" }} className="text-2xl">
            {totalAmount}
          </h3>
          <form className="flex items-center gap-2 text-xs">
            <h3>فیلتر براساس:</h3>
            <select
              className="bg-transparent text-main-primary"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="month">ماه جاری</option>
              <option value="day">امروز</option>
              <option value="year">سال جاری</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
}
