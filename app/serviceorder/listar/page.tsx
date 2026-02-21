import { listarserviceOrderPaginado } from '@/app/actions/service';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import { DeleteForm } from '../deleteForm';

export type ServiceOrderWithRelations = Prisma.ServiceOrderGetPayload<{
  include: {
    client: true;
    service: true;
  };
}>;

export default async function ListarServiceOrder() {
  const resultado = await listarserviceOrderPaginado(1);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-7xl flex flex-col gap-10 py-10">
        
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Ordens de Serviço
          </h1>
          <p className="text-sm text-gray-500">
            Acompanhe as ordens de serviço criadas no sistema.
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            
            <thead className="hidden sm:table-header-group">
              <tr className="border-b border-gray-200">
                <th className="py-3 text-left text-[10px] uppercase tracking-widest text-gray-400">
                  Cliente / Serviço
                </th>
                <th className="py-3 text-center text-[10px] uppercase tracking-widest text-gray-400">
                  Status
                </th>
                <th className="py-3 text-center text-[10px] uppercase tracking-widest text-gray-400">
                  Início
                </th>
                <th className="py-3 text-center text-[10px] uppercase tracking-widest text-gray-400">
                  Término
                </th>
                <th className="py-3 text-center text-[10px] uppercase tracking-widest text-gray-400">
                  Atualização
                </th>
                <th className="py-3 text-center text-[10px] uppercase tracking-widest text-gray-400">
                  Preço
                </th>
                <th className="py-3 text-right text-[10px] uppercase tracking-widest text-gray-400">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {resultado.data.map((order: ServiceOrderWithRelations) => (
                <tr
                  key={order.id}
                  className="block sm:table-row border border-gray-200 sm:border-0 rounded-lg sm:rounded-none p-4 sm:p-0 mb-4 sm:mb-0 hover:bg-gray-50 transition-colors"
                >
                  {/* Cliente / Serviço */}
                  <td className="block sm:table-cell py-2 sm:py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-900 font-medium text-sm">
                        {order.client?.name}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {order.service?.name}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="block sm:table-cell py-1 sm:py-4 text-left sm:text-center">
                    <span className="text-sm font-semibold text-gray-700">
                      {order.status}
                    </span>
                  </td>

                  {/* Início */}
                  <td className="block sm:table-cell py-1 sm:py-4 text-left sm:text-center">
                    <span className="font-mono text-xs text-gray-600">
                      {order.startedAt?.toLocaleDateString('pt-BR')}
                    </span>
                  </td>

                  {/* Término */}
                  <td className="block sm:table-cell py-1 sm:py-4 text-left sm:text-center">
                    <span className="font-mono text-xs text-gray-600">
                      {order.finishedAt
                        ? order.finishedAt.toLocaleDateString('pt-BR')
                        : 'Não finalizada'}
                    </span>
                  </td>

                  {/* Atualização */}
                  <td className="block sm:table-cell py-1 sm:py-4 text-left sm:text-center">
                    <span className="font-mono text-xs text-gray-600">
                      {order.updatedAt.toLocaleDateString('pt-BR')}
                    </span>
                  </td>

                  {/* Preço */}
                  <td className="block sm:table-cell py-1 sm:py-4 text-left sm:text-center">
                    <span className="text-sm font-semibold text-gray-900">
                      {order.servicePrice
                        .toNumber()
                        .toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                    </span>
                  </td>

                  {/* Ações */}
                  <td className="block sm:table-cell pt-4 sm:pt-4">
                    <div className="flex gap-6 sm:justify-end">
                      <Link
                        href={`/serviceorder/editar/${order.id}`}
                        className="text-sm font-semibold text-[#169545] hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteForm idCliente={order.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-gray-400 hover:text-[#169545]"
          >
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}