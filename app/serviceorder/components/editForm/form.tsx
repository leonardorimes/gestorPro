'use client';

import { listAllServices, updateOrderService } from '@/app/actions/service';
import { UpdateServiceOrderDTO } from '@/app/types/ServiceTypes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Service as PrismaService } from '@prisma/client';
import { Client as PrismaClient } from '@prisma/client';
import { listAllClients } from '@/app/actions/client';

type Props = {
  serviceOrder: UpdateServiceOrderDTO;
};

export default function FormEditar({ serviceOrder }: Props) {
  const [preco, setPreco] = useState(serviceOrder.servicePrice);
  const [services, setServices] = useState<PrismaService[]>([]);
  const [serviceId, setServiceId] = useState(serviceOrder.serviceId);
  const [clientId, setClientId] = useState(serviceOrder.clientId);
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

    const UpdateOrderService: UpdateServiceOrderDTO = {
      ...serviceOrder,
      id: serviceOrder.id,
      clientId: clientId,
      serviceId,
      servicePrice: Number(preco),
      status: serviceOrder.status,
      startedAt: serviceOrder.startedAt,
      finishedAt: serviceOrder.finishedAt,
    };

    try {
      console.log(UpdateOrderService);
      await updateOrderService(UpdateOrderService);
      toast.success('Atualizada com sucesso');
       router.push('/serviceorder/listar');
    } catch (error: any) {
      if(error.message === "DADOS_INVALIDOS"){
        toast.error("PREENCHA TODAS AS INFORMAÇÕES")
      }else{
        toast.error("erro ao atualizar")
      }
    }
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="
        w-full max-w-[92vw] sm:max-w-2xl mx-auto
        flex flex-col
        gap-12 sm:gap-16
        px-3 sm:px-6
        py-10 sm:py-16
      "
    >
      <div className="w-full max-w-md mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Editar ordem de serviço
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Atualize o cliente, o serviço e o valor da ordem.
          </p>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {/* Cliente */}
          <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">
              Cliente
            </label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="
                bg-transparent
                border-b border-gray-400
                py-2 sm:py-2.5
                text-base
                focus:outline-none
                focus:border-[#169545]
                transition-colors
              "
            >
              <option value="">Selecione um cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {/* Serviço */}
          <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">
              Serviço
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="
                bg-transparent
                border-b border-gray-400
                py-2 sm:py-2.5
                text-base
                focus:outline-none
                focus:border-[#169545]
                transition-colors
              "
            >
              <option value="">Selecione um serviço</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Preço */}
          <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">
              Preço
            </label>
            <input
              value={preco}
              onChange={(e) => setPreco(Number(e.target.value))}
              placeholder="0,00"
              className="
                bg-transparent
                border-b border-gray-400
                py-2 sm:py-2.5
                text-base
                focus:outline-none
                focus:border-[#169545]
                transition-colors
              "
            />
          </div>
        </div>

        {/* Ação */}
        <div className="pt-6 sm:pt-10 pl-3 sm:pl-0">
          <button
            type="submit"
            className="
              w-full sm:w-auto
              bg-[#169545] sm:bg-transparent
              text-white sm:text-[#169545]
              py-3 sm:py-0
              text-sm font-semibold
              hover:opacity-90
              transition-opacity
            "
          >
            Salvar alterações →
          </button>
        </div>
      </div>
    </form>
  );
}
