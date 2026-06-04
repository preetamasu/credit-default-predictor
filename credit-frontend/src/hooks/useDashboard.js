import { useState, useEffect, useCallback } from 'react'
import { getCustomers } from '../api/api'
import { getPredictions } from '../api/api'
import { getApplicationsByCustomerId } from '../api/api'
import { normalizeApplication, normalizeCustomer } from '../api/normalize'

function daysAgoDate(days) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d
}

export default function useDashboard() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeCustomers, setActiveCustomers] = useState(0)
  const [openApplicationsLast30, setOpenApplicationsLast30] = useState(0)
  const [recentDefaultsLast7, setRecentDefaultsLast7] = useState(0)
  const [recentPredictions, setRecentPredictions] = useState([])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [custRes, predRes] = await Promise.all([getCustomers(), getPredictions()])
      const customers = (custRes.data ?? custRes) || []
      const predictions = (predRes.data ?? predRes) || []
      const normalizedCustomers = (Array.isArray(customers) ? customers : []).map(normalizeCustomer)

      setActiveCustomers(normalizedCustomers.filter(c => (c.status || 'ACTIVE') === 'ACTIVE').length)

      // normalize sort predictions by createdAt desc
      const predsSorted = Array.isArray(predictions)
        ? predictions.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : []
      setRecentPredictions(predsSorted.slice(0, 8))

      const sevenAgo = daysAgoDate(7)
      const defaults7 = predsSorted.filter(p => new Date(p.createdAt) >= sevenAgo && (p.predictionStatus === 'DEFAULT_LIKELY'))
      setRecentDefaultsLast7(defaults7.length)

      // fetch applications in batches to limit concurrent requests
      const thirtyAgo = daysAgoDate(30)
      const batchSize = 6
      const allApps = []
      for (let i = 0; i < normalizedCustomers.length; i += batchSize) {
        const chunk = normalizedCustomers.slice(i, i + batchSize)
        const chunkPromises = chunk.map(async (c) => {
          try {
            const res = await getApplicationsByCustomerId(c.id)
            const list = (res.data ?? res) || []
            return (Array.isArray(list) ? list : []).map(normalizeApplication)
          } catch (err) {
            return []
          }
        })
        const results = await Promise.all(chunkPromises)
        results.forEach(r => allApps.push(...r))
      }
      const open30 = allApps.filter(a => new Date(a.createdAt || Date.now()) >= thirtyAgo).length
      setOpenApplicationsLast30(open30)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return { loading, error, activeCustomers, openApplicationsLast30, recentDefaultsLast7, recentPredictions, refresh: load }
}
