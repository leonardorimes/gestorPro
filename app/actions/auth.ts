import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const user = formData.get("username");
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Dados Inválidos");
  }

  const hashedPassord = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      username: user,
      password: hashedPassord,
    },
  });
}
