"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

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

  const token = await encrypt(user);

  const cookieStore = await cookies();
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 2, //2 horas em segundos
  });

  console.log("Login realizado com sucesso!");
  redirect("/dashboard");
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, secret, {
    algorithms: ["HS256"],
  });
  return payload;
}
