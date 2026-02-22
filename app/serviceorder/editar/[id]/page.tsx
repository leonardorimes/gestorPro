import FormEditar from '@/app/serviceorder/components/editForm/form';


import { encontrarServiceOrder } from '@/app/actions/service';
import { UpdateServiceOrderDTO } from '@/app/types/ServiceTypes';


export default async function PageClient({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const serviceOrder = await encontrarServiceOrder(id);

  const serviceOrderFormatted: UpdateServiceOrderDTO = {
  ...serviceOrder,
  servicePrice: serviceOrder.servicePrice.toNumber(),
};

  if (!serviceOrder) {
    throw new Error('Service Order não encontrado ');
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">


      <FormEditar serviceOrder={serviceOrderFormatted} />
    </div>
  );
}
