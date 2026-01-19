'use server';

import { prisma } from '@/lib/prisma';
import { error } from 'console';

export async function registerCLient(formData: FormData) {
  const clientName = formData.get('clientName') as string;
  const email = formData.get('email') as string;
  const pessoa = formData.get('pessoa') as string;
  const documento = formData.get('documento') as string;

  console.log(email, clientName, pessoa, documento);

  const userExists = await prisma.client.findUnique({
    where: { email: email },
  });

  if (userExists) {
    throw new Error('O cliente já existe');
  }

  try {
    if (!clientName || !email || !pessoa || !documento) {
      throw new Error('Dados inválidos');
    }

    await prisma.client.create({
      data: {
        name: clientName,
        email,
        tipo: pessoa,
        documento,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
