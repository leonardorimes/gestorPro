'use client';

import { listAllServices, updateOrderService } from '@/app/actions/service';
import { ServiceOrder } from '@/app/types/ServiceTypes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Service as PrismaService } from '@prisma/client';
import { Client as PrismaClient } from '@prisma/client';
import { listAllClients } from '@/app/actions/client';

type Props = {
  serviceOrder: ServiceOrderWithRelations;
};

export default function FormEditar({ serviceOrder }: Props) {
  const [preco, setPreco] = useState(serviceOrder.price);
  const [services, setServices] = useState<PrismaService[]>([]);
  const [serviceId, setServiceId] = useState(serviceOrder.serviceId);
  const [clientId, setClientId] = useState(serviceOrder.customerId);
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

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    const UpdateOrderService: ServiceOrder = {
      ...serviceOrder,
      id: serviceOrder.id,
      customerId: serviceOrder.customerId,
      serviceId: serviceOrder.serviceId,
      price: Number(serviceOrder.price),
      status: serviceOrder.status,
      createdAt: serviceOrder.createdAt,
      updatedAt: serviceOrder.updatedAt,
      startedAt: serviceOrder.startedAt,
      finishedAt: serviceOrder.finishedAt,
    };

    try {
      console.log(UpdateOrderService);
      updateOrderService(UpdateOrderService);
      toast.success('Criada com sucesso');
    } catch (error) {
      toast.error('erro ao criar');
    }
  }

  return (
    <form onSubmit={handleUpdate} className="flex flex-col items-center gap-16">
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
        <input
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
        />
      </label>

      <button type="submit">Salvar</button>
    </form>
  );
}
