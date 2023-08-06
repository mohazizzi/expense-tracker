"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        userName,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErr("رمز و یوزر اشتباه");
        return;
      }

      router.replace("dashboard");
    } catch (err) {
      setErr("خطا! لطفا دوباره امتحان کنید");
    }
  };

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
          {err !== "" && <p className="text-xs text-main-red">{err}</p>}
          <input
            className="bg-main-primary px-8 py-3 rounded-lg text-base cursor-pointer"
            type="submit"
            value="ورود"
          />
          <p className="text-xs">
            حساب کاربری ندارید؟{" "}
            <Link href="/signup" className="text-main-primary underline">
              ثبت نام
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
