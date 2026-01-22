import { encontrarUnicoCliente, updateCliente } from '@/app/actions/client';
import { Form } from '@/app/components/form/page';

export default async function PageClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = await encontrarUnicoCliente(id);

  if (!client) {
    throw new Error('Cliente não encontrado');
  }

  const clienteAtualizar = {
    id: client?.id,
    name: client?.name,
    email: client?.email,
    tipo: client?.tipo,
    documento: client?.documento,
    isActive: client?.isActive,
    createdAt: client?.createdAt,
    updatedAt: client?.updatedAt,
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <h1>Preencha as informações abaixo para atualizar o Cliente</h1>

      <Form action={updateCliente} client={clienteAtualizar} />
    </div>
  );
}
