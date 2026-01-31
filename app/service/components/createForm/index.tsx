'use client';

import { registerCLient } from '@/app/actions/client';
import { Client } from '@/app/client/listar/page';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function FormCriar() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState<Client['tipo']>('FISICA');
  const [documento, setDocumento] = useState('');
  const router = useRouter();

  async function handleCriar(e: React.FormEvent) {
    e.preventDefault();

    const clientCriado: Client = {
      id: '1',
      name,
      email,
      tipo,
      isActive: true,
      documento,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    if (await registerCLient(clientCriado)) {
      toast.success('Usuário atualizado com sucesso!');
      router.push('/client/listar');
    } else {
      toast.error('Error tente novamente');
    }
  }

  return (
    <form onSubmit={handleCriar} className="flex flex-col items-center gap-16">
      <label>
        Nome do serviço
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Descrição
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label>
        Tipo do serviço:
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as Client['tipo'])}
        >
          <option value="FISICA">FISICA</option>
          <option value="JURIDICA">JURIDICA</option>
        </select>
      </label>

      <label>
        preço
        <input
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
        />
      </label>

      <button type="submit">Salvar</button>
    </form>
  );
}
