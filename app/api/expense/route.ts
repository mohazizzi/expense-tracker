import { connectToMondoDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Expense from "@/models/expense";

export async function POST(req: Request) {
  const { userName, amount, description, type, year, month, day } =
    await req.json();

  console.log(userName, amount, description, type, year, month, day);

  await connectToMondoDB();

  await Expense.create({
    userName,
    amount,
    description,
    type,
    year,
    month,
    day,
  });

  console.log("create");
  return NextResponse.json({ message: "expense created" }, { status: 201 });
}

export async function GET(req: any) {
  const username = req.nextUrl.searchParams.get("username");
  await connectToMondoDB();
  const expenses = await Expense.find({ userName: username });
  return NextResponse.json({ expenses });
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  await connectToMondoDB();
  await Expense.findByIdAndDelete(id);
  return NextResponse.json({ message: "expense deleted" }, { status: 200 });
}
