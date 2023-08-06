import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignIn from "./SignIn";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return <SignIn />;
}
