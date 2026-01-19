"use client";

import { registerCLient } from "../actions/client";

export default function PageClient() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <h1>Preencha as informações abaixo para criar o Cliente</h1>
      <form
        className="flex flex-col items-center gap-16  "
        action={registerCLient}
      >
        <img className="w-xl" src="./logo.png" alt="" />
        <label className="flex items-center gap-4">
          Nome:
          <input
            id="emailSignup"
            type="text"
            className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
            name="clientName"
          />
        </label>
        <label className="flex items-center gap-4">
          email:
          <input
            id="userSignup"
            type="text"
            className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
            name="email"
          />
        </label>
        <label className="flex items-center gap-4">
          password:
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
