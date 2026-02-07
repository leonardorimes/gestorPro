import FormEditar from '@/app/serviceorder/components/editForm';

import { encontrarServiceOrder } from '@/app/actions/service';
import { Prisma } from '@prisma/client';

export default async function PageClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const serviceOrder = await encontrarServiceOrder(id);

  if (!serviceOrder) {
    throw new Error('Service Order não encontrado ');
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <h1>Preencha as informações abaixo para atualizar a Ordem</h1>

      <FormEditar order={serviceOrder} />
    </div>
  );
}
