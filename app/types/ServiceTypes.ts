
export type TipoServico =
  | "DESENVOLVIMENTO"
  | "MANUTENCAO"
  | "SUPORTE"
  | "CONSULTORIA"
  | "HOSPEDAGEM";

export type Service = {
  id: string;
  name: string;
  descricao: string;
  tipo: TipoServico;
  price: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

