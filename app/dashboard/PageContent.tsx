"use client";

import { useState } from "react";

import ExpenseItem from "../components/ExpenseItem";
import DashNavbar from "../components/DashNavbar";
import DashAddBtn from "../components/DashAddBtn";
import Graph from "../components/Graph";

type Props = {
  user: User;
  expenses: ExpenseObj[];
};

export default function PageContent({ user, expenses }: Props) {
  const [filter, setFilter] = useState("month");

  let year = new Date().getFullYear();
  let month = new Date().getUTCMonth() + 1;
  let day = new Date().getUTCDate();

  const { userName } = user;

  let letsOfExpenses;
  let graphContent;

  if (expenses.length === 0) {
    letsOfExpenses = (
      <p className="text-center text-sm">لیست هزینه ها خالی است!</p>
    );
    graphContent = <Graph expenses={expenses} setFilter={setFilter} />;
  } else {
    const thisYearExpenses = expenses.filter(
      (expense) => expense.year === year
    );
    const thisMonthExpenses = thisYearExpenses.filter(
      (expense) => expense.month === month
    );
    const thisDayExpenses = thisMonthExpenses.filter(
      (expense) => expense.day === day
    );

    if (filter === "year") {
      graphContent = (
        <Graph expenses={thisYearExpenses} setFilter={setFilter} />
      );
      letsOfExpenses = thisYearExpenses.map((expense, index) => (
        <ExpenseItem
          key={index}
          expense={expense}
          borderClass={
            expense.type === "outcome" ? "border-main-red" : "border-main-green"
          }
          textClass={
            expense.type === "outcome" ? "text-main-red" : "text-main-green"
          }
        />
      ));
    } else if (filter === "month") {
      graphContent = (
        <Graph expenses={thisMonthExpenses} setFilter={setFilter} />
      );
      letsOfExpenses = thisMonthExpenses.map((expense, index) => (
        <ExpenseItem
          key={index}
          expense={expense}
          borderClass={
            expense.type === "outcome" ? "border-main-red" : "border-main-green"
          }
          textClass={
            expense.type === "outcome" ? "text-main-red" : "text-main-green"
          }
        />
      ));
    } else {
      graphContent = <Graph expenses={thisDayExpenses} setFilter={setFilter} />;
      letsOfExpenses = thisDayExpenses.map((expense, index) => (
        <ExpenseItem
          key={index}
          expense={expense}
          borderClass={
            expense.type === "outcome" ? "border-main-red" : "border-main-green"
          }
          textClass={
            expense.type === "outcome" ? "text-main-red" : "text-main-green"
          }
        />
      ));
    }
  }

  return (
    <>
      <DashNavbar userName={userName} />
      {graphContent}
      <main className="w-11/12 mx-auto font-sansmed py-3 px-2 flex flex-col gap-4">
        {letsOfExpenses}
      </main>
      <DashAddBtn userName={userName} />
    </>
  );
}
