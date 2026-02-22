"use client";

import { toast } from "sonner";
import { loginUser } from "../actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  async function handleLogin(formData: FormData) {
    try {
      const result = await loginUser(formData);

      if (result) {
        toast.success("Login realizado com sucesso!");
        router.push("/");
      }
    } catch {
      toast.error("Email ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        action={handleLogin}
        className="w-full max-w-md flex flex-col gap-16 px-6 py-16"
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            Entrar
          </h1>
          <p className="text-sm text-gray-600">
            Acesse sua conta para continuar.
          </p>
        </div>

        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase tracking-widest text-gray-500">
              Email
            </label>
            <input
              name="email"
              type="text"
              className="bg-transparent border-b border-gray-400 py-2.5 text-base focus:outline-none focus:border-[#169545] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase tracking-widest text-gray-500">
              Senha
            </label>
            <input
              name="password"
              type="password"
              className="bg-transparent border-b border-gray-400 py-2.5 text-base focus:outline-none focus:border-[#169545] transition-colors"
            />
          </div>
        </div>

        <div className="pt-6 flex flex-col gap-4">
          <button
            type="submit"
            className="w-full bg-[#169545] text-white py-3 text-sm font-semibold rounded-md hover:bg-[#0f7a37] transition-colors"
          >
            Entrar →
          </button>

          {/* Link para cadastro */}
          <p className="text-sm text-center text-gray-600">
            Não tem uma conta?{" "}
            <Link
              href="/entrar"
              className="text-[#169545] font-semibold hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}