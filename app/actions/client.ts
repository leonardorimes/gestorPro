'use server';

import { prisma } from '@/lib/prisma';
import { Client } from '@/app/types/ClientTypes';
import { getCurrentUser } from '@/lib/auth-server';


export async function registerCLient(formData: Client) {
  const user = await getCurrentUser()
  const clientName = formData.name;
  const email = formData.email;
  const pessoa = formData.tipo;
  const documento = formData.documento;
  console.log("este é o userid ++++++++++++++++++++++++++" + user.id)

  const userExists = await prisma.client.findUnique({
  where: {
    email_userId: {
      email,
      userId: user.id
    }
  }
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
      userId: user.id
    },
  });

  if (newClient) {
    return true;
  } else {
    throw new Error('ERRO_AO_CRIAR_CLIENTE');
  }
}
export async function listarClientePaginado(page = 1) {
    const user = await getCurrentUser()
  const take = 10;
  const skip = (page - 1) * take;

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where: { isActive: true, userId: user.id },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.client.count({
    where: {
    isActive: true,
    userId: user.id
  }
}),
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
    const user = await getCurrentUser()
  const client = await prisma.client.findUnique({
    where: {
      id: id,
      userId: user.id
    },
  });

  if (!client) {
    throw new Error('CLIENTE_NAO_ENCONTRADO');
  }

  return client;
}

export async function updateCliente(client: Client): Promise<Boolean> {
    const user = await getCurrentUser()
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
      userId: user.id
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
    const user = await getCurrentUser()
  const client = await encontrarUnicoCliente(id);

  if (!client) {
    throw new Error('CLIENTE_NAO_ENCONTRADO');
  }

  const clientExluido = await prisma.client.update({
    where: {
      id: id,
      userId: user.id
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
    const user = await getCurrentUser()
  const clients = await prisma.client.findMany({
    where: { isActive: true, userId: user.id },
  });

  if (clients.length === 0) {
    throw new Error('Clientes não encontrado!');
  }

  return clients;
}

export async function TotalClients() {
     const user = await getCurrentUser()
  const numberOfClients = await prisma.client.count({
    where: {
        userId: user.id 
    }
  });

  return numberOfClients;
}

export async function TotalActiveClients() {
    const user = await getCurrentUser()
  const numberOfActiveClients = await prisma.client.count({
    where: { isActive: true, userId: user.id },
  });

  return numberOfActiveClients;
}

export async function TotalPFClients() {
    const user = await getCurrentUser()
  const numberOfActiveClients = await prisma.client.count({
    where: { tipo: 'FISICA', userId: user.id },
  });

  return numberOfActiveClients;
}

export async function TotalPJClients() {
       const user = await getCurrentUser()
  const numberOfActiveClients = await prisma.client.count({
    where: { tipo: 'JURIDICA', userId: user.id },
  });

  return numberOfActiveClients;
}
