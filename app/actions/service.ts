'use server';

import { prisma } from '@/lib/prisma';
import { error } from 'console';

export async function registerService(formData: FormData) {
  console.log(formData);

  const servicename = formData.name;
  const description = formData.description;
  const serviceType = formData.service_type;
  const price = formData.price;

  if (!servicename && description && !serviceType && price) {
    throw new Error('DADOS_INVALIDOS');
  }

  const newService = prisma.servico.create({
    data: {
      name: servicename,
      description,
      service_type: serviceType,
      price,
    },
  });

  if (newService) {
    return true;
  } else {
    throw new Error('ERRO_AO_CRIAR_SERVICO');
  }
}
