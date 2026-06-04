import { Link, useNavigate } from 'react-router-dom'
import { FileText, RefreshCw, UserPlus } from 'lucide-react'
import CustomerForm from '../components/CustomerForm'
import useCustomers from '../hooks/useCustomers'

export default function Customers() {
  const navigate = useNavigate()
  const { data: customers, loading, error, refresh, create } = useCustomers()

  const openApplications = (customer) => {
    navigate('/applications', { state: { customer } })
  }

  const handleCreate = async (payload) => {
    const customer = await create(payload)
    navigate('/applications', { state: { customer } })
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-200">
              <UserPlus size={14} />
              Customer intake
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Customers</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Create a customer, then continue directly into a loan application without exposing internal IDs.
            </p>
          </div>
          <button onClick={refresh} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">Customer list</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Select a customer to start or view applications.</p>
          </div>
          {loading ? (
            <StateMessage label="Loading customers..." />
          ) : error ? (
            <StateMessage label="Error loading customers" action={<button onClick={refresh} className="font-semibold text-indigo-600 hover:underline">Retry</button>} tone="rose" />
          ) : customers.length === 0 ? (
            <StateMessage label="No customers yet" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">Name</th>
                    <th className="px-5 py-3 text-left font-semibold">Email</th>
                    <th className="px-5 py-3 text-left font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-950/40">
                      <td className="px-5 py-4 font-medium text-slate-950 dark:text-white">{customerName(customer)}</td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{customer.email || '-'}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">{customer.status || 'ACTIVE'}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => openApplications(customer)} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition hover:bg-indigo-500">
                          <FileText size={15} />
                          Applications
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
          <h3 className="text-base font-semibold text-slate-950 dark:text-white">Create customer</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">After creation, the app opens an application form for that customer.</p>
          <div className="mt-5">
            <CustomerForm onCreate={handleCreate} />
          </div>
          <Link to="/applications" className="mt-4 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Go to applications
          </Link>
        </aside>
      </div>
    </div>
  )
}

function customerName(customer) {
  return [customer.firstName, customer.lastName].filter(Boolean).join(' ') || customer.email || 'Customer'
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
