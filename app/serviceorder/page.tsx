import FormCriar from './components/createForm/page';

export default function ServiceOrder() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <h1>
        Preencha as informações abaixo para criar uma NOVA ORDEM DE SERVIÇO
      </h1>
      <FormCriar />
    </div>
  );
}
