import { Link, NavLink } from 'react-router-dom'
import { FileText, Home, LogIn, LogOut, Search, Sparkles, UserPlus, Users, Zap } from 'lucide-react'
import { useAuth } from '../contexts/AuthProvider'

export default function Layout({ children }) {
  const { isAuthenticated, logoutUser } = useAuth()

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 lg:flex">
      <aside className="border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
        <div className="mb-5 lg:mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white shadow-sm shadow-indigo-600/30">
              CR
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-semibold tracking-tight text-slate-950 dark:text-white">Credit Risk</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Decision platform</div>
            </div>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-2 lg:block lg:space-y-1.5">
          <SidebarLink to="/" icon={<Home size={16} />} label="Dashboard" />
          <SidebarLink to="/customers" icon={<Users size={16} />} label="Customers" />
          <SidebarLink to="/applications" icon={<FileText size={16} />} label="Applications" />
          <SidebarLink to="/predict" icon={<Zap size={16} />} label="Predict" />
        </nav>

        <div className={`mt-5 hidden rounded-lg border p-3 text-sm lg:block ${
          isAuthenticated
            ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200'
            : 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200'
        }`}>
          <div className="flex items-center gap-2 font-medium">
            <span className={`h-2 w-2 rounded-full ${isAuthenticated ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            {isAuthenticated ? 'Signed in' : 'Guest mode'}
          </div>
          <div className="mt-1 text-xs opacity-80">{isAuthenticated ? 'Protected actions enabled' : 'Login to create records'}</div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/75 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                <Sparkles size={14} />
                Live workspace
              </div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Platform Dashboard</h1>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  placeholder="Search customers or apps"
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-indigo-950 sm:w-72"
                />
              </label>
              <Link to="/applications" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition hover:bg-indigo-500">
                <FileText size={16} />
                New Application
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={logoutUser}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:flex">
                  <Link to="/login" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                    <LogIn size={16} />
                    Login
                  </Link>
                  <Link to="/register" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                    <UserPlus size={16} />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
          isActive
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        }`
      }
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}
