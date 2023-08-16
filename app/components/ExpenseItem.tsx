"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TbTrashXFilled } from "react-icons/tb";

type Prams = {
  expense: ExpenseObj;
  textClass: string;
  borderClass: string;
};

export default function ExpenseItem({
  expense,
  textClass,
  borderClass,
}: Prams) {
  const [accordion, setAccordion] = useState(false);
  const router = useRouter();

  const handleAccordion = () => {
    setAccordion((prev) => !prev);
  };

  const handleDelete = async (expenseId: String) => {
    const res = await fetch(
      `https://expense-tracker-mohazizzi.vercel.app/api/expense?id=${expenseId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <div>
      <div
        className={`text-md w-full flex items-center justify-between bg-main-two px-3 py-2 border-l-4 ${borderClass}`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDelete(expense._id)}
            className="w-8 h-8 rounded-full bg-main-bg flex items-center justify-center"
          >
            <TbTrashXFilled />
          </button>
          <p className="text-xs">{`${expense.year}-${expense.month}-${expense.day}`}</p>
        </div>
        <button
          className={`${textClass} cursor-pointer`}
          onClick={handleAccordion}
        >{`${expense.amount}`}</button>
      </div>
      <div
        className={`overflow-hidden opacity-70 ${accordion ? "h-fit" : "h-0"}`}
      >
        <p className="text-xs p-3 bg-main-three rounded-b-md">
          {expense.description}
        </p>
      </div>
    </div>
  );
}
