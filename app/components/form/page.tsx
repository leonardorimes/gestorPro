import { Client } from '@/app/client/listar/page';

type FormAction = (formData: FormData) => void | Promise<void>;

export type FormProps = {
  action: FormAction;
  client?: Client | null;
};

export function Form({ action, client }: FormProps) {
  return (
    <form className="flex flex-col items-center gap-16  " action={action}>
      <img className="w-xl" src="./logo.png" alt="" />
      {/* ID oculto (só existe na edição) */}
      {client?.id && <input type="hidden" name="id" value={client.id} />}
      <label className="flex items-center gap-4">
        Nome:
        <input
          type="text"
          className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
          name="clientName"
          defaultValue={client?.name ?? ''}
        />
      </label>
      <label className="flex items-center gap-4">
        email:
        <input
          type="text"
          className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
          name="email"
          defaultValue={client?.email ?? ''}
        />
      </label>
      <label className="flex items-center gap-4">
        Pessoa Física ou Jurídica?
        <select name="pessoa" defaultValue={client?.tipo ?? 'FISICA'}>
          <option value="FISICA">FISICA</option>
          <option value="JURIDICA">JURIDICA</option>
        </select>
      </label>
      <label className="flex items-center gap-4">
        Documento
        <input
          type="text"
          className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
          name="documento"
          defaultValue={client?.documento ?? ''}
        />
      </label>
      <input
        type="submit"
        className="bg-[#169545] w-52  text-amber-50 p-8 h-10 cursor-pointer rounded-md hover:bg-[#033816] transition-colors duration-300"
      />
    </form>
  );
}
