"use client";
import { useRouter } from "next/navigation";
type DeleteFormProps = {
  idCliente: string;
};

import { deleteCliente } from "@/app/actions/client";
import { toast } from "sonner";

export function DeleteForm({ idCliente }: DeleteFormProps) {
  const router = useRouter();

  function handleDelete() {
    try {
      deleteCliente(idCliente);
      toast.success("O cliente foi deletado com sucesso!");
      router.refresh();
    } catch (error: any) {
      if(error.message === "CLIENTE_NAO_ENCONTRADO"){
        toast.error("O cliente não existe")
      }else if(error.message === "ERRO_AO_EXCLUIR_CLIENTE"){
        toast.error("Erro ao excluir, tente novamente mais tarde!")
      }else{
        toast.error("Ocorreu um erro inesperado, tente novamente mais tarde!")
      }
    }
  }

  return (
    <form action={handleDelete}>
      <input type="hidden" name="id" value={idCliente} />
      <button
        type="submit"
        className="text-red-500 cursor hover:scale-110 transition-transform text-[11px] font-bold underline bg-transparent border-none cursor-pointer"
      >
        EXCLUIR
      </button>
    </form>
  );
}
