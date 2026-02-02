'use server';

import { prisma } from '@/lib/prisma';
import { Service } from '../types/ServiceTypes';


export async function registerService(formData: Service) {


  const serviceName = formData.name;
  const descricao = formData.descricao;
  const serviceType = formData.tipo;
  const preco = formData.price;

  console.log(serviceName, descricao, serviceType, preco)

  if (!serviceName || !descricao || !serviceType || !preco) {
    throw new Error('DADOS_INVALIDOS');
  }

  const newService = await prisma.servico.create({
    data: {
      name: serviceName,
      description: descricao,
      service_type: serviceType,
      is_active: true,
      price: Number(preco)
    },
  });

  console.log("esta indo para o banco " + newService)

  if (newService) {
    return true;
  } else {
    throw new Error('ERRO_AO_CRIAR_SERVICO');
  }
}
