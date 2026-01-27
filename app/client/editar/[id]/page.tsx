import { encontrarUnicoCliente, updateCliente } from "@/app/actions/client";
import { FormEditar } from "@/app/components/editForm";
import { Form } from "@/app/components/form";
import { Client } from "../../listar/page";

export default async function PageClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);

  const client = await encontrarUnicoCliente(id);
  console.log(client);

  if (!client) {
    throw new Error("Cliente não encontrado lallal");
  }

  const clienteAtualizar: Client = {
    id: client?.id,
    name: client?.name,
    email: client?.email,
    tipo: client?.tipo,
    documento: client?.documento,
    isActive: client?.isActive,
    createdAt: client?.createdAt,
    updatedAt: client?.updatedAt,
  };

  console.log(clienteAtualizar);

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <h1>Preencha as informações abaixo para atualizar o Cliente</h1>

      <FormEditar client={clienteAtualizar} />
    </div>
  );
}
