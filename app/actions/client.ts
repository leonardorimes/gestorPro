"use server";

import { prisma } from "@/lib/prisma";
import { error } from "console";

export async function registerCLient(formData: FormData) {
  const email = formData.get("email") as string;
  const clientName = formData.get("clientName") as string;
  const password = formData.get("password") as string;
  console.log(email, clientName, password);

  const userExists = await prisma.client.findUnique({
    where: { email: email },
  });

  if (userExists) {
    throw new Error("O cliente já existe");
  }

  try {
    if (!email || !password || !clientName) {
      throw new Error("Dados inválidos");
    }

    await prisma.client.create({
      data: {
        email,
        name: clientName,
        password,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
