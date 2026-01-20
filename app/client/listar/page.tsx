import { listarClientePaginado } from "../../actions/client";

export default function ListarClientes() {
  const clientesFake = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      tipo: "FISICA",
      documento: "123.456.789-00",
      isActive: true,
    },
    {
      id: 2,
      name: "Empresa XPTO",
      email: "contato@xpto.com",
      tipo: "JURIDICA",
      documento: "12.345.678/0001-99",
      isActive: false,
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gray-50 py-12 px-6 gap-2">
      <img className="w-xl" src="/logo.png" alt="" />

      <div className="w-full mb-12 max-w-6xl bg-white shadow-2xl rounded-md border border-[#169545] overflow-hidden my-auto">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#169545] text-white">
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Cliente
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Tipo
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Documento
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Status
                </th>
                <th className="p-4 font-semibold uppercase text-[10px] tracking-widest text-center">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {clientesFake.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-center">
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-bold text-sm">
                        {cliente.name}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        {cliente.email}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-block px-2 py-0.5 text-[9px] font-black rounded-sm bg-gray-200 text-gray-600">
                      {cliente.tipo}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 font-mono text-xs text-center">
                    {cliente.documento}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`text-[10px] font-black ${cliente.isActive ? "text-[#169545]" : "text-red-500"}`}
                    >
                      {cliente.isActive ? "ATIVO" : "INATIVO"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <a
                        href="#"
                        className="text-[#169545] hover:scale-110 transition-transform text-[11px] font-bold underline"
                      >
                        EDITAR
                      </a>
                      <a
                        href="#"
                        className="text-red-500 hover:scale-110 transition-transform text-[11px] font-bold underline"
                      >
                        EXCLUIR
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
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

const resultado = await listarClientePaginado(1);

console.log("os clientes estão aqui " + resultado.data[0].name); // 10 clientes
