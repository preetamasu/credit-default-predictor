import { useState, useCallback } from 'react'
import { getApplicationsByCustomerId as apiGetByCustomer, createApplication as apiCreateApplication } from '../api/api'
import { normalizeApplication } from '../api/normalize'

export default function useApplications() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [customerId, setCustomerId] = useState(null)

  const fetchByCustomer = useCallback(async (custId) => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiGetByCustomer(custId)
      const list = res.data ?? res
      setCustomerId(custId)
      const normalized = (Array.isArray(list) ? list : []).map(normalizeApplication)
      setData(normalized)
    } catch (err) {
      setError(err)
      setData([])
    } finally {
      setLoading(false)
    }
  }, [])

  const create = async (payload) => {
    setLoading(true)
    try {
      const res = await apiCreateApplication(payload)
      const created = normalizeApplication(res.data ?? res)
      // if we have a current customer filter, add to list when matching
      if (customerId && (created.customerId === customerId || created.customerId === (payload.customerId))) {
        setData((s) => [created, ...s])
      }
      return created
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, fetchByCustomer, create }
}
