'use server';

import { prisma } from '@/lib/prisma';
import { Service } from '../types/ServiceTypes';

export async function registerService(formData: Service) {
  const serviceName = formData.name;
  const descricao = formData.descricao;
  const serviceType = formData.tipo;
  const preco = formData.price;

  console.log(serviceName, descricao, serviceType, preco);

  if (!serviceName || !descricao || !serviceType || !preco) {
    throw new Error('DADOS_INVALIDOS');
  }

  const newService = await prisma.servico.create({
    data: {
      name: serviceName,
      description: descricao,
      service_type: serviceType,
      is_active: true,
      price: Number(preco),
    },
  });

  if (newService) {
    return true;
  } else {
    throw new Error('ERRO_AO_CRIAR_SERVICO');
  }
}

export async function findOneService(service: Service) {
  const id = service.id;

  const servico = prisma.servico.findUnique({
    where: {
      id: id,
    },
  });

  if (!servico) {
    throw new Error('SERVICO_NAO_ENCONTRADO');
  }

  return servico;
}

export async function updateService(service: Service) {
  const id = service.id;
  const name = service.name;
  const descricao = service.descricao;
  const tipoServico = service.tipo;
  const price = Number(service.price);
  const isActive = service.isActive;

  const serviceAtualizado = await prisma.servico.update({
    where: {
      id: id,
    },
    data: {
      name,
      description: descricao,
      service_type: tipoServico,
      price,
      is_active: isActive,
    },
  });

  if (!serviceAtualizado) {
    throw new Error('Erro ao atualizar o serviço');
  } else {
    return true;
  }
}

export async function listService(page: number) {
  const take = 10;
  const skip = (page - 1) * take;

  const [services, total] = await Promise.all([
    prisma.servico.findMany({
      where: { is_active: true },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.servico.count(),
  ]);

  if (!services) {
    throw new Error('ERRO_AO_LISTAR_SERVICO');
  }

  return {
    data: services as Service[],
    meta: {
      total,
      page,
      totalPages: Math.ceil(total / take),
    },
  };
}
