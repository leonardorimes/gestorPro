'use client';

import {
  createOrderService,
  listAllServices,
  registerService,
} from '@/app/actions/service';
import { Service, ServiceOrder, TipoServico } from '@/app/types/ServiceTypes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Service as PrismaService } from '@prisma/client';
import { Client as PrismaClient } from '@prisma/client';
import ListarClientes from '@/app/client/listar/page';
import { listAllClients } from '@/app/actions/client';

export default function FormCriar() {
  const [preco, setPreco] = useState('');
  const [services, setServices] = useState<PrismaService[]>([]);
  const [serviceId, setServiceId] = useState('');
  const [clientId, setClientId] = useState('');
  const [clients, setClients] = useState<PrismaClient[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function loadServices() {
      const services = await listAllServices();
      setServices(services);
    }

    loadServices();
  }, []);

  useEffect(() => {
    async function loadClients() {
      const clients = await listAllClients();
      setClients(clients);
    }
    loadClients();
  }, []);

  async function handleCriar(e: React.FormEvent) {
    console.log('O id do cliente é ' + clientId);
    e.preventDefault();
    const newOrderService: ServiceOrder = {
      id: '',
      customerId: clientId,
      serviceId,
      price: Number(preco),
      status: 'OPEN',
      createdAt: new Date(),
      updatedAt: new Date(),
      startedAt: new Date(),
      finishedAt: null,
    };

    try {
      console.log(newOrderService);
      createOrderService(newOrderService);
      toast.success('Criada com sucesso');
    } catch (error) {
      toast.error('erro ao criar');
    }
  }

  return (
    <form onSubmit={handleCriar} className="flex flex-col items-center gap-16">
      <label>
        Cliente
        <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
          <option value=""> Selecione um cliente: </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Tipo do serviço:
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value=""> Selecione um serviço: </option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
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
