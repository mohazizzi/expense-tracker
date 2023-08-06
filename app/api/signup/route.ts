import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { connectToMondoDB } from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { userName, password } = await req.json();
    const hashedPassword = await hash(password, 10);
    console.log(userName);
    await connectToMondoDB();

    const existUser = await User.findOne({ userName }).exec();
    if (existUser)
      return NextResponse.json({ message: "user exist" }, { status: 409 });

    await User.create({
      userName,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "user registered" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "an err occurred while registering the user" },
      { status: 500 }
    );
  }
}
