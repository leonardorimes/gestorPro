import {FormCriar} from "@/app/service/components/createForm";


export default function createService() {

  return(
  <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
    <h1>Preencha as informações abaixo para criar o Serviço: </h1>
      <FormCriar />

  </div>

  )

}
