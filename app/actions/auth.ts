"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const user = formData.get("user") as string;
  const password = formData.get("password") as string;

  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    throw new Error("Usuário já existe");
  }

  try {
    if (!email || !password) {
      throw new Error("Dados Inválidos");
    }

    const hashedPassord = await bcrypt.hash(password, 10);

    console.log(email, user, hashedPassord);

    await prisma.user.create({
      data: {
        email,
        username: user,
        password: hashedPassord,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Problemas no login");
  }

  console.log("Login realizado com sucesso!");
}
