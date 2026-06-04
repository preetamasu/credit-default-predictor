import { useState } from 'react'

export default function CustomerForm({ onCreate }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', DOB: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!form.firstName) nextErrors.firstName = 'Required'
    if (!form.lastName) nextErrors.lastName = 'Required'
    if (!form.email) nextErrors.email = 'Required'
    return nextErrors
  }

  const handleChange = (key) => (event) => setForm({ ...form, [key]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setSubmitting(true)
    try {
      await onCreate?.({ ...form, status: 'ACTIVE' })
      setForm({ firstName: '', lastName: '', email: '', phoneNumber: '', DOB: '' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="First name" value={form.firstName} onChange={handleChange('firstName')} error={errors.firstName} />
        <Field label="Last name" value={form.lastName} onChange={handleChange('lastName')} error={errors.lastName} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Email" value={form.email} onChange={handleChange('email')} error={errors.email} />
        <Field label="Phone" value={form.phoneNumber} onChange={handleChange('phoneNumber')} />
      </div>

      <Field label="Date of birth" type="date" value={form.DOB} onChange={handleChange('DOB')} className="sm:max-w-52" />

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-10 items-center justify-center rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white shadow-sm shadow-sky-600/25 transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
      >
        {submitting ? 'Creating...' : 'Create Customer'}
      </button>
    </form>
  )
}

function Field({ label, error, className = '', type = 'text', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <input
        type={type}
        className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-950"
        {...props}
      />
      {error && <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span>}
    </label>
  )
}
