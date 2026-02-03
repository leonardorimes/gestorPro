

import { FormEditar } from '../../components/editForm';
import { findOneService } from "@/app/actions/service";
import { Service } from "@/app/types/ServiceTypes";

export default async function PageClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  

  const service = await findOneService(id);


  if (!service) {
    throw new Error('Cliente não encontrado lallal');
  }

  const clienteAtualizar: Service = {
  id: service.id,
  name: service.name,
  description: service.description,
  service_type: service.service_type,
  price: service.price,
  is_active: service.is_active,
  createdAt: service.createdAt,
  updatedAt: new Date(),
  };



  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <h1>Preencha as informações abaixo para atualizar o Cliente</h1>

      <FormEditar service={clienteAtualizar} />
    </div>
  );
}
