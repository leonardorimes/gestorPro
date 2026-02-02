"use client";


import FormCriar from "@/app/client/components/createForm";

export default function PageClient() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <h1>Preencha as informações abaixo para criar o Cliente</h1>
      <FormCriar />
    </div>
  );
}
