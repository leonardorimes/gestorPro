import { listService } from '@/app/actions/service';
import { Service } from '@/app/types/ServiceTypes';
import Link from 'next/link';
import { DeleteForm } from '../components/deleteForm';

export default async function ListarServicos() {
  const resultado = await listService(1);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      {/* Container */}
      <div className="w-full max-w-6xl flex flex-col gap-10 py-10">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">Serviços</h1>
          <p className="text-sm text-gray-500">
            Lista de serviços cadastrados no sistema.
          </p>
        </div>

        {/* Linha de separação */}
        <div className="h-px bg-gray-200" />

        {/* Tabela */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Cabeçalho (desktop) */}
            <thead className="hidden sm:table-header-group">
              <tr className="border-b border-gray-200">
                <th className="py-3 text-left text-[10px] uppercase tracking-widest text-gray-400">
                  Serviço
                </th>
                <th className="py-3 text-center text-[10px] uppercase tracking-widest text-gray-400">
                  Tipo
                </th>
                <th className="py-3 text-center text-[10px] uppercase tracking-widest text-gray-400">
                  Preço
                </th>
                <th className="py-3 text-center text-[10px] uppercase tracking-widest text-gray-400">
                  Status
                </th>
                <th className="py-3 text-right text-[10px] uppercase tracking-widest text-gray-400">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {resultado.data.map((service: Service) => (
                <tr
                  key={service.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Serviço */}
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium text-sm">
                        {service.name}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {service.description}
                      </span>
                    </div>
                  </td>

                  {/* Tipo */}
                  <td className="py-4 text-center text-sm text-gray-600">
                    {service.service_type}
                  </td>

                  {/* Preço */}
                  <td className="py-4 text-center font-mono text-xs text-gray-600">
                    {service.price}
                  </td>

                  {/* Status */}
                  <td className="py-4 text-center">
                    <span
                      className={`text-xs font-semibold ${
                        service.is_active ? 'text-[#169545]' : 'text-red-500'
                      }`}
                    >
                      {service.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>

                  {/* Ações */}
                  <td className="py-4 text-right">
                    <div className="inline-flex gap-4">
                      <Link
                        href={`/service/editar/${service.id}`}
                        className="text-sm font-medium text-[#169545] hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteForm idService={service.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rodapé */}
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
