import Link from 'next/link';
import { listarClientePaginado } from '../../actions/client';
import { Client } from '@/app/types/ClientTypes';
import { DeleteForm } from '../components/deleteForm';

export default async function ListarClientes() {
  const resultado = await listarClientePaginado(1);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      {/* Container de leitura */}
      <div className="w-full max-w-6xl flex flex-col gap-10 py-10">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">Clientes</h1>
          <p className="text-sm text-gray-700">
            Lista de clientes cadastrados no sistema.
          </p>
        </div>

        {/* Linha de separação */}
        <div className="h-px bg-gray-200" />

        {/* Tabela */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="hidden sm:table-header-group">
              <tr className="border-b border-gray-300">
                <th className="py-3 text-left text-[10px] uppercase tracking-widest text-gray-700">
                  Cliente
                </th>
                <th className="py-3 text-center text-[10px] uppercase tracking-widest text-gray-700">
                  Tipo
                </th>
                <th className="py-3 text-center text-[10px] uppercase tracking-widest text-gray-700">
                  Documento
                </th>
                <th className="py-3 text-center text-[10px] uppercase tracking-widest text-gray-700">
                  Status
                </th>
                <th className="py-3 text-right text-[10px] uppercase tracking-widest text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {resultado.data.map((cliente: Client) => (
                <tr
                  key={cliente.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  {/* Cliente */}
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium text-sm">
                        {cliente.name}
                      </span>
                      <span className="text-gray-700 text-xs">
                        {cliente.email}
                      </span>
                    </div>
                  </td>

                  {/* Tipo */}
                  <td className="py-4 text-center text-sm text-gray-700">
                    {cliente.tipo}
                  </td>

                  {/* Documento */}
                  <td className="py-4 text-center font-mono text-xs text-gray-700">
                    {cliente.documento}
                  </td>

                  {/* Status */}
                  <td className="py-4 text-center">
                    <span
                      className={`text-xs font-semibold ${
                        cliente.isActive ? 'text-[#169545]' : 'text-red-500'
                      }`}
                    >
                      {cliente.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>

                  {/* Ações */}
                  <td className="py-4 text-right">
                    <div className="inline-flex gap-4">
                      <Link
                        href={`/client/editar/${cliente.id}`}
                        className="text-sm font-medium text-[#169545] hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteForm idCliente={cliente.id} />
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
            className="text-xs uppercase tracking-widest text-gray-700 hover:text-[#169545]"
          >
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
