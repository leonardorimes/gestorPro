"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

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

    await prisma.user.create({
      data: {
        email,
        username: user,
        password: hashedPassord,
      },
    });
    return true;
  } catch (err) {
    throw new Error("Dados Inválidos");
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

  const token = await encrypt(user.id);

  const cookieStore = await cookies();
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 2, //2 horas em segundos
  });

  return true;
}

export async function encrypt(userId: string) {
  return await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}

export async function decrypt(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
  return true;
}