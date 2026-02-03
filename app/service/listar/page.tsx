import { listService } from '@/app/actions/service';
import { Service } from '@/app/types/ServiceTypes';
import Link from 'next/link';
import { DeleteForm } from '../components/deleteForm';

export default async function ListarClientes() {
  const resultado = await listService(1);
  console.log(resultado);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gray-50 py-12 px-6 gap-2">
      <img className="w-xl" src="/logo.png" alt="" />

      <div className="w-full mb-12 max-w-6xl bg-white shadow-2xl rounded-md border border-[#169545] overflow-hidden my-auto">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#169545] text-white">
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Serviço
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Descrição
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Tipo de serviço
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Status
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  preço
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {resultado.data.map((service: Service) => (
                <tr
                  key={service.name}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-center">
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-bold text-sm">
                        {service.name}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        {service.description}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-block px-2 py-0.5 text-[9px] font-black rounded-sm bg-gray-200 text-gray-600">
                      {service.service_type}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 font-mono text-xs text-center">
                    {service.price}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`text-[10px] font-black ${service.is_active ? 'text-[#169545]' : 'text-red-500'}`}
                    >
                      {service.is_active ? 'ATIVO' : 'INATIVO'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <Link
                        href={`/service/editar/${service.id}`}
                        className="text-[#169545] hover:scale-110 transition-transform text-[11px] font-bold underline"
                      >
                        EDITAR
                      </Link>
                      <DeleteForm idService={service.id} />
                    </div>
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <a
        href="#"
        className="mt-auto pt-20 text-gray-400 hover:text-[#169545] text-xs font-semibold uppercase tracking-widest transition-all"
      >
        ← Voltar ao Início
      </a>
    </div>
  );
}

// 10 clientes
