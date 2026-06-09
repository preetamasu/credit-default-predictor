import { useState } from 'react'

const emptyForm = {
  loanAmount: '',
  annualIncome: '',
  employmentStatus: 'EMPLOYED',
  employmentLengthStatus: '',
  creditScore: '',
  debtToIncomeRatio: '',
  loanPurpose: 'PERSONAL',
  requestedTermMonths: '',
}

export default function ApplicationForm({ customerId, customerName, onCreate }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (key) => (event) => setForm({ ...form, [key]: event.target.value })

  const validate = () => {
    const nextErrors = {}
    if (!customerId) nextErrors.customer = 'Choose a customer first'
    if (!form.loanAmount) nextErrors.loanAmount = 'Loan amount required'
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const payload = {
      ...form,
      customerId,
      loanAmount: Number(form.loanAmount || 0),
      annualIncome: Number(form.annualIncome || 0),
      employmentLengthStatus: Number(form.employmentLengthStatus || 0),
      creditScore: Number(form.creditScore || 0),
      debtToIncomeRatio: Number(form.debtToIncomeRatio || 0),
      requestedTermMonths: Number(form.requestedTermMonths || 0),
      status: 'SUBMITTED',
    }

    setSubmitting(true)
    try {
      await onCreate?.(payload)
      setForm(emptyForm)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-950/40">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Customer</div>
        <div className="mt-1 font-medium text-slate-900 dark:text-white">{customerName || 'Choose a customer first'}</div>
        {errors.customer && <div className="mt-1 text-xs font-medium text-rose-600">{errors.customer}</div>}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Loan amount" value={form.loanAmount} onChange={handleChange('loanAmount')} error={errors.loanAmount} />
        <Field label="Annual income" value={form.annualIncome} onChange={handleChange('annualIncome')} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Employment status</span>
          <select value={form.employmentStatus} onChange={handleChange('employmentStatus')} className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-950">
            <option>EMPLOYED</option>
            <option>SELF_EMPLOYED</option>
            <option>UNEMPLOYED</option>
            <option>STUDENT</option>
            <option>RETIRED</option>
          </select>
        </label>
        <Field label="Employment length (months)" value={form.employmentLengthStatus} onChange={handleChange('employmentLengthStatus')} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Credit score" value={form.creditScore} onChange={handleChange('creditScore')} />
        <Field label="Debt to income ratio" value={form.debtToIncomeRatio} onChange={handleChange('debtToIncomeRatio')} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Loan purpose</span>
          <select value={form.loanPurpose} onChange={handleChange('loanPurpose')} className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-950">
            <option>PERSONAL</option>
            <option>EDUCATION</option>
            <option>MEDICAL</option>
            <option>HOME_IMPROVEMENT</option>
            <option>DEBT_CONSOLIDATION</option>
            <option>AUTO</option>
            <option>BUSINESS</option>
          </select>
        </label>
        <Field label="Requested term (months)" value={form.requestedTermMonths} onChange={handleChange('requestedTermMonths')} />
      </div>

      <button
        type="submit"
        disabled={submitting || !customerId}
        className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
      >
        {submitting ? 'Creating...' : 'Create Application'}
      </button>
    </form>
  )
}

function Field({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <input
        className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-950"
        {...props}
      />
      {error && <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span>}
    </label>
  )
}
