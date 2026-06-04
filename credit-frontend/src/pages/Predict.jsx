import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowDownToLine, FileText, Play, ShieldCheck, UserRound, Zap } from 'lucide-react'
import PredictionCard from '../components/PredictionCard'
import usePredictions from '../hooks/usePredictions'

export default function Predict() {
  const location = useLocation()
  const selectedApplication = location.state?.application ?? null
  const selectedCustomer = location.state?.customer ?? null
  const applicationId = selectedApplication?.id
  const customerName = useMemo(() => getCustomerName(selectedCustomer), [selectedCustomer])
  const [prediction, setPrediction] = useState(null)
  const { loading, error, run, fetchForApplication } = usePredictions()

  const handleRun = async () => {
    if (!applicationId) return
    try {
      const result = await run(applicationId)
      setPrediction(result)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFetch = async () => {
    if (!applicationId) return
    try {
      const list = await fetchForApplication(applicationId)
      setPrediction(list[0] ?? null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:bg-sky-950/50 dark:text-sky-200">
              <Zap size={14} />
              Prediction lab
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Run a credit risk prediction</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Use a selected application from the application workflow. The internal application identifier is carried silently.
            </p>
          </div>
          <Link to="/applications" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            <FileText size={16} />
            Choose Application
          </Link>
        </div>
      </section>

      {!applicationId ? (
        <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <FileText size={22} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">Choose an application first</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Predictions need an application behind the scenes. Start from a customer, create or select an application, then run the model here.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <Link to="/customers" className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition hover:bg-indigo-500">
              Go to Customers
            </Link>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
            <div className="border-b border-slate-200 p-5 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-950 dark:text-white">Selected application</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Ready to run against the backend prediction service.</p>
            </div>

            <div className="p-5">
              <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40 sm:grid-cols-3">
                <Summary label="Customer" value={customerName || 'Selected customer'} icon={<UserRound size={16} />} />
                <Summary label="Loan amount" value={formatCurrency(selectedApplication.loanAmount)} icon={<FileText size={16} />} />
                <Summary label="Status" value={selectedApplication.status || 'SUBMITTED'} icon={<ShieldCheck size={16} />} />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:flex">
                <button
                  onClick={handleRun}
                  disabled={loading}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white shadow-sm shadow-sky-600/25 transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:disabled:bg-slate-700"
                >
                  <Play size={16} />
                  {loading ? 'Running' : 'Run Prediction'}
                </button>
                <button
                  onClick={handleFetch}
                  disabled={loading}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:disabled:text-slate-600"
                >
                  <ArrowDownToLine size={16} />
                  Fetch Latest
                </button>
              </div>

              {error && (
                <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200">
                  Error fetching predictions
                </div>
              )}

              <div className="mt-5">
                {prediction ? (
                  <PredictionCard prediction={prediction} />
                ) : (
                  <div className="flex min-h-44 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white px-4 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                    No prediction result yet.
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">
              <ShieldCheck size={21} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">Clean ID Flow</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <ChecklistItem label="Customer selected by name." />
              <ChecklistItem label="Application carried internally." />
              <ChecklistItem label="Prediction runs without manual ID entry." />
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

function Summary({ label, value, icon }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">{value || '-'}</div>
    </div>
  )
}

function ChecklistItem({ label }) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500"></span>
      <span>{label}</span>
    </div>
  )
}

function getCustomerName(customer) {
  if (!customer) return ''
  return [customer.firstName, customer.lastName].filter(Boolean).join(' ') || customer.email || 'Selected customer'
}

function formatCurrency(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return '-'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(numeric)
}
