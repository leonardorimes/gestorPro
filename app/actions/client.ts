"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function registerCLient(formData: FormData) {
  const clientName = formData.get("clientName") as string;
  const email = formData.get("email") as string;
  const pessoa = formData.get("pessoa") as string;
  const documento = formData.get("documento") as string;

  const userExists = await prisma.client.findUnique({
    where: { email: email },
  });

  if (userExists) {
    throw new Error("O cliente já existe");
  }

  try {
    if (!clientName || !email || !pessoa || !documento) {
      throw new Error("Dados inválidos");
    }

    await prisma.client.create({
      data: {
        name: clientName,
        email,
        tipo: pessoa,
        documento,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
  }
}
export async function listarClientePaginado(page = 1) {
  const take = 10;
  const skip = (page - 1) * take;

  try {
    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where: { isActive: true },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.client.count(),
    ]);

    return {
      data: clients,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / take),
      },
    };
  } catch (error) {
    throw new Error("problema em listar  " + error);
  }
}

export async function encontrarUnicoCliente(id: string) {
  const client = await prisma.client.findUnique({
    where: {
      id: id,
    },
  });

  if (!client) {
    console.log("Não existe o cliente");
  }

  return client;
}

export async function updateCliente(formData: FormData) {
  const clientName = formData.get("clientName") as string;
  const email = formData.get("email") as string;
  const pessoa = formData.get("pessoa") as string;
  const documento = formData.get("documento") as string;
  const id = formData.get("id") as string;

  try {
    await prisma.client.update({
      where: {
        id: id,
      },
      data: {
        name: clientName,
        email,
        tipo: pessoa,
        documento,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCliente(formData: FormData) {
  const id = formData.get("id") as string;
  console.log("O id é " + id);

  const client = encontrarUnicoCliente(id);

  if (!client) {
    console.log("Usuário não encontrado");
  }

  const clientExluido = await prisma.client.update({
    where: {
      id: id,
    },
    data: {
      isActive: false,
    },
  });

  revalidatePath("/client/listar");
}
