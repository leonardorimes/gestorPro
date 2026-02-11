export function MetricCard({
  label,
  value,
  subtitle,
  color,
  highlight = false,
}: {
  label: string;
  value: string;
  subtitle: string;
  color: string;
  highlight?: boolean;
}) {
  const colorStyles = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      dot: 'bg-yellow-500',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      dot: 'bg-green-500',
    },
    red: { bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      dot: 'bg-purple-500',
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      dot: 'bg-indigo-500',
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
    teal: { bg: 'bg-teal-50', border: 'border-teal-200', dot: 'bg-teal-500' },
  };

  const colors =
    colorStyles[color as keyof typeof colorStyles] || colorStyles.blue;

  return (
    <div
      className={`
        rounded-2xl shadow-md p-6 flex flex-col gap-4 
        transition-all hover:shadow-lg hover:-translate-y-1
        ${
          highlight
            ? 'border-2 border-[#169545] bg-gradient-to-br from-[#169545]/10 to-white'
            : `border ${colors.border} ${colors.bg}`
        }
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider font-semibold text-gray-600">
          {label}
        </span>
        <div className={`w-3 h-3 rounded-full ${colors.dot}`}></div>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
        <p className="text-sm text-gray-600 font-medium">{subtitle}</p>
      </div>
    </div>
  );
}
