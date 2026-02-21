'use server';

import { prisma } from '@/lib/prisma';
import {
  Service,
  ServiceOrder,
  TipoServico,
  UpdateServiceOrderDTO,
} from '../types/ServiceTypes';
import { Service as ServicePrisma } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth-server';
import { use } from 'react';


export async function registerService(formData: Service) {
  const user = await getCurrentUser()
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
      userId: user.id
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
  const user = await getCurrentUser()
  const service = await prisma.service.findUnique({
    where: {
      id: id,
        userId: user.id,
    },
  });

  if (!service) {
    throw new Error('SERVICO_NAO_ENCONTRADO');
  }

  return service;
}

export async function updateService(service: Service) {
  const user = await getCurrentUser()
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
      userId: user.id,
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
    const user = await getCurrentUser()

  const [services, total] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true, userId: user.id, },
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
    const user = await getCurrentUser()

  if (!service) {
    throw new Error('SERVICO_NAO_ENCONTRADO');
  }

  const serviceExcluido = await prisma.service.update({
    where: {
      id: id,
      userId: user.id,
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
    const user = await getCurrentUser()
  const services = await prisma.service.findMany({
    where: { isActive: true, userId: user.id, },
  });

  if (services.length === 0) {
    throw new Error('Serviços não encontrado!');
  }
  console.log(services);

  return services;
}

export async function createOrderService(orderService: ServiceOrder) {
  const user = await getCurrentUser();
 
  if (!orderService.clientId || !orderService.serviceId) {
    throw new Error('DADOS_INVALIDOS');
  }


  const service = await prisma.service.findFirst({
    where: {
      id: orderService.serviceId,
      userId: user.id,
    },
  });

  if (!service) {
    throw new Error('SERVICO_NAO_ENCONTRADO');
  }

  const newOrderService = await prisma.serviceOrder.create({
    data: {
      clientId: orderService.clientId,
      serviceId: service.id,

      // 🔥 Snapshot seguro
      serviceName: service.name,
      servicePrice: service.price,

      status: orderService.status ?? 'OPEN',
      startedAt: orderService.startedAt ?? null,
      finishedAt: orderService.finishedAt ?? null,

      userId: user.id,
    },
  });

  return !!newOrderService;
}

export async function listarserviceOrderPaginado(page: number) {
  const take = 10;
  const skip = (page - 1) * take;
  const user = await getCurrentUser()

  const [serviceOrders, total] = await Promise.all([
    prisma.serviceOrder.findMany({
       where: {userId: user.id},
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        client: true,
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
    const user = await getCurrentUser()
  const serviceOrder = await prisma.serviceOrder.findUnique({
    where: { id: id, userId: user.id},
  });

  if (!serviceOrder) {
    throw new Error('ERRO_AO_ECONTRAR_ORDER');
  }

  return serviceOrder;
}

export async function updateOrderService(order: UpdateServiceOrderDTO) {
  const user = await getCurrentUser();

  if (!order.id || !order.clientId || !order.serviceId) {
    throw new Error('DADOS_INVALIDOS');
  }

  // 🔥 Verificar se ordem pertence ao usuário
  const existingOrder = await prisma.serviceOrder.findFirst({
    where: {
      id: order.id,
      userId: user.id,
    },
  });

  if (!existingOrder) {
    throw new Error('ORDEM_NAO_ENCONTRADA');
  }

  // 🔥 Buscar serviço para snapshot atualizado
  const service = await prisma.service.findFirst({
    where: {
      id: order.serviceId,
      userId: user.id,
    },
  });

  if (!service) {
    throw new Error('SERVICO_NAO_ENCONTRADO');
  }

  const updatedOrder = await prisma.serviceOrder.update({
    where: { id: order.id },
    data: {
      status: order.status,
      startedAt: order.startedAt ?? null,
      finishedAt: order.finishedAt ?? null,

      // 🔥 Snapshot correto
      serviceName: service.name,
      servicePrice: service.price,

      clientId: order.clientId,
      serviceId: order.serviceId,
    },
  });

  return updatedOrder;
}

export async function deleteOrder(id: string) {
    const user = await getCurrentUser()
  const deleteOrderService = await prisma.serviceOrder.update({
    where: {
      id: id, userId: user.id
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
    const user = await getCurrentUser()
  const numberOfOpenService = await prisma.serviceOrder.count({
    where: {
      status: 'OPEN',
      userId: user.id
    },
  });

  return numberOfOpenService.toString();
}

export async function InProgressServices() {
    const user = await getCurrentUser()
  const numberOfOpenService = await prisma.serviceOrder.count({
    where: {
      status: 'IN_PROGRESS',
      userId: user.id
    },
  });

  return numberOfOpenService;
}

export async function CompletedServices() {
    const user = await getCurrentUser()
  const numberOfCompletedService = await prisma.serviceOrder.count({
    where: {
      status: 'COMPLETED',
      userId: user.id
    },
  });

  return numberOfCompletedService;
}

export async function CanceledServices() {
    const user = await getCurrentUser()
  const numberOfCanceledServices = await prisma.serviceOrder.count({
    where: {
      status: 'CANCELED',
      userId: user.id
    },
  });

  return numberOfCanceledServices;
}

export async function totalValueServices() {
    const user = await getCurrentUser()



  let result  = await prisma.serviceOrder.aggregate({
    _sum: {
      servicePrice: true,
    },
    where: {
      status: 'COMPLETED',
      userId: user.id
    },
  });



  return result
}

export async function TicketServices() {
    const user = await getCurrentUser()
  const avg = await prisma.serviceOrder.aggregate({
    _avg: {
      servicePrice: true,
    },
    where: {
      status: 'COMPLETED',
      userId: user.id
    },
  });

  return avg;
}

export async function totalMonthlyRevenue() {
    const user = await getCurrentUser()
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const total = await prisma.serviceOrder.aggregate({
    _sum: {
      servicePrice: true,
    },
    where: {
      status: 'COMPLETED',
      userId: user.id,
      createdAt: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
  });

  return total;
}
