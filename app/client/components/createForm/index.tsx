"use client";

import { registerCLient } from "@/app/actions/client";
import { Client } from "@/app/types/ClientTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function FormCriar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState<Client["tipo"]>("FISICA");
  const [documento, setDocumento] = useState("");
  const router = useRouter();

  async function handleCriar(e: React.FormEvent) {
    e.preventDefault();

    const clientCriado: Client = {
      id: "1",
      name,
      email,
      tipo,
      isActive: true,
      documento,
      updatedAt: new Date(),
      createdAt: new Date(),
    };


    try {
       await registerCLient(clientCriado);
        toast.success("Usuário criado com sucesso!");
         router.push("/client/listar");
    } catch (error: any) {
       if (error.message === "CLIENTE_JA_EXISTE") {
      toast.error("Este cliente já está cadastrado.");
    } else if (error.message === "DADOS_INVALIDOS") {
      toast.error("Preencha todos os campos corretamente.");
    } else {
      toast.error("Erro inesperado. Tente novamente.");
    }
  }
    }

  return (
    <form
      onSubmit={handleCriar}
      className="
        w-full max-w-[92vw] sm:max-w-2xl mx-auto
        flex flex-col
        gap-12 sm:gap-16
        px-6 sm:px-6
        py-10 sm:py-16
      "
    >
      <div className="w-full max-w-md mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Novo cliente
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Preencha os dados abaixo para cadastrar um novo cliente no sistema.
          </p>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-10 sm:gap-14">
          <div className="flex flex-col gap-2 sm:gap-3">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Nome
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João da Silva"
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

          <div className="flex flex-col gap-2 sm:gap-3">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
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

          <div className="flex flex-col gap-2 sm:gap-3">
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

          <div className="flex flex-col gap-2 sm:gap-3">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Documento
            </label>
            <input
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="CPF ou CNPJ"
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
        <div className="pt-6 sm:pt-10">
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
            Salvar cliente →
          </button>
        </div>
      </div>
    </form>
  );
}