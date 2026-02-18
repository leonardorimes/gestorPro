"use client";
import { useRouter } from "next/navigation";
type DeleteFormProps = {
  idService: string;
};

import { toast } from "sonner";
import { deleteService } from "@/app/actions/service";

export function DeleteForm({ idService }: DeleteFormProps) {
  const router = useRouter();

  function handleDelete() {
    try {
      deleteService(idService);
      toast.success("O Serviço foi deletado com sucesso!");
      router.refresh();
    } catch (error: any) {
      if(error.message === "SERVICO_NAO_ENCONTRADO"){
        toast.error("Erro em encontrar o serviço a ser deletado!")
      }else {

        toast.error("Erro em deletar o serviço!");
      }


    }
  }

  return (
    <form action={handleDelete}>
      <input type="hidden" name="id" value={idService} />
      <button
        type="submit"
        className="text-red-500 cursor hover:scale-110 transition-transform text-[11px] font-bold underline bg-transparent border-none cursor-pointer"
      >
        EXCLUIR
      </button>
    </form>
  );
}
