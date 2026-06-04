import { useState, useEffect, useCallback } from 'react'
import { getCustomers, createCustomer as apiCreateCustomer, updateCustomer as apiUpdateCustomer, deleteCustomer as apiDeleteCustomer } from '../api/api'
import { normalizeCustomer } from '../api/normalize'

export default function useCustomers() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getCustomers()
      const list = res.data ?? res
      const normalized = (Array.isArray(list) ? list : []).map(normalizeCustomer)
      setData(normalized)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const create = async (payload) => {
    setLoading(true)
    try {
      const res = await apiCreateCustomer(payload)
      const created = normalizeCustomer(res.data ?? res)
      setData((s) => [created, ...s])
      return created
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id, payload) => {
    try {
      const res = await apiUpdateCustomer(id, payload)
      const updated = normalizeCustomer(res.data ?? res)
      setData((s) => s.map(x => x.id === id ? updated : x))
      return updated
    } catch (err) { setError(err); throw err }
  }

  const remove = async (id) => {
    try {
      await apiDeleteCustomer(id)
      setData((s) => s.filter(x => x.id !== id))
    } catch (err) { setError(err); throw err }
  }

  return { data, loading, error, refresh: load, create, update, remove }
}
