'use server';

import { prisma } from '@/lib/prisma';
import { Service, TipoServico } from '../types/ServiceTypes';

export async function registerService(formData: Service) {
  const serviceName = formData.name;
  const descricao = formData.description;
  const serviceType = formData.service_type;
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

export async function findOneService(id: string): Promise<Service | null> {
  

  const servico = await prisma.servico.findUnique({
    where: {
      id: id,
    },
  });

  if (!servico) {
    throw new Error('SERVICO_NAO_ENCONTRADO');
  }


  const servicoEncontrado: Service = {
     id: servico.id,
      name: servico.name,
      description: servico.description,
      service_type: servico.service_type as TipoServico,
      price: servico.price,
      is_active: servico.is_active,
      createdAt: servico.createdAt,
      updatedAt: servico.updatedAt,
  }

  return servicoEncontrado;
}

export async function updateService(service: Service) {
  const id = service.id;
  const name = service.name;
  const descricao = service.description;
  const tipoServico = service.service_type;
  const price = Number(service.price);
  const isActive = service.is_active;

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

export async function deleteService(id: string){
  const service = findOneService(id)

  if(!service) {
    throw new Error('SERVICO_NAO_ENCONTRADO')
  }

  const serviceExcluido = await prisma.servico.update({
    where: {
      id: id
    }, data: {
      is_active: false
    }
  })

  if(!serviceExcluido){
    throw new Error("ERRO_AO_EXCLUIR_SERVICO");
  }else{
    return true;
  }

}
