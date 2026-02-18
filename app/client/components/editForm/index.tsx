"use client";

import { updateCliente } from "@/app/actions/client";
import { Client } from "@/app/types/ClientTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type FormEditarProps = {
  client: Client;
};

export function FormEditar({ client }: FormEditarProps) {
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [tipo, setTipo] = useState<Client["tipo"]>(client.tipo);
  const [documento, setDocumento] = useState(client.documento);
  const router = useRouter();

  async function handleEditar(e: React.FormEvent) {
    e.preventDefault();

    const clientAtualizado: Client = {
      ...client,
      name,
      email,
      tipo,
      documento,
      updatedAt: new Date(),
    };

    try {
      await updateCliente(clientAtualizado)
      toast.success("Usuário atualizado com sucesso!");
      router.push("/client/listar");
    } catch (error: any) {

      if(error.message === "DADOS_INVALIDOS") {
        toast.error("Preencha todos os campos!")
      }else if(error.message === "ERRO_AO_ATUALIZAR_CLIENTE") {
        toast.error("Verifique os campos e tente novamente!")
      }else {
        toast.error("erro inesperado, tente novamente mais tarde!")
      }

    }
   

  }

  return (
    <form
      onSubmit={handleEditar}
      className="
        w-full max-w-[92vw] sm:max-w-2xl mx-auto
        flex flex-col
        gap-12 sm:gap-16
        px-3 sm:px-6
        py-10 sm:py-16
      "
    >
      <input type="hidden" value={client.id} />

      <div className="w-full max-w-md mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Editar cliente
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Atualize as informações do cliente abaixo.
          </p>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-10 sm:gap-14">
          <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Nome
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                bg-transparent
                border-b border-gray-300
                py-2 sm:py-2.5
                text-base
                focus:outline-none
                focus:border-[#169545]
                transition-colors
              "
            />
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                bg-transparent
                border-b border-gray-300
                py-2 sm:py-2.5
                text-base
                focus:outline-none
                focus:border-[#169545]
                transition-colors
              "
            />
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Tipo de pessoa
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as Client["tipo"])}
              className="
                bg-transparent
                border-b border-gray-300
                py-2 sm:py-2.5
                text-base
                focus:outline-none
                focus:border-[#169545]
                transition-colors
              "
            >
              <option value="FISICA">Física</option>
              <option value="JURIDICA">Jurídica</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Documento
            </label>
            <input
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="
                bg-transparent
                border-b border-gray-300
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
