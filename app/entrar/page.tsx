"use client";

import { toast } from "sonner";
import { registerUser } from "../actions/auth";

export default function EntrarForm() {
  async function handleEntrar(formData: FormData) {
    const result = await registerUser(formData);

    try {
      if (result) {
        toast.success("Usuário logado com sucesso!!");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <form
        className="flex flex-col items-center gap-16  "
        action={handleEntrar}
      >
        <img className="w-xl" src="./logo.png" alt="" />
        <label className="flex items-center gap-4">
          Email:
          <input
            id="emailSignup"
            type="text"
            className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
            name="email"
          />
        </label>
        <label className="flex items-center gap-4">
          User:
          <input
            id="userSignup"
            type="text"
            className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
            name="user"
          />
        </label>
        <label className="flex items-center gap-4">
          Senha:
          <input
            id="senhaSignup"
            type="password"
            className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
            name="password"
          />
        </label>
        <input
          type="submit"
          className="bg-[#169545] w-52  text-amber-50 p-8 h-10 cursor-pointer rounded-md hover:bg-[#033816] transition-colors duration-300"
        />
      </form>
    </div>
  );
}
