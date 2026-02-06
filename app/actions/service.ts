'use server';

import { prisma } from '@/lib/prisma';
import { Service, ServiceOrder, TipoServico } from '../types/ServiceTypes';
import { Service as ServicePrisma } from '@prisma/client';

export async function registerService(formData: Service) {
  const serviceName = formData.name;
  const descricao = formData.description;
  const serviceType = formData.service_type;
  const preco = formData.price;

  if (!serviceName || !descricao || !serviceType || !preco) {
    throw new Error('DADOS_INVALIDOS');
  }

  const newService = await prisma.service.create({
    data: {
      name: serviceName,
      description: descricao,
      serviceType: serviceType,
      isActive: true,
      price: Number(preco),
    },
  });

  if (newService) {
    return true;
  } else {
    throw new Error('ERRO_AO_CRIAR_SERVICO');
  }
}

export async function findOneService(
  id: string,
): Promise<ServicePrisma | null> {
  const service = await prisma.service.findUnique({
    where: {
      id: id,
    },
  });

  if (!service) {
    throw new Error('SERVICO_NAO_ENCONTRADO');
  }

  return service;
}

export async function updateService(service: Service) {
  const id = service.id;
  const name = service.name;
  const descricao = service.description;
  const tipoServico = service.service_type;
  const price = Number(service.price);
  const isActive = service.is_active;

  const serviceAtualizado = await prisma.service.update({
    where: {
      id: id,
    },
    data: {
      name,
      description: descricao,
      serviceType: tipoServico,
      price,
      isActive: isActive,
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
    prisma.service.findMany({
      where: { isActive: true },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.service.count(),
  ]);

  if (!services) {
    throw new Error('ERRO_AO_LISTAR_SERVICO');
  }

  return {
    data: services,
    meta: {
      total,
      page,
      totalPages: Math.ceil(total / take),
    },
  };
}

export async function deleteService(id: string) {
  const service = findOneService(id);

  if (!service) {
    throw new Error('SERVICO_NAO_ENCONTRADO');
  }

  const serviceExcluido = await prisma.service.update({
    where: {
      id: id,
    },
    data: {
      isActive: false,
    },
  });

  if (!serviceExcluido) {
    throw new Error('ERRO_AO_EXCLUIR_SERVICO');
  } else {
    return true;
  }
}

export async function listAllServices(): Promise<ServicePrisma[]> {
  const services = await prisma.service.findMany({
    where: { isActive: true },
  });

  if (services.length === 0) {
    throw new Error('Serviços não encontrado!');
  }
  console.log(services);

  return services;
}

export async function createOrderService(orderService: ServiceOrder) {
  console.log(orderService);
  if (
    !orderService.customerId ||
    !orderService.serviceId ||
    !orderService.price
  ) {
    throw new Error('preencha todas as inforamações');
  }

  const newOrderService = await prisma.serviceOrder.create({
    data: {
      customerId: orderService.customerId,
      serviceId: orderService.serviceId,
      price: orderService.price,
      status: orderService.status,
      startedAt: orderService.startedAt,
      finishedAt: orderService.finishedAt,
      createdAt: orderService.createdAt,
      updatedAt: orderService.updatedAt,
    },
  });

  if (newOrderService) {
    return true;
  } else {
    throw new Error('ERRO_AO_CRIAR_SERVICO');
  }
}

export async function listarserviceOrderPaginado(page: number) {
  const take = 10;
  const skip = (page - 1) * take;

  const [serviceOrders, total] = await Promise.all([
    prisma.serviceOrder.findMany({
      // where: { isActive: true },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        service: true,
      },
    }),
    prisma.serviceOrder.count(),
  ]);

  if (!serviceOrders) {
    throw new Error('ERRO_AO_LISTAR_SERVICE');
  }

  return {
    data: serviceOrders,
    meta: {
      total,
      page,
      totalPages: Math.ceil(total / take),
    },
  };
}
