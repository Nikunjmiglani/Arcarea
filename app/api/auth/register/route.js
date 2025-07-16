import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import { hash } from "bcrypt";

export async function POST(req) {
  await connectMongo();
  const { name, email, password, role } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
  }

  const hashedPassword = await hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword, role });

  return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
}
