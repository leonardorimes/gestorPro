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
    } catch (error) {
      toast.error(`${error}`);
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
