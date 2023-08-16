"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfigor, setPasswordConfigor] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (password !== passwordConfigor) {
      setErr("رمز و تکرار رمز همخوانی ندارند!");
      return;
    }

    setLoading(true);

    try {
      await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
    } catch (err) {
      setErr("خطا! لطفا دوباره امتحان کنید");
      setLoading(false);
      return;
    }
    try {
      const res = await signIn("credentials", {
        userName,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErr("رمز و یوزر اشتباه");
        setLoading(false);
        return;
      }

      router.replace("dashboard");
    } catch (err) {
      setErr("خطا! لطفا دوباره امتحان کنید");
      setLoading(false);
      return;
    }
    setLoading(false);
  }

  return (
    <main className="h-screen font-sansmed text-white">
      <div className="w-9/12 mx-auto h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="text-main-primary text-3xl">مدیریت مالی</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            className="bg-main-two px-8 py-2 rounded-lg text-base"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="نام کاربری"
          />
          <input
            className="bg-main-two px-8 py-2 rounded-lg text-base"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
          />
          <input
            className="bg-main-two px-8 py-2 rounded-lg text-base"
            type="password"
            onChange={(e) => setPasswordConfigor(e.target.value)}
            placeholder="تکرار رمز عبور"
          />
          {err !== "" && <p className="text-xs text-main-red">{err}</p>}
          <input
            className="bg-main-primary px-8 py-3 rounded-lg text-base cursor-pointer"
            type="submit"
            disabled={loading}
            value={loading ? "لطفا صبر کنید..." : "ثبت نام"}
          />
          <p className="text-xs">
            حساب کاربری دارید؟{" "}
            <Link href="/signin" className="text-main-primary underline">
              ورود
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
