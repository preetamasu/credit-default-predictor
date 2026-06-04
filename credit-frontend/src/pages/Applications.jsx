import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, FileText, RefreshCw, UserRound } from 'lucide-react'
import ApplicationForm from '../components/ApplicationForm'
import useApplications from '../hooks/useApplications'

export default function Applications() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedCustomer = location.state?.customer ?? null
  const { data: applications, loading, error, fetchByCustomer, create } = useApplications()

  const customerId = selectedCustomer?.id
  const displayName = useMemo(() => customerName(selectedCustomer), [selectedCustomer])

  useEffect(() => {
    if (customerId) fetchByCustomer(customerId)
  }, [customerId, fetchByCustomer])

  const handleCreate = async (payload) => {
    const application = await create(payload)
    navigate('/predict', { state: { application, customer: selectedCustomer } })
  }

  const runPrediction = (application) => {
    navigate('/predict', { state: { application, customer: selectedCustomer } })
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-200">
              <FileText size={14} />
              Applications
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Loan applications</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Create and review applications for a selected customer. Internal identifiers stay out of the workflow.
            </p>
          </div>
          <Link to="/customers" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            <UserRound size={16} />
            Choose Customer
          </Link>
        </div>
      </section>

      {!selectedCustomer ? (
        <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <UserRound size={22} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">Choose a customer first</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Applications need a customer behind the scenes, but users should select by name instead of typing an ID.
          </p>
          <Link to="/customers" className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition hover:bg-indigo-500">
            Go to Customers
          </Link>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
            <div className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-950 dark:text-white">Applications for {displayName}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Select an application to continue to prediction.</p>
              </div>
              <button onClick={() => fetchByCustomer(customerId)} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                <RefreshCw size={15} />
                Refresh
              </button>
            </div>

            {loading ? (
              <StateMessage label="Loading applications..." />
            ) : error ? (
              <StateMessage label="Error loading applications" action={<button onClick={() => fetchByCustomer(customerId)} className="font-semibold text-indigo-600 hover:underline">Retry</button>} tone="rose" />
            ) : applications.length === 0 ? (
              <StateMessage label="No applications yet" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <tr>
                      <th className="px-5 py-3 text-left font-semibold">Customer</th>
                      <th className="px-5 py-3 text-left font-semibold">Amount</th>
                      <th className="px-5 py-3 text-left font-semibold">Status</th>
                      <th className="px-5 py-3 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {applications.map((application) => (
                      <tr key={application.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-950/40">
                        <td className="px-5 py-4 font-medium text-slate-950 dark:text-white">{displayName}</td>
                        <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{formatCurrency(application.loanAmount)}</td>
                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-sky-50 px-2 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950/50 dark:text-sky-200">{application.status || 'SUBMITTED'}</span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button onClick={() => runPrediction(application)} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-sky-600 px-3 text-sm font-semibold text-white shadow-sm shadow-sky-600/25 transition hover:bg-sky-500">
                            Predict
                            <ArrowRight size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">Create application</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">This application will be attached to {displayName}.</p>
            <div className="mt-5">
              <ApplicationForm customerId={customerId} customerName={displayName} onCreate={handleCreate} />
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

function customerName(customer) {
  if (!customer) return ''
  return [customer.firstName, customer.lastName].filter(Boolean).join(' ') || customer.email || 'Selected customer'
}

function formatCurrency(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return '-'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(numeric)
}

function StateMessage({ label, action, tone = 'slate' }) {
  const toneClass = tone === 'rose' ? 'text-rose-600 dark:text-rose-300' : 'text-slate-500 dark:text-slate-400'

  return (
    <div className={`flex min-h-48 items-center justify-center gap-2 p-5 text-sm ${toneClass}`}>
      <span>{label}</span>
      {action}
    </div>
  )
}
