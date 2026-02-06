import { listarserviceOrderPaginado } from '@/app/actions/service';
import { Prisma } from '@prisma/client';

export type ServiceOrderWithRelations = Prisma.ServiceOrderGetPayload<{
  include: {
    customer: true;
    service: true;
  };
}>;

export default async function ListarClientes() {
  const resultado = await listarserviceOrderPaginado(1);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gray-50 py-12 px-6 gap-2">
      <img className="w-xl" src="/logo.png" alt="" />

      <div className="w-full mb-12 max-w-6xl bg-white shadow-2xl rounded-md border border-[#169545] overflow-hidden my-auto">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#169545] text-white">
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Preço
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Status
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Início:
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Terminado
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Atualizada
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Cliente
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Serviço
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {resultado.data.map(
                (servicesOrder: ServiceOrderWithRelations) => (
                  <tr
                    key={servicesOrder.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-center">
                      <div className="flex flex-col">
                        <span className="text-gray-800 font-bold text-sm">
                          {servicesOrder.price}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-block px-2 py-0.5 text-[9px] font-black rounded-sm bg-gray-200 text-gray-600">
                        {servicesOrder.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 font-mono text-xs text-center">
                      {servicesOrder.startedAt?.toLocaleDateString('pt-br') ||
                        ''}
                    </td>
                    <td className="p-4 text-gray-500 font-mono text-xs text-center">
                      {servicesOrder.finishedAt?.toLocaleDateString('pt-br') ||
                        'Não terminou'}
                    </td>
                    <td className="p-4 text-gray-500 font-mono text-xs text-center">
                      {servicesOrder.updatedAt?.toLocaleDateString('pt-br') ||
                        'Não houve atualizações'}
                    </td>
                    <td className="p-4 text-gray-500 font-mono text-xs text-center">
                      {servicesOrder?.customer?.name}
                    </td>
                    <td className="p-4 text-gray-500 font-mono text-xs text-center">
                      {servicesOrder?.service?.name}
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-4">
                        {/* <Link
                        href={`/client/editar/${servicesOrder.id}`}
                        className="text-[#169545] hover:scale-110 transition-transform text-[11px] font-bold underline"
                      >
                        EDITAR
                      </Link>
                      <DeleteForm idCliente={servicesOrder.id} /> */}
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Margem automática no topo deste link para empurrá-lo para o fim da página se necessário */}
      <a
        href="#"
        className="mt-auto pt-20 text-gray-400 hover:text-[#169545] text-xs font-semibold uppercase tracking-widest transition-all"
      >
        ← Voltar ao Início
      </a>
    </div>
  );
}
