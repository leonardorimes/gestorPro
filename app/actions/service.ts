'use server';

import { prisma } from '@/lib/prisma';
import {
  Service,
  ServiceOrder,
  TipoServico,
  UpdateServiceOrderDTO,
} from '../types/ServiceTypes';
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

  if(!name || !descricao || !tipoServico || !price) {
       throw new Error('DADOS_INVALIDOS');
  }

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
    throw new Error('ERRO_AO_ATUALIZAR_SERVIÇO');
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
  console.log("essa é a ordem service+++++++++++++++++++++++++++++++++++++++++" + orderService);
  if (
    !orderService.customerId ||
    !orderService.serviceId ||
    !orderService.price
  ) {
    throw new Error('DADOS_INVALIDOS');
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

export async function encontrarServiceOrder(id: string) {
  const serviceOrder = await prisma.serviceOrder.findUnique({
    where: { id: id },
  });

  if (!serviceOrder) {
    throw new Error('ERRO_AO_ECONTRAR_ORDER');
  }

  return serviceOrder;
}

export async function updateOrderService(order: UpdateServiceOrderDTO) {
    if (
    !order.customerId ||
    !order.serviceId ||
    !order.price
  ) {
    throw new Error('DADOS_INVALIDOS');
  }
  const serviceOrder = await prisma.serviceOrder.update({
    where: { id: order.id },
    data: {
      price: order.price,
      status: order.status,
      startedAt: order.startedAt,
      finishedAt: order.finishedAt ?? null,

      customer: {
        connect: { id: order.customerId },
      },

      service: {
        connect: { id: order.serviceId },
      },
    },
  });

  return serviceOrder;
}

export async function deleteOrder(id: string) {
  const deleteOrderService = await prisma.serviceOrder.update({
    where: {
      id: id,
    },
    data: {
      status: 'CANCELED',
    },
  });

  if (!deleteOrderService) {
    throw new Error('ERRO_AO_DELETAR_ORDER_SERVICE');
  } else {
    return true;
  }
}

export async function OpenServices() {
  const numberOfOpenService = await prisma.serviceOrder.count({
    where: {
      status: 'OPEN',
    },
  });

  return numberOfOpenService.toString();
}

export async function InProgressServices() {
  const numberOfOpenService = await prisma.serviceOrder.count({
    where: {
      status: 'IN_PROGRESS',
    },
  });

  return numberOfOpenService;
}

export async function CompletedServices() {
  const numberOfCompletedService = await prisma.serviceOrder.count({
    where: {
      status: 'COMPLETED',
    },
  });

  return numberOfCompletedService;
}

export async function CanceledServices() {
  const numberOfCanceledServices = await prisma.serviceOrder.count({
    where: {
      status: 'CANCELED',
    },
  });

  return numberOfCanceledServices;
}

export async function totalValueServices() {
  const total = await prisma.serviceOrder.aggregate({
    _sum: {
      price: true,
    },
    where: {
      status: 'COMPLETED',
    },
  });

  return total;
}

export async function TicketServices() {
  const avg = await prisma.serviceOrder.aggregate({
    _avg: {
      price: true,
    },
    where: {
      status: 'COMPLETED',
    },
  });

  return avg;
}

export async function totalMonthlyRevenue() {
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const total = await prisma.serviceOrder.aggregate({
    _sum: {
      price: true,
    },
    where: {
      status: 'COMPLETED',
      createdAt: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
  });

  return total;
}
