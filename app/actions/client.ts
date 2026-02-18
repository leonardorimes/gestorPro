'use server';

import { prisma } from '@/lib/prisma';
import { Client } from '@/app/types/ClientTypes';

export async function registerCLient(formData: Client) {
  const clientName = formData.name;
  const email = formData.email;
  const pessoa = formData.tipo;
  const documento = formData.documento;

  const userExists = await prisma.client.findUnique({
    where: { email: email },
  });

  if (userExists) {
    throw new Error('CLIENTE_JA_EXISTE');
  }

  if (!clientName || !email || !pessoa || !documento) {
    throw new Error('DADOS_INVALIDOS');
  
  }

  const newClient = await prisma.client.create({
    data: {
      name: clientName,
      email,
      tipo: pessoa,
      documento,
    },
  });

  if (newClient) {
    return true;
  } else {
    throw new Error('ERRO_AO_CRIAR_CLIENTE');
  }
}
export async function listarClientePaginado(page = 1) {
  const take = 10;
  const skip = (page - 1) * take;

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where: { isActive: true },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.client.count(),
  ]);

  if (!clients) {
    throw new Error('ERRO_AO_LISTAR_CLIENTE');
  }

  return {
    data: clients,
    meta: {
      total,
      page,
      totalPages: Math.ceil(total / take),
    },
  };
}

export async function encontrarUnicoCliente(id: string) {
  const client = await prisma.client.findUnique({
    where: {
      id: id,
    },
  });

  if (!client) {
    throw new Error('CLIENTE_NAO_ENCONTRADO');
  }

  return client;
}

export async function updateCliente(client: Client): Promise<Boolean> {
  const clientName = client.name;
  const email = client.email;
  const pessoa = client.tipo;
  const documento = client.documento;
  const id = client.id;


    if (!clientName || !email || !pessoa || !documento) {
    throw new Error('DADOS_INVALIDOS');
  
  }


  const updatedClient = await prisma.client.update({
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

  if (updatedClient) {
    return true;
  } else {
    throw new Error('ERRO_AO_ATUALIZAR_CLIENTE');
  }
}

export async function deleteCliente(id: string): Promise<Boolean> {
  const client = encontrarUnicoCliente(id);

  if (!client) {
    throw new Error('CLIENTE_NAO_ENCONTRADO');
  }

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
    throw new Error('ERRO_AO_EXCLUIR_CLIENTE');
  }
}

export async function listAllClients() {
  const clients = await prisma.client.findMany({
    where: { isActive: true },
  });

  if (clients.length === 0) {
    throw new Error('Clientes não encontrado!');
  }

  return clients;
}

export async function TotalClients() {
  const numberOfClients = await prisma.serviceOrder.count();

  return numberOfClients;
}

export async function TotalActiveClients() {
  const numberOfActiveClients = await prisma.client.count({
    where: { isActive: true },
  });

  return numberOfActiveClients;
}

export async function TotalPFClients() {
  const numberOfActiveClients = await prisma.client.count({
    where: { tipo: 'FISICA' },
  });

  return numberOfActiveClients;
}

export async function TotalPJClients() {
  const numberOfActiveClients = await prisma.client.count({
    where: { tipo: 'JURIDICA' },
  });

  return numberOfActiveClients;
}
