import { Link, useLocation } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { useAuth } from '../contexts/AuthProvider'

export default function AuthRequired({ children, title = 'Please login or register to continue.' }) {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return children

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-200">
        <LockKeyhole size={22} />
      </div>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        You can still explore the dashboard, but account actions require authentication.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
        <Link
          to="/login"
          state={{ from: location }}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition hover:bg-indigo-500"
        >
          Login
        </Link>
        <Link
          to="/register"
          state={{ from: location }}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Register
        </Link>
      </div>
    </section>
  )
}
