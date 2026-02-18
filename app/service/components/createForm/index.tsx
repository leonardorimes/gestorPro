'use client';

import { registerService } from '@/app/actions/service';
import { Service, TipoServico } from '@/app/types/ServiceTypes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function FormCriar() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tipo, setTipo] = useState<TipoServico>('DESENVOLVIMENTO');
  const [preco, setPreco] = useState('');
  const router = useRouter();

  async function handleCriar(e: React.FormEvent) {
    e.preventDefault();

    const ServiceCriado: Service = {
      id: '',
      name,
      description,
      service_type: tipo,
      is_active: true,
      price: Number(preco),
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    try {
      if (await registerService(ServiceCriado)) {
        toast.success('Serviço criado com sucesso!');
        router.push('/service/listar');
      }
    } catch (error: any) {
      if(error.message === "DADOS_INVALIDOS") {
        toast.error("Prrencha todos os campos do formulário!")
      }else {
        toast.error("Erro ao criar o serviço!, tente novamente!")
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
        px-3 sm:px-6
        py-10 sm:py-16
      "
    >
      <div className="w-full max-w-md mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Novo serviço
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Cadastre um novo serviço disponível no sistema.
          </p>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {/* Nome */}
          <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Nome do serviço
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Desenvolvimento de site"
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

          {/* Descrição */}
          <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Descrição
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição breve do serviço"
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

          {/* Tipo */}
          <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Tipo do serviço
            </label>
            <select
              value={tipo}
              onChange={(e) =>
                setTipo(e.target.value as Service['service_type'])
              }
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
              <option value="DESENVOLVIMENTO">Desenvolvimento</option>
              <option value="MANUTENCAO">Manutenção Corretiva</option>
              <option value="SUPORTE">Suporte Técnico</option>
              <option value="CONSULTORIA">Consultoria</option>
              <option value="HOSPEDAGEM">Hospedagem / Cloud</option>
            </select>
          </div>

          {/* Preço */}
          <div className="flex flex-col gap-2 sm:gap-3 pl-3 sm:pl-0">
            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Preço
            </label>
            <input
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="0,00"
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
            Salvar serviço →
          </button>
        </div>
      </div>
    </form>
  );
}
