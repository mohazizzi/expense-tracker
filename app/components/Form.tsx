"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  handleFormDisplay: () => void;
  formDisplay: boolean;
  userName: string;
};

export default function Form({
  handleFormDisplay,
  formDisplay,
  userName,
}: Props) {
  const [amount, setAmount] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [err, setErr] = useState("");
  const router = useRouter();

  const addExpense = async (e: any) => {
    e.preventDefault();

    if (!amount || !description || !type || !year || !month || !day) {
      setErr("تمام فیلدها را پر کنید!");
      return;
    }

    try {
      const res = await fetch(
        "https://expense-tracker-mohazizzi.vercel.app/api/expense",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            userName,
            amount,
            description,
            type,
            year,
            month,
            day,
          }),
        }
      );

      if (res.ok) {
        console.log(res.json());
        setAmount(null);
        setDescription("");
        setType("");
        setYear(null);
        setMonth(null);
        setDay(null);
        handleFormDisplay();
        router.refresh();
      } else {
        setErr("خطا! لطفا دوباره امتحان کنید");
      }
    } catch (err) {
      setErr("خطا! لطفا دوباره امتحان کنید");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-50 bg-main-bg justify-center items-center font-sansmed ${
        formDisplay ? "flex" : "hidden"
      }`}
    >
      <button
        onClick={handleFormDisplay}
        type="button"
        className="text-xl w-8 h-8 rounded-full absolute top-4 right-4 bg-main-red"
      >
        X
      </button>
      <form
        className="flex flex-col gap-2 justify-center items-center w-10/12 mx-auto"
        onSubmit={addExpense}
      >
        <h2 className="text-2xl text-main-primary pb-5">افزودن هزینه</h2>
        <input
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
          className="bg-main-two px-8 py-2 rounded-lg text-base w-full"
          placeholder="مبلغ"
        />
        <select
          className="bg-main-two px-8 py-2 rounded-lg text-base w-full"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">نوع</option>
          <option value="income">درآمد</option>
          <option value="outcome">خرجی</option>
        </select>
        <input
          type="number"
          placeholder="سال"
          onChange={(e) => setYear(Number(e.target.value))}
          min={2023}
          max={2100}
          className="bg-main-two px-8 py-2 rounded-lg text-base w-full"
        />
        <select
          className="bg-main-two px-8 py-2 rounded-lg text-base w-full"
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          <option value="">ماه</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <input
          type="number"
          min={1}
          max={31}
          placeholder="روز"
          onChange={(e) => setDay(Number(e.target.value))}
          className="bg-main-two px-8 py-2 rounded-lg text-base w-full"
        />
        <input
          type="text"
          placeholder="توضیحات"
          onChange={(e) => setDescription(e.target.value)}
          className="bg-main-two px-8 py-2 rounded-lg text-base w-full"
        />
        {err !== "" && <p className="text-xs text-main-red">{err}</p>}
        <input
          type="submit"
          value="افزودن"
          className="bg-main-primary px-8 py-3 rounded-lg text-base cursor-pointer  w-full"
        />
      </form>
    </div>
  );
}
