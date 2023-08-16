"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaPowerOff } from "react-icons/fa";

import { useState } from "react";

type Props = {
  userName: String;
};

export default function DashNavbar({ userName }: Props) {
  const [navbar, setNavbar] = useState(false);

  const handleNavbar = () => {
    setNavbar((prev) => !prev);
  };

  return (
    <header className="bg-main-two w-11/12 mx-auto rounded-b-xl font-sansmed">
      <nav className="flex justify-between items-center px-2 py-4">
        <button className="text-2xl text-main-red" onClick={() => signOut()}>
          <FaPowerOff />
        </button>
        <h2>{userName}</h2>
        <button className="text-3xl" onClick={handleNavbar}>
          <HiMenuAlt2 />
        </button>
        <div
          className={`fixed top-0 bottom-0 z-40 w-screen bg-main-bg transition-all ease-linear duration-300 ${
            navbar ? "left-0" : "-left-full"
          }`}
        >
          <button
            className="text-xl w-8 h-8 rounded-full absolute top-4 right-4 bg-main-red"
            onClick={handleNavbar}
          >
            X
          </button>
          <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
            <h2 className="text-main-primary text-xl">برنامه ی مدیریت مالی</h2>
            <p className="text-sm w-11/12 text-center">
              این برنامه نمونه کار میباشد که با استفاده از nextjs و mongoDB به
              صورت فول استک توسط{" "}
              <Link href="https://mohazizzi.ir" className="text-main-primary">
                mohazizzi.ir
              </Link>{" "}
              ساخته شده
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}
