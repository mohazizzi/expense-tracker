import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <main className="h-screen flex flex-col gap-2 justify-center items-center font-sansmed">
      <h2 className="text-main-primary text-xl">برنامه ی مدیریت مالی</h2>
      <p className="text-sm w-11/12 text-center">
        این برنامه نمونه کار میباشد که با استفاده از nextjs و mongoDB به صورت
        فول استک توسط{" "}
        <Link href="https://mohazizzi.ir" className="text-main-primary">
          mohazizzi.ir
        </Link>{" "}
        ساخته شده
      </p>
      <Link
        href="/signin"
        className="bg-main-primary px-5 py-2 rounded-md mt-5"
      >
        ورود
      </Link>
    </main>
  );
}
