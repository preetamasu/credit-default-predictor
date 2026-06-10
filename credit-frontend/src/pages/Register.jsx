import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { useAuth } from '../contexts/AuthProvider'

export default function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const { registerUser } = useAuth()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (key) => (event) => setForm({ ...form, [key]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await registerUser(form)
      navigate('/login', { state: { from: location.state?.from }, replace: true })
    } catch (err) {
      setError(getRegisterError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
      <div className="mx-auto max-w-md">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-200">
            <UserPlus size={22} />
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Register</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Create an account before using customer and credit workflows.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="First name" value={form.firstName} onChange={handleChange('firstName')} />
              <Field label="Last name" value={form.lastName} onChange={handleChange('lastName')} />
            </div>
            <Field label="Email" type="email" value={form.email} onChange={handleChange('email')} />
            <Field label="Password" type="password" value={form.password} onChange={handleChange('password')} />

            {error && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200">
                  {error}
                </div>
            )}

            <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white shadow-sm shadow-sky-600/25 transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {submitting ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" state={{ from: location.state?.from }} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </section>
      </div>
  )
}

function getRegisterError(err) {
  if (err?.response?.status === 409) {
    return 'An account with this email may already exist. Try logging in instead.'
  }

  if (err?.response?.status === 400) {
    return 'Please check your registration details and try again.'
  }

  return 'Unable to register right now. Please try again later.'
}

function Field({ label, ...props }) {
  return (
      <label className="block">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <input
            required
            className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-950"
            {...props}
        />
      </label>
  )
}
