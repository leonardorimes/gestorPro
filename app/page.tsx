import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-7xl flex flex-col gap-16">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Visão geral do sistema e ações rápidas.
          </p>
        </div>

        {/* AÇÕES */}
        <SectionTitle title="Ações rápidas" />
        <Grid cols="lg:grid-cols-3">
          <ActionCard
            title="Clientes"
            description="Gerencie seus clientes"
            actions={[
              { label: "Criar cliente", href: "/client/criar", primary: true },
              { label: "Listar clientes", href: "/client/listar" },
            ]}
          />

          <ActionCard
            title="Serviços"
            description="Catálogo de serviços"
            actions={[
              { label: "Criar serviço", href: "/service/criar", primary: true },
              { label: "Listar serviços", href: "/service/listar" },
            ]}
          />

          <ActionCard
            title="Ordens de serviço"
            description="Controle operacional"
            actions={[
              { label: "Criar ordem", href: "/serviceorder/criar", primary: true },
              { label: "Listar ordens", href: "/serviceorder/listar" },
            ]}
          />
        </Grid>

        {/* ORDENS */}
        <SectionTitle title="Ordens de serviço" />
        <Grid>
          <KpiCard title="Em aberto" value="12" description="OPEN" highlight />
          <KpiCard title="Em andamento" value="7" description="IN_PROGRESS" />
          <KpiCard title="Finalizadas" value="34" description="COMPLETED" />
          <KpiCard title="Canceladas" value="3" description="CANCELED" />
        </Grid>

        {/* CLIENTES */}
        <SectionTitle title="Clientes" />
        <Grid>
          <KpiCard title="Clientes totais" value="58" description="Cadastrados" />
          <KpiCard title="Clientes ativos" value="51" description="Ativos" />
          <KpiCard title="Pessoa física" value="41" description="PF" />
          <KpiCard title="Pessoa jurídica" value="17" description="PJ" />
        </Grid>

        {/* FINANCEIRO */}
        <SectionTitle title="Financeiro" />
        <Grid cols="lg:grid-cols-3">
          <KpiCard title="Faturamento total" value="R$ 124.800" description="Concluídas" />
          <KpiCard
            title="Faturamento do mês"
            value="R$ 18.400"
            description="Mês atual"
            highlight
          />
          <KpiCard title="Ticket médio" value="R$ 3.670" description="Por ordem" />
        </Grid>

        
      </div>
    </div>
  );
}

/* ---------- COMPONENTES ---------- */

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
      {title}
    </h2>
  );
}

function Grid({
  children,
  cols = "lg:grid-cols-4",
}: {
  children: React.ReactNode;
  cols?: string;
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-6`}>
      {children}
    </div>
  );
}

function KpiCard({
  title,
  value,
  description,
  highlight = false,
}: {
  title: string;
  value: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`
        rounded-xl border p-5 flex flex-col gap-2
        ${
          highlight
            ? "border-[#169545] bg-[#169545]/5"
            : "border-gray-200 bg-white"
        }
      `}
    >
      <span className="text-[11px] uppercase tracking-widest text-gray-400">
        {title}
      </span>
      <span className="text-2xl sm:text-3xl font-semibold text-gray-900">
        {value}
      </span>
      <span className="text-sm text-gray-500">
        {description}
      </span>
    </div>
  );
}

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
    <div className="rounded-xl border border-gray-200 bg-white p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`
              px-4 py-3 rounded-lg text-sm font-semibold text-center
              transition-colors
              ${
                action.primary
                  ? "bg-[#169545] text-white hover:opacity-90"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
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