export default function PageClient({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <h1>Preencha as informações abaixo para atualizar o Cliente</h1>
    </div>
  );
}
