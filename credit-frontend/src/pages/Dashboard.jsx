import { useNavigate } from 'react-router-dom'
import { Activity, AlertTriangle, FileText, RefreshCw, Users, Zap } from 'lucide-react'
import useDashboard from '../hooks/useDashboard'
import PredictionCard from '../components/PredictionCard'

export default function Dashboard() {
  const navigate = useNavigate()
  const { loading, error, activeCustomers, openApplicationsLast30, recentDefaultsLast7, recentPredictions, refresh } = useDashboard()

  const goCreateCustomer = () => navigate('/customers')
  const goNewApplication = () => navigate('/applications')
  const goRunPrediction = () => navigate('/predict')

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid lg:grid-cols-[1.5fr_1fr]">
          <div className="p-6 sm:p-7">
            <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-200">
              <Activity size={14} />
              Portfolio snapshot
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Credit decisions at a glance</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Monitor application volume, default activity, and the latest model outputs from one focused workspace.
            </p>
          </div>
          <div className="border-t border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/50 lg:border-l lg:border-t-0">
            <div className="text-sm font-semibold text-slate-950 dark:text-white">Next best actions</div>
            <div className="mt-4 grid gap-2">
              <ActionButton onClick={goCreateCustomer} icon={<Users size={16} />} label="Create Customer" primary />
              <ActionButton onClick={goNewApplication} icon={<FileText size={16} />} label="New Application" />
              <ActionButton onClick={goRunPrediction} icon={<Zap size={16} />} label="Run Prediction" />
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card title="Active Customers" value={loading ? '--' : String(activeCustomers)} tone="indigo" subtitle="All time" icon={<Users size={20} />} />
        <Card title="Open Applications" value={loading ? '--' : String(openApplicationsLast30)} tone="rose" subtitle="Last 30 days" icon={<FileText size={20} />} />
        <Card title="Recent Defaults" value={loading ? '--' : String(recentDefaultsLast7)} tone="amber" subtitle="Last 7 days" icon={<AlertTriangle size={20} />} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-950 dark:text-white">Recent Predictions</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Latest model decisions returned by the backend.</p>
            </div>
            <button onClick={refresh} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              <RefreshCw size={15} />
              Refresh
            </button>
          </div>

          <div className="p-5">
            {loading ? (
              <EmptyState label="Loading predictions..." />
            ) : error ? (
              <EmptyState label="Error loading dashboard" tone="rose" />
            ) : recentPredictions.length === 0 ? (
              <EmptyState label="No predictions yet. Connect to backend to view history." />
            ) : (
              <div className="space-y-3">
                {recentPredictions.map((prediction) => (
                  <PredictionCard key={prediction.id} prediction={prediction} />
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h4 className="text-sm font-semibold text-slate-950 dark:text-white">Risk Watch</h4>
          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Recent default activity is tracked over a short window so spikes are easier to notice.
          </p>
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <AlertTriangle size={16} />
              Default signal
            </div>
            <div className="mt-3 text-3xl font-semibold">{loading ? '--' : String(recentDefaultsLast7)}</div>
            <div className="mt-1 text-xs text-amber-800/80 dark:text-amber-200/80">last 7 days</div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Card({ title, value, subtitle, tone = 'indigo', icon }) {
  const toneMap = {
    indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-200',
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-200',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200',
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</div>
          {subtitle && <div className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">{subtitle}</div>}
        </div>
        <div className={`${toneMap[tone]} flex h-11 w-11 shrink-0 items-center justify-center rounded-lg`}>{icon}</div>
      </div>
    </div>
  )
}

function ActionButton({ onClick, icon, label, primary = false }) {
  const className = primary
    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25 hover:bg-indigo-500'
    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'

  return (
    <button onClick={onClick} className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold transition ${className}`}>
      {icon}
      {label}
    </button>
  )
}

function EmptyState({ label, tone = 'slate' }) {
  const toneClass = tone === 'rose' ? 'text-rose-600 dark:text-rose-300' : 'text-slate-500 dark:text-slate-400'

  return (
    <div className={`flex min-h-48 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 text-center text-sm ${toneClass} dark:border-slate-800 dark:bg-slate-950/40`}>
      {label}
    </div>
  )
}
