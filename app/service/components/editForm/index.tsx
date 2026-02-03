"use client";


import { updateService } from "@/app/actions/service";
import { Service } from "@/app/types/ServiceTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type FormEditarProps = {
  service: Service;
};

export function FormEditar({ service }: FormEditarProps) {
  const [name, setName] = useState(service.name);
  const [description, setDescription] = useState(service.description);
  const [tipo, setTipo] = useState<Service["service_type"]>(service.service_type);
  const [preco, setPreco] = useState(service.price);
  const router = useRouter();

  async function handleEditar(e: React.FormEvent) {
    e.preventDefault();

    const servicoAtualizado: Service = {
      ...service,
      name,
      description,
      service_type: tipo,
      price: preco,
      updatedAt: new Date(),
    };

    if (await updateService(servicoAtualizado)) {
      toast.success("Serviço atualizado com sucesso!");
      router.push("/service/listar");
    } else {
      toast.error("Error tente novamente");
    }
  }

  return (
    <form onSubmit={handleEditar} className="flex flex-col items-center gap-16">
      <input type="hidden" value={service.id} />

      <label>
        Nome
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Descrição
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <label>
        Tipo
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as Service["service_type"])}
        >
          <option value="FISICA">FISICA</option>
          <option value="JURIDICA">JURIDICA</option>
        </select>
      </label>

      <label>
        Preço
        <input
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
        />
      </label>

      <button type="submit">Salvar</button>
    </form>
  );
}
