export type TipoPessoa = 'FISICA' | 'JURIDICA';

export type Client = {
  id: string;
  name: string;
  email: string;
  tipo: TipoPessoa;
  documento: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
