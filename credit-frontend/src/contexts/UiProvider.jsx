import React, { createContext, useContext, useState, useCallback } from 'react'

const UiContext = createContext(null)

export function UiProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((toast) => {
    const id = Date.now().toString()
    setToasts((t) => [...t, { id, ...toast }])
    setTimeout(() => setToasts((t) => t.filter(x => x.id !== id)), 4000)
  }, [])

  const value = { loading, setLoading, showToast }

  return (
    <UiContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} />
      {loading && <LoadingOverlay />}
    </UiContext.Provider>
  )
}

export function useUi() {
  return useContext(UiContext)
}

function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
      {toasts.map(t => (
        <div key={t.id} className={`px-4 py-2 rounded shadow-md text-sm ${t.type === 'error' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white'}`}>
          {t.title && <div className="font-semibold">{t.title}</div>}
          <div>{t.message}</div>
        </div>
      ))}
    </div>
  )
}

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <div className="bg-white/90 dark:bg-slate-800 p-4 rounded shadow">Loading…</div>
    </div>
  )
}

export default UiProvider
