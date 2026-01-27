"use server";

import { prisma } from "@/lib/prisma";
import { Client } from "@prisma/client";
import { error } from "console";
import { revalidatePath } from "next/cache";

export async function registerCLient(formData: Client) {
  console.log(formData);
  const clientName = formData.name;
  const email = formData.email;
  const pessoa = formData.tipo;
  const documento = formData.documento;

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
  console.log(id);
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

export async function updateCliente(client: Client): Promise<Boolean> {
  const clientName = client.name;
  const email = client.email;
  const pessoa = client.tipo;
  const documento = client.documento;
  const id = client.id;

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

    return true;
  } catch (error) {
    throw new Error("O usuário nao foi atualizada, tente novamente!");
  }
}

export async function deleteCliente(id: string): Promise<Boolean> {
  const client = encontrarUnicoCliente(id);

  if (!client) {
    console.log("Usuário não encontrado");
  }

  try {
    const clientExluido = await prisma.client.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });
    if (clientExluido) {
      return true;
    } else {
      throw new Error("Nao pode ser excluido");
    }
  } catch (error) {
    throw new Error("Erro ao excluir o cliente");
  }
}
