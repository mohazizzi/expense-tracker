import PageContent from "./PageContent";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getExpense = async (userName: String) => {
  try {
    const res = await fetch(
      `https://expensetracker.mohazizzi.ir/api/expense?username=${userName}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("failed to fetch expense");
    }

    return res.json();
  } catch (err) {
    console.log("err loading expenses", err);
  }
};

async function page() {
  const session = await getServerSession(authOptions);

  const user = session?.user as User;

  const { expenses } = await getExpense(user.userName);

  return <PageContent user={user} expenses={expenses} />;
}
export default page;
