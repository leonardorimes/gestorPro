import Link from 'next/link';
import { MetricCard } from './_components/MetricCard';
import {
  CanceledServices,
  CompletedServices,
  InProgressServices,
  OpenServices,
  TicketServices,
  totalMonthlyRevenue,
  totalValueServices,
} from './actions/service';

import {
  TotalActiveClients,
  TotalClients,
  TotalPFClients,
  TotalPJClients,
} from './actions/client';
import { getCurrentUser } from '@/lib/auth-server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Dashboard() {

  const user = await getCurrentUser().catch(() => null)
  try {
    await getCurrentUser()
    
  } catch (error) {
    redirect("/login")
  }

    async function logout() {
    "use server";

    const cookieStore = await cookies();
    cookieStore.delete("session_token");

    redirect("/login");
  }

  const totalOpenServices = await handleTotalOpenServices();
  const totalInprogressServices = await InProgressServices();
  const totalCompletedServices = await CompletedServices();
  const totalCanceledServices = await CanceledServices();


  const totalClients = await TotalClients();
  const totalActiveClients = await TotalActiveClients();
  const totalPFClients = await TotalPFClients();
  const totalPJClients = await TotalPJClients();

  const totalValue = (await totalValueServices())._sum?.servicePrice ?? 0;
  const avgValue = (await TicketServices())._avg.servicePrice?? 0;
  const monthTotal = (await totalMonthlyRevenue())._sum.servicePrice??0;

 

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Header fixo */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between ">
          <h1 className="text-2xl font-bold text-[#169545]">GESTORPRO</h1>
                    <div className="flex items-center gap-6">
            <span className="text-sm text-gray-600 hidden sm:block">
              Olá, {user ? user.username: ""}
            </span>

            <form action={logout}>
              <button
                type="submit"
                className="
                  px-4 py-2
                  text-sm font-semibold
                  text-white
                  bg-red-500
                  rounded-lg
                  hover:bg-red-600
                  transition-colors
                  cursor-pointer
                "
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex flex-col gap-8">
          {/* Título da página */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Dashboard
            </h2>
            <p className="text-sm text-gray-600">
              Visão geral do sistema e ações rápidas.
            </p>
          </div>

          {/* AÇÕES */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ações rápidas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ActionCard
                title="Clientes"
                description="Gerencie seus clientes"
                actions={[
                  {
                    label: 'Criar cliente',
                    href: '/client',
                    primary: true,
                  },
                  { label: 'Listar clientes', href: '/client/listar' },
                ]}
              />

              <ActionCard
                title="Serviços"
                description="Catálogo de serviços"
                actions={[
                  {
                    label: 'Criar serviço',
                    href: '/service',
                    primary: true,
                  },
                  { label: 'Listar serviços', href: '/service/listar' },
                ]}
              />

              <ActionCard
                title="Ordens de serviço"
                description="Controle operacional"
                actions={[
                  {
                    label: 'Criar ordem',
                    href: '/serviceorder',
                    primary: true,
                  },
                  { label: 'Listar ordens', href: '/serviceorder/listar' },
                ]}
              />
            </div>
          </div>

          {/* ORDENS DE SERVIÇO */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ordens de serviço
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                label="Em aberto"
                value={(totalOpenServices || 0).toString() }
                subtitle="OPEN"
                color="blue"
              />
              <MetricCard
                label="Em andamento"
                value={(totalInprogressServices || 0).toString()}
                subtitle="IN_PROGRESS"
                color="yellow"
              />
              <MetricCard
                label="Finalizadas"
                value={(totalCompletedServices || 0).toString()}
                subtitle="COMPLETED"
                color="green"
              />
              <MetricCard
                label="Canceladas"
                value={(totalCanceledServices || 0).toString()}
                subtitle="CANCELED"
                color="red"
              />
            </div>
          </div>

          {/* CLIENTES */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Clientes
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cards de métricas */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <MetricCard
                  label="Clientes totais"
                  value={(totalClients || 0).toString()}
                  subtitle="Cadastrados"
                  color="purple"
                />
                <MetricCard
                  label="Clientes ativos"
                  value={(totalActiveClients || 0).toString()}
                  subtitle="Ativos"
                  color="green"
                />
                <MetricCard
                  label="Pessoa física"
                  value={(totalPFClients || 0).toString()}
                  subtitle="PF"
                  color="blue"
                />
                <MetricCard
                  label="Pessoa jurídica"
                  value={(totalPJClients || 0).toString()}
                  subtitle="PJ"
                  color="indigo"
                />
              </div>

              {/* Gráfico de pizza */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col">
                <h4 className="text-base font-semibold text-gray-900 mb-6">
                  Distribuição por tipo
                </h4>
                <div className="flex-1 flex items-center justify-center">
                  <PieChart pf={totalPFClients} pj={totalPJClients} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-[#169545]"></div>
                      <span className="text-xs font-medium text-gray-600">
                        Pessoa Física
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalPFClients}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(totalPFClients / (totalPJClients + totalPFClients)) *
                        100}
                      %
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-medium text-gray-600">
                        Pessoa Jurídica
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalPJClients}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {' '}
                      {(totalPJClients / (totalPJClients + totalPFClients)) *
                        100}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FINANCEIRO */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Financeiro
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                label="Faturamento total"
                value={(totalValue?? 0).toLocaleString('pt-BR', {
                  style: "currency",
                  currency: 'BRL'
                })}
                subtitle="Concluídas"
                color="green"
              />
              <MetricCard
                label="Faturamento do mês"
                value={(monthTotal ?? 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
                subtitle="Mês atual"
                color="emerald"
                highlight
              />
              <MetricCard
                label="Ticket médio"
                value={(avgValue ?? 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
                subtitle="Por ordem"
                color="teal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTES ---------- */

function ActionCard({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions: { label: string; href: string; primary?: boolean }[];
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`
              px-5 py-3 rounded-xl text-sm font-semibold text-center
              transition-all
              ${
                action.primary
                  ? 'bg-[#169545] text-white hover:bg-[#147a3a] shadow-sm'
                  : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }
            `}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function PieChart({ pf, pj }: { pf: number; pj: number }) {
  const total = pf + pj;
  const pfPercentage = (pf / total) * 100;
  const pfAngle = (pfPercentage / 100) * 360;

  // Calcular o path do arco para PF
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  const startAngle = -90; // Começa no topo
  const endAngle = startAngle + pfAngle;

  const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

  const largeArcFlag = pfAngle > 180 ? 1 : 0;

  const pfPath = [
    `M ${centerX} ${centerY}`,
    `L ${startX} ${startY}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
    'Z',
  ].join(' ');

  // Path para PJ (resto do círculo)
  const pjStartX = endX;
  const pjStartY = endY;
  const pjEndX = startX;
  const pjEndY = startY;
  const pjAngle = 360 - pfAngle;
  const pjLargeArcFlag = pjAngle > 180 ? 1 : 0;

  const pjPath = [
    `M ${centerX} ${centerY}`,
    `L ${pjStartX} ${pjStartY}`,
    `A ${radius} ${radius} 0 ${pjLargeArcFlag} 1 ${pjEndX} ${pjEndY}`,
    'Z',
  ].join(' ');

  return (
    <div className="relative w-52 h-52">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* PF slice */}
        <path
          d={pfPath}
          fill="#169545"
          className="transition-all duration-300 hover:opacity-80 cursor-pointer"
        />
        {/* PJ slice */}
        <path
          d={pjPath}
          fill="#3b82f6"
          className="transition-all duration-300 hover:opacity-80 cursor-pointer"
        />
        {/* Centro branco */}
        <circle cx={centerX} cy={centerY} r="50" fill="white" />
        {/* Texto central */}
        <text
          x={centerX}
          y={centerY - 8}
          textAnchor="middle"
          className="text-3xl font-bold fill-gray-900"
        >
          {total}
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          className="text-sm fill-gray-600 font-medium"
        >
          Total
        </text>
      </svg>
    </div>
  );
}

async function handleTotalOpenServices() {
  const totalOpenServices = await OpenServices();
  return totalOpenServices;
}
