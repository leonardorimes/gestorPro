'use client';

import { listAllServices, registerService } from '@/app/actions/service';
import { Service, TipoServico } from '@/app/types/ServiceTypes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Service as PrismaService} from "@prisma/client"


export  default function FormCriar() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState([]);
  const [tipo, setTipo] = useState<TipoServico>('DESENVOLVIMENTO');
  const [preco, setPreco] = useState('');
  const [services, setServices] = useState<PrismaService[]>([])
  const router = useRouter();

useEffect(() => {
  async function loadServices() {
    const services = await listAllServices()
    setServices(services)
  }
  console.log(services)

  loadServices()
}, [])


  async function handleCriar(e: React.FormEvent) {
    e.preventDefault();
  

   console.log("executando handlercriar" + listAllServices())
  }

  return (
    <form onSubmit={handleCriar} className="flex flex-col items-center gap-16">
      <label>
        Nome do serviço
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Descrição
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        Tipo do serviço:
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as Service['service_type'])}
        >
          <option value="DESENVOLVIMENTO">Desenvolvimento</option>
          <option value="MANUTENCAO">Manutenção Corretiva</option>
          <option value="SUPORTE">Suporte Técnico</option>
          <option value="CONSULTORIA">Consultoria</option>
          <option value="HOSPEDAGEM">Hospedagem/Cloud</option>
        </select>
      </label>

      <label>
        preço
        <input value={preco} onChange={(e) => setPreco(e.target.value)} />
      </label>

      <button type="submit">Salvar</button>
    </form>
  );
}
