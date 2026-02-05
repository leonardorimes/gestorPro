import { ServiceOrderStatus } from '@prisma/client';
export type TipoServico =
  | 'DESENVOLVIMENTO'
  | 'MANUTENCAO'
  | 'SUPORTE'
  | 'CONSULTORIA'
  | 'HOSPEDAGEM';

export type Service = {
  id: string;
  name: string;
  description: string;
  service_type: TipoServico;
  price: number;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ServiceOrder = {
  id: string;
  customerId: string;
  serviceId: string;
  price: number;
  status: ServiceOrderStatus;
  startedAt: Date;
  finishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
