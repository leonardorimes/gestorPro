type FormAction = (formData: FormData) => void | Promise<void>;
type FormProps = {
  action: FormAction;
};

export function Form({ action }: FormProps) {
  return (
    <form className="flex flex-col items-center gap-16  " action={action}>
      <img className="w-xl" src="./logo.png" alt="" />
      <label className="flex items-center gap-4">
        Nome:
        <input
          type="text"
          className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
          name="clientName"
        />
      </label>
      <label className="flex items-center gap-4">
        email:
        <input
          type="text"
          className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
          name="email"
        />
      </label>
      <label className="flex items-center gap-4">
        Pessoa Física ou Jurídica?
        <select name="pessoa">
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
        />
      </label>
      <input
        type="submit"
        className="bg-[#169545] w-52  text-amber-50 p-8 h-10 cursor-pointer rounded-md hover:bg-[#033816] transition-colors duration-300"
      />
    </form>
  );
}
