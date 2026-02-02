"use client";

import { updateCliente } from "@/app/actions/client";
import { Client } from "@/app/types/ClientTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type FormEditarProps = {
  client: Client;
};

export function FormEditar({ client }: FormEditarProps) {
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [tipo, setTipo] = useState<Client["tipo"]>(client.tipo);
  const [documento, setDocumento] = useState(client.documento);
  const router = useRouter();

  async function handleEditar(e: React.FormEvent) {
    e.preventDefault();

    const clientAtualizado: Client = {
      ...client,
      name,
      email,
      tipo,
      documento,
      updatedAt: new Date(),
    };

    if (await updateCliente(clientAtualizado)) {
      toast.success("Usuário atualizado com sucesso!");
      router.push("/client/listar");
    } else {
      toast.error("Error tente novamente");
    }
  }

  return (
    <form onSubmit={handleEditar} className="flex flex-col items-center gap-16">
      <input type="hidden" value={client.id} />

      <label>
        Nome
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label>
        Pessoa
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as Client["tipo"])}
        >
          <option value="FISICA">FISICA</option>
          <option value="JURIDICA">JURIDICA</option>
        </select>
      </label>

      <label>
        Documento
        <input
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
        />
      </label>

      <button type="submit">Salvar</button>
    </form>
  );
}
