"use client";

import { toast } from "sonner";
import { registerUser } from "../actions/auth";
import { useRouter } from "next/navigation";

export default function EntrarForm() {
  const router = useRouter();

  async function handleEntrar(formData: FormData) {
    try {
      const result = await registerUser(formData);

      if (result) {
        toast.success("Usuário criado com sucesso!");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error("Erro ao cadastrar usuário");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        action={handleEntrar}
        className="
          w-full max-w-[92vw] sm:max-w-md
          flex flex-col
          gap-16
          px-6
          py-16
        "
      >
        {/* Cabeçalho */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            Criar conta
          </h1>
          <p className="text-sm text-gray-500">
            Preencha os dados para se cadastrar.
          </p>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-14">
          
          {/* Email */}
          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Email
            </label>
            <input
              name="email"
              type="text"
              className="
                bg-transparent
                border-b border-gray-300
                py-2.5
                text-base
                focus:outline-none
                focus:border-[#169545]
                transition-colors
              "
            />
          </div>

          {/* Usuário */}
          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Usuário
            </label>
            <input
              name="user"
              type="text"
              className="
                bg-transparent
                border-b border-gray-300
                py-2.5
                text-base
                focus:outline-none
                focus:border-[#169545]
                transition-colors
              "
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Senha
            </label>
            <input
              name="password"
              type="password"
              className="
                bg-transparent
                border-b border-gray-300
                py-2.5
                text-base
                focus:outline-none
                focus:border-[#169545]
                transition-colors
              "
            />
          </div>
        </div>

        {/* Botão */}
        <div className="pt-6">
          <button
            type="submit"
            className="
              w-full
              bg-[#169545]
              text-white
              py-3
              text-sm font-semibold
              rounded-md
              hover:bg-[#0f7a37]
              transition-colors
            "
          >
            Criar conta →
          </button>
        </div>
      </form>
    </div>
  );
}